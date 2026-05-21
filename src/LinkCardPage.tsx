import * as React from 'react';
import { useState, useRef, useCallback } from 'react';

import { Container } from './components/ld/Container';
import { TextField } from './components/ld/TextField';
import { Button } from './components/ld/Button';
import { DatePicker } from './components/ld/DatePicker';
import { Select } from './components/ld/Select';
import { Link } from './components/ld/Link';
import { IconButton } from './components/ld/IconButton';
import { LivingDesignFontIcon } from './components/ld/LivingDesignIconsFont';
import { Divider } from './components/ld/Divider';

import { useHeaderCartBindings } from './utils/Store';

// ── Helpers ───────────────────────────────────────────────────────────────────

const CARD_NUMBER_REGEX = /^\d{16}$/;
const ZIP_CODE_REGEX = /^\d{6}$/;

function isValidDate(d: Date | undefined): d is Date {
  return d instanceof Date && !isNaN(d.getTime());
}

function isAtLeast18(dob: Date): boolean {
  const today = new Date();
  const eighteenYearsAgo = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate(),
  );
  return dob <= eighteenYearsAgo;
}

function formatDateDisplay(d: Date): string {
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
}

// ── Types ─────────────────────────────────────────────────────────────────────

interface LinkCardPageProps {
  onContinue: () => void;
}

// ── LinkCardPage ──────────────────────────────────────────────────────────────

export default function LinkCardPage({ onContinue }: LinkCardPageProps) {
  useHeaderCartBindings();

  // ── Field values ────────────────────────────────────────────
  const [cardType, setCardType] = useState('walmart-rewards-mastercard');
  const [cardNumber, setCardNumber] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [dobDate, setDobDate] = useState<Date | undefined>(undefined);
  const [dobPickerOpen, setDobPickerOpen] = useState(false);

  // ── Field errors ────────────────────────────────────────────
  const [cardNumberError, setCardNumberError] = useState('');
  const [zipCodeError, setZipCodeError] = useState('');
  const [dobError, setDobError] = useState('');

  // ── Unused ref kept to avoid removing useRef import ─────────
  const _dobTriggerRef = useRef<HTMLButtonElement>(null);

  // ── Validation ──────────────────────────────────────────────
  const validateCardNumber = useCallback((value: string): boolean => {
    if (!CARD_NUMBER_REGEX.test(value)) {
      setCardNumberError('Please enter a valid card number');
      return false;
    }
    setCardNumberError('');
    return true;
  }, []);

  const validateZipCode = useCallback((value: string): boolean => {
    if (!ZIP_CODE_REGEX.test(value)) {
      setZipCodeError('Please enter a valid postal code');
      return false;
    }
    setZipCodeError('');
    return true;
  }, []);

  const validateDob = useCallback((value: Date | undefined): boolean => {
    if (!isValidDate(value)) {
      setDobError('Please enter a valid date of birth');
      return false;
    }
    if (value > new Date()) {
      setDobError('Please enter a valid date of birth');
      return false;
    }
    if (!isAtLeast18(value)) {
      setDobError('You must be at least 18 years old');
      return false;
    }
    setDobError('');
    return true;
  }, []);

  // ── Handlers ────────────────────────────────────────────────
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    setCardNumber(raw);
    if (cardNumberError) setCardNumberError('');
  };

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 6);
    setZipCode(raw);
    if (zipCodeError) setZipCodeError('');
  };

  const handleDobSelect = (selected?: Date) => {
    if (!selected) return;
    setDobDate(selected);
    setDobPickerOpen(false);
    validateDob(selected);
  };

  const handleContinue = () => {
    validateCardNumber(cardNumber);
    validateZipCode(zipCode);
    validateDob(dobDate);
    onContinue();
  };

  // ── Render ──────────────────────────────────────────────────
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#ffffff' }}>

      {/* ── Blue header bar with back button + centered title ── */}
      <div
        style={{
          backgroundColor: '#0053e2',
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
          minHeight: 56,
          position: 'relative',
        }}
      >
        <IconButton
          a11yLabel="Go back"
          variant="round"
          size="medium"
          color="white"
          onClick={() => { /* no-op: home page not yet built */ }}
        >
          <LivingDesignFontIcon name="ArrowLeft" />
        </IconButton>
        <h1
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            margin: 0,
            fontSize: 18,
            fontWeight: 700,
            color: '#ffffff',
            fontFamily: 'var(--ld-primitive-font-family-sans, "Everyday Sans UI", -apple-system, Roboto, sans-serif)',
            whiteSpace: 'nowrap',
          }}
        >
          Link your card
        </h1>
      </div>

      {/* ── Page body (scrollable) ───────────────────────────── */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <Container>
          <div
            style={{
              maxWidth: 600,
              margin: '32px auto 0',
              display: 'flex',
              flexDirection: 'column',
              gap: 24,
            }}
          >

            {/* ── Heading & subtitle ───────────────────────────── */}
            <div>
              <h2
                style={{
                  margin: '0 0 8px',
                  fontSize: 24,
                  fontWeight: 700,
                  color: '#2e2f32',
                  fontFamily: 'var(--ld-primitive-font-family-sans, "Everyday Sans UI", -apple-system, Roboto, sans-serif)',
                }}
              >
                Let's connect your card
              </h2>
              <p
                style={{
                  margin: 0,
                  fontSize: 15,
                  color: '#74767c',
                  fontFamily: 'var(--ld-primitive-font-family-sans, "Everyday Sans UI", -apple-system, Roboto, sans-serif)',
                }}
              >
                Enter your card details to access your account
              </p>
            </div>

            {/* ── Form fields ──────────────────────────────────── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

              {/* Card type selector */}
              <Select
                label="What are you using to link your account"
                value={cardType}
                onChange={(e) => setCardType(e.target.value)}
              >
                <option value="walmart-rewards-mastercard">Walmart Rewards Mastercard</option>
                <option value="temporary-shopping-pass">Temporary shopping pass</option>
              </Select>

              {/* Card Number */}
              <TextField
                label="Card number"
                value={cardNumber}
                onChange={handleCardNumberChange}
                onBlur={() => validateCardNumber(cardNumber)}
                error={cardNumberError || undefined}
                helperText={!cardNumberError ? '16-digit card number, no spaces' : undefined}
                textFieldProps={{
                  inputMode: 'numeric',
                  maxLength: 16,
                  placeholder: '1234 5678 9012 3456',
                  autoComplete: 'cc-number',
                }}
                trailing={
                  <span style={{ color: '#74767c', display: 'flex', alignItems: 'center', paddingLeft: 4, paddingRight: 16, fontSize: 20, lineHeight: 1 }}>
                    <LivingDesignFontIcon name="Camera" />
                  </span>
                }
              />

              {/* Postal Code */}
              <TextField
                label="Postal code"
                value={zipCode}
                onChange={handleZipCodeChange}
                onBlur={() => validateZipCode(zipCode)}
                error={zipCodeError || undefined}
                helperText={!zipCodeError ? '6-digit postal code' : undefined}
                textFieldProps={{
                  inputMode: 'numeric',
                  maxLength: 6,
                  placeholder: '123456',
                  autoComplete: 'postal-code',
                }}
              />

              {/* Date of Birth — DatePicker */}
              <DatePicker
                label="Date of birth"
                format="MM/dd/yyyy"
                isOpen={dobPickerOpen}
                onOpen={() => setDobPickerOpen(true)}
                onClose={() => setDobPickerOpen(false)}
                onSelect={handleDobSelect}
                value={dobDate}
                maxDate={new Date()}
                error={dobError || undefined}
                helperText={!dobError && !dobDate ? 'MM/DD/YYYY — you must be 18 or older' : undefined}
                a11yLabels={{
                  calendarIconButton: 'Open date picker for date of birth',
                  calendarDaySelected: 'Selected',
                  calendarDayToday: 'Today',
                  calendarNextMonthButton: 'Next month',
                  calendarPreviousMonthButton: 'Previous month',
                }}
              />

              {/* Selected DOB confirmation */}
              {dobDate && isValidDate(dobDate) && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    fontSize: 14,
                    color: '#2e844a',
                    fontFamily: 'var(--ld-primitive-font-family-sans, "Everyday Sans UI", -apple-system, Roboto, sans-serif)',
                  }}
                >
                  <LivingDesignFontIcon name="CheckCircle" />
                  Date of birth set: <strong>{formatDateDisplay(dobDate)}</strong>
                </div>
              )}

            </div>

          </div>
        </Container>
      </div>

      {/* ── Sticky footer: button + disclaimer ──────────────── */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderTop: '1px solid #e5e7eb',
          padding: '16px 16px 24px',
        }}
      >
        <div style={{ maxWidth: 600, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Button
            variant="primary"
            isFullWidth
            size="medium"
            onClick={handleContinue}
          >
            Continue
          </Button>

          <p
            style={{
              margin: 0,
              fontSize: 12,
              color: '#74767c',
              lineHeight: 1.6,
              textAlign: 'center',
              fontFamily: 'var(--ld-primitive-font-family-sans, "Everyday Sans UI", -apple-system, Roboto, sans-serif)',
            }}
          >
            By clicking continue, you acknowledge that you have read and agreed to our{' '}
            <span style={{ '--ld-semantic-color-text-link': '#2e2f32' } as React.CSSProperties}><Link href="#" color="default">Terms of Use</Link></span>
            {' '}and{' '}
            <span style={{ '--ld-semantic-color-text-link': '#2e2f32' } as React.CSSProperties}><Link href="#" color="default">Privacy Center</Link></span>
          </p>
        </div>
      </div>

    </div>
  );
}
