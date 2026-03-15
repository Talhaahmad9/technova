'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Users, User, ChevronDown } from 'lucide-react';
import { GlowButton } from '@/components/ui/GlowButton';
import { FormField, inputClass, inputStyle } from './FormField';
import { SuccessModal } from './SuccessModal';
import { REGISTRATION } from '@/constants/site-data';

// ── Types ─────────────────────────────────────────────────────────────────────

type RegistrationType = 'solo' | 'team' | null;

interface FormData {
  // Personal
  email:          string;
  phone:          string;
  cnic:           string;
  university:     string;
  // Team
  regType:        RegistrationType;
  teamName:       string;
  teamSize:       string;
  teamMembers:    string;
  // Competition
  competition:    string;
  referral:       string;
}

interface FormErrors {
  [key: string]: string;
}

const EMPTY_FORM: FormData = {
  email: '', phone: '', cnic: '', university: '',
  regType: null, teamName: '', teamSize: '', teamMembers: '',
  competition: '', referral: '',
};

// ── Sub-components ────────────────────────────────────────────────────────────

function StyledInput({
  name, value, onChange, onFocus, onBlur, placeholder, type = 'text', focusedField, errorField,
}: {
  name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: (name: string) => void;
  onBlur: () => void;
  placeholder?: string; type?: string;
  focusedField: string | null; errorField?: string;
}) {
  const isFocused = focusedField === name;
  const hasError  = !!errorField;
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      onFocus={() => onFocus(name)}
      onBlur={onBlur}
      placeholder={placeholder}
      className={inputClass}
      style={{
        ...inputStyle,
        borderColor: hasError ? '#f87171' : isFocused ? 'var(--accent-primary)' : 'var(--border-color)',
        boxShadow: hasError
          ? '0 0 0 3px rgba(248,113,113,0.12)'
          : isFocused ? '0 0 0 3px rgba(64,101,240,0.12)' : 'none',
      }}
    />
  );
}

function StyledSelect({
  name, value, onChange, onFocus, onBlur, options, placeholder, focusedField, errorField,
}: {
  name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onFocus: (name: string) => void;
  onBlur: () => void;
  options: readonly string[]; placeholder: string;
  focusedField: string | null; errorField?: string;
}) {
  const isFocused = focusedField === name;
  const hasError  = !!errorField;
  return (
    <div className="relative">
      <select
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => onFocus(name)}
        onBlur={onBlur}
        className={`${inputClass} appearance-none pr-10 cursor-pointer`}
        style={{
          ...inputStyle,
          borderColor: hasError ? '#f87171' : isFocused ? 'var(--accent-primary)' : 'var(--border-color)',
          boxShadow: hasError
            ? '0 0 0 3px rgba(248,113,113,0.12)'
            : isFocused ? '0 0 0 3px rgba(64,101,240,0.12)' : 'none',
        }}
      >
        <option value="" disabled style={{ background: 'var(--bg-elevated)' }}>{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt} style={{ background: 'var(--bg-elevated)', color: 'var(--text-primary)' }}>
            {opt}
          </option>
        ))}
      </select>
      <ChevronDown
        size={14}
        className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
        style={{ color: 'var(--text-subtle)' }}
      />
    </div>
  );
}

function StyledTextarea({
  name, value, onChange, onFocus, onBlur, placeholder, rows = 3, focusedField, errorField,
}: {
  name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus: (name: string) => void;
  onBlur: () => void;
  placeholder?: string; rows?: number;
  focusedField: string | null; errorField?: string;
}) {
  const isFocused = focusedField === name;
  const hasError  = !!errorField;
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      onFocus={() => onFocus(name)}
      onBlur={onBlur}
      placeholder={placeholder}
      rows={rows}
      className={`${inputClass} resize-none`}
      style={{
        ...inputStyle,
        borderColor: hasError ? '#f87171' : isFocused ? 'var(--accent-primary)' : 'var(--border-color)',
        boxShadow: hasError
          ? '0 0 0 3px rgba(248,113,113,0.12)'
          : isFocused ? '0 0 0 3px rgba(64,101,240,0.12)' : 'none',
      }}
    />
  );
}

// ── Main form ─────────────────────────────────────────────────────────────────

export function RegistrationForm() {
  const router = useRouter();
  const [form, setForm]           = useState<FormData>(EMPTY_FORM);
  const [errors, setErrors]       = useState<FormErrors>({});
  const [focused, setFocused]     = useState<string | null>(null);
  const [showSuccess, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((err) => { const next = { ...err }; delete next[name]; return next; });
  }, []);

  const handleFocus = useCallback((name: string) => setFocused(name), []);
  const handleBlur  = useCallback(() => setFocused(null), []);

  // ── Validation ──────────────────────────────────────────────────────────────
  const validate = (): boolean => {
    const errs: FormErrors = {};
    const v = REGISTRATION.validation;

    if (!form.email)                              errs.email   = v.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = v.emailInvalid;
    if (!form.phone)                              errs.phone   = v.required;
    else if (!/^[0-9+\-\s]{7,15}$/.test(form.phone))         errs.phone = v.phoneInvalid;
    if (!form.cnic)                               errs.cnic    = v.required;
    else if (!/^\d{5}-\d{7}-\d$/.test(form.cnic))            errs.cnic  = v.cnicInvalid;
    if (!form.university)                         errs.university = v.required;
    if (!form.regType)                            errs.regType = v.required;
    if (form.regType === 'team') {
      if (!form.teamName)    errs.teamName    = v.required;
      if (!form.teamSize)    errs.teamSize    = v.required;
      if (!form.teamMembers) errs.teamMembers = v.required;
    }
    if (!form.referral) errs.referral = v.required;

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    // Simulated submit — replace with real API call when backend is ready
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitting(false);
    setSuccess(true);
  };

  const handleRedirect = () => {
    setSuccess(false);
    router.push('/');
  };

  const isTeam = form.regType === 'team';

  return (
    <>
      <SuccessModal show={showSuccess} onRedirect={handleRedirect} />

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col gap-5">

            {/* Registration type toggle */}
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                Registration Type <span style={{ color: 'var(--accent-primary)' }}>*</span>
              </span>
              <div className="grid grid-cols-2 gap-3">
                {(['solo', 'team'] as const).map((type) => {
                  const isActive = form.regType === type;
                  const Icon = type === 'solo' ? User : Users;
                  return (
                    <motion.button
                      key={type}
                      type="button"
                      onClick={() => {
                        setForm((f) => ({ ...f, regType: type }));
                        setErrors((err) => { const n = { ...err }; delete n.regType; return n; });
                      }}
                      className="flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-200 capitalize"
                      style={{
                        background: isActive ? 'var(--gradient-accent)' : 'var(--bg-elevated)',
                        border:     `1px solid ${isActive ? 'transparent' : 'var(--border-color)'}`,
                        color:      isActive ? '#ffffff' : 'var(--text-muted)',
                        boxShadow:  isActive ? 'var(--glow-card)' : 'none',
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon size={15} />
                      {type}
                    </motion.button>
                  );
                })}
              </div>
              {errors.regType && (
                <p className="text-xs font-medium" style={{ color: '#f87171' }}>{errors.regType}</p>
              )}
            </div>

            {/* Email */}
            <FormField label="Email Address" required error={errors.email}>
              <StyledInput
                name="email" type="email" value={form.email}
                onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}
                placeholder="you@university.edu.pk"
                focusedField={focused} errorField={errors.email}
              />
            </FormField>

            {/* Phone */}
            <FormField label="Phone Number" required error={errors.phone}>
              <StyledInput
                name="phone" type="tel" value={form.phone}
                onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}
                placeholder="03xx-xxxxxxx"
                focusedField={focused} errorField={errors.phone}
              />
            </FormField>

            {/* CNIC */}
            <FormField
              label="CNIC / Student ID" required
              error={errors.cnic}
              hint="Format: 42101-1234567-1"
            >
              <StyledInput
                name="cnic" value={form.cnic}
                onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}
                placeholder="42101-1234567-1"
                focusedField={focused} errorField={errors.cnic}
              />
            </FormField>

            {/* University */}
            <FormField label="University / Institution" required error={errors.university}>
              <StyledInput
                name="university" value={form.university}
                onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}
                placeholder="e.g. IoBM, FAST, NUST"
                focusedField={focused} errorField={errors.university}
              />
            </FormField>

          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="flex flex-col gap-5">

            {/* Team fields — animated in when team is selected */}
            <AnimatePresence>
              {isTeam && (
                <motion.div
                  className="flex flex-col gap-5"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Team name */}
                  <FormField label="Team Name" required error={errors.teamName}>
                    <StyledInput
                      name="teamName" value={form.teamName}
                      onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}
                      placeholder="e.g. ByteForce"
                      focusedField={focused} errorField={errors.teamName}
                    />
                  </FormField>

                  {/* Team size */}
                  <FormField label="Team Size" required error={errors.teamSize}>
                    <StyledSelect
                      name="teamSize" value={form.teamSize}
                      onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}
                      options={REGISTRATION.teamSizeOptions}
                      placeholder="Select team size"
                      focusedField={focused} errorField={errors.teamSize}
                    />
                  </FormField>

                  {/* Team member names */}
                  <FormField
                    label="Team Member Names" required
                    error={errors.teamMembers}
                    hint="Enter each member's full name, one per line"
                  >
                    <StyledTextarea
                      name="teamMembers" value={form.teamMembers}
                      onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}
                      placeholder={"Ali Raza\nSara Khan\nOmar Farooq"}
                      rows={3}
                      focusedField={focused} errorField={errors.teamMembers}
                    />
                  </FormField>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Competition category */}
            <FormField
              label="Competition Category"
              hint={
                REGISTRATION.competitionCategories.length === 0
                  ? 'Categories will be available soon'
                  : undefined
              }
            >
              <StyledSelect
                name="competition" value={form.competition}
                onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}
                options={
                  REGISTRATION.competitionCategories.length > 0
                    ? REGISTRATION.competitionCategories
                    : ['Coming soon — check back later']
                }
                placeholder="Select competition"
                focusedField={focused}
              />
            </FormField>

            {/* Referral */}
            <FormField label="How did you hear about us?" required error={errors.referral}>
              <StyledSelect
                name="referral" value={form.referral}
                onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}
                options={REGISTRATION.referralOptions}
                placeholder="Select one"
                focusedField={focused} errorField={errors.referral}
              />
            </FormField>

            {/* Submit */}
            <div className="mt-auto pt-2">
              <GlowButton
                label={submitting ? 'Submitting...' : 'Submit Registration'}
                size="lg"
                className="w-full justify-center"
                onClick={submitting ? undefined : undefined}
              />
              <p className="mono text-xs text-center mt-3" style={{ color: 'var(--text-subtle)' }}>
                Fields marked <span style={{ color: 'var(--accent-primary)' }}>*</span> are required
              </p>
            </div>

          </div>
        </div>
      </form>
    </>
  );
}
