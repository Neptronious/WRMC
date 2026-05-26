import * as React from 'react';
import { useState, useRef } from 'react';

import { Container } from './components/ld/Container';
import { Button } from './components/ld/Button';
import { LinkButton } from './components/ld/LinkButton';
import { IconButton } from './components/ld/IconButton';
import { TextField } from './components/ld/TextField';
import { Select } from './components/ld/Select';
import { DatePicker } from './components/ld/DatePicker';
import { Nudge } from './components/ld/Nudge';
import { LivingDesignFontIcon } from './components/ld/LivingDesignIconsFont';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface PersonalData {
  firstName: string;
  lastName: string;
  dob: Date | undefined;
  phone: string;
  address: string;
  housingStatus: string;
}

interface ApplyCardPersonalPageProps {
  onDone: () => void;
  onContinue: (data: PersonalData) => void;
}

// ── Font constant ─────────────────────────────────────────────────────────────

const FONT = 'var(--ld-primitive-font-family-sans, "Everyday Sans UI", -apple-system, Roboto, sans-serif)';

// ── ApplyCardPersonalPage ─────────────────────────────────────────────────────

export default function ApplyCardPersonalPage({ onDone, onContinue }: ApplyCardPersonalPageProps) {
  const [firstName, setFirstName] = useState('Jean');
  const [lastName, setLastName] = useState('Bernard');
  const [dob, setDob] = useState<Date | undefined>(undefined);
  const [dobOpen, setDobOpen] = useState(false);
  const [phone, setPhone] = useState('4522677423');
  const [address, setAddress] = useState('2625 Main Street, Charlotte Town, PE, C1A 1P9');
  const [housingStatus, setHousingStatus] = useState('own');

  const handleContinue = () => {
    onContinue({ firstName, lastName, dob, phone, address, housingStatus });
  };

  const isValid = firstName.trim() && lastName.trim() && dob && phone.trim();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#ffffff' }}>

      {/* ── Top bar ──────────────────────────────────────────────────────────── */}
      <div
        style={{
          backgroundColor: '#FFC107',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <LinkButton type="button" size="medium" onClick={onDone}>
          Done
        </LinkButton>
        <IconButton a11yLabel="Refresh application" variant="round" size="medium" >
          <LivingDesignFontIcon name="Refresh" />
        </IconButton>
      </div>

      {/* ── Blue title bar ───────────────────────────────────────────────────── */}
      <div
        style={{
          backgroundColor: '#FFC107',
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 56,
          flexShrink: 0,
        }}
      >
        <h1 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#2e2f32', fontFamily: FONT, whiteSpace: 'nowrap' }}>
          Card Application
        </h1>
      </div>

      {/* ── Scrollable body ───────────────────────────────────────────────────── */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <Container>
          <div style={{ maxWidth: 600, margin: '0 auto', padding: '32px 0', display: 'flex', flexDirection: 'column', gap: 24 }}>

            <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#2e2f32', fontFamily: FONT }}>
              We would like to know you
            </h2>

            {/* Walmart account pre-fill nudge */}
            <Nudge
              title="Information auto-filled"
            >
              We've fetched your personal information from your Avenue Mart account to save you time. Please review and confirm the details below.
            </Nudge>

            {/* First name */}
            <TextField
              label="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              textFieldProps={{ placeholder: 'Jean', autoComplete: 'given-name' }}
            />

            {/* Last name */}
            <TextField
              label="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              textFieldProps={{ placeholder: 'Bernard', autoComplete: 'family-name' }}
            />

            {/* Date of birth */}
            <DatePicker
              label="Date of birth"
              format="MM/dd/yyyy"
              isOpen={dobOpen}
              onOpen={() => setDobOpen(true)}
              onClose={() => setDobOpen(false)}
              onSelect={(d) => { setDob(d); setDobOpen(false); }}
              value={dob}
              maxDate={new Date()}
              helperText={!dob ? 'MM/DD/YYYY' : undefined}
              a11yLabels={{
                calendarIconButton: 'Open date of birth picker',
                calendarDaySelected: 'Selected',
                calendarDayToday: 'Today',
                calendarNextMonthButton: 'Next month',
                calendarPreviousMonthButton: 'Previous month',
              }}
            />

            {/* Phone number */}
            <TextField
              label="Phone number"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              textFieldProps={{ placeholder: '4161234567', autoComplete: 'tel' }}
              helperText="Canada (+1) — 10-digit number"
              leadingIcon={
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: 14,
                    paddingRight: 4,
                    fontSize: 14,
                    fontWeight: 700,
                    color: '#2e2f32',
                    fontFamily: FONT,
                    whiteSpace: 'nowrap',
                    userSelect: 'none',
                    pointerEvents: 'none',
                  }}
                >
                  +1
                </span>
              }
            />

            {/* Address */}
            <Select
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            >
              <option value="2625 Main Street, Charlotte Town, PE, C1A 1P9">2625 Main Street, Charlotte Town, PE, C1A 1P9</option>
              <option value="100 King Street W, Toronto, ON, M5X 1A9">100 King Street W, Toronto, ON, M5X 1A9</option>
              <option value="555 Burrard Street, Vancouver, BC, V7X 1M8">555 Burrard Street, Vancouver, BC, V7X 1M8</option>
              <option value="other">Enter a different address...</option>
            </Select>

            {/* Housing status */}
            <Select
              label="Housing status"
              value={housingStatus}
              onChange={(e) => setHousingStatus(e.target.value)}
            >
              <option value="own">Own</option>
              <option value="rent">Rent</option>
              <option value="live-with-family">Live with family</option>
              <option value="other">Other</option>
            </Select>

          </div>
        </Container>
      </div>

      {/* ── Sticky footer ─────────────────────────────────────────────────────── */}
      <div style={{ flexShrink: 0, backgroundColor: '#ffffff', borderTop: '1px solid #e5e7eb', padding: '16px 16px 24px' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <Button variant="primary" isFullWidth size="medium" onClick={handleContinue}>
            Continue
          </Button>
        </div>
      </div>

    </div>
  );
}
