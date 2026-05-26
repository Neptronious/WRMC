import * as React from 'react';
import { useState } from 'react';

import { Container } from './components/ld/Container';
import { Button } from './components/ld/Button';
import { LinkButton } from './components/ld/LinkButton';
import { IconButton } from './components/ld/IconButton';
import { TextField } from './components/ld/TextField';
import { Select } from './components/ld/Select';
import { LivingDesignFontIcon } from './components/ld/LivingDesignIconsFont';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ProfessionData {
  employmentStatus: string;
  industry: string;
  jobTitle: string;
  employer: string;
  annualIncome: string;
}

interface ApplyCardProfessionPageProps {
  onDone: () => void;
  onContinue: (data: ProfessionData) => void;
}

// ── Font constant ─────────────────────────────────────────────────────────────

const FONT = 'var(--ld-primitive-font-family-sans, "Everyday Sans UI", -apple-system, Roboto, sans-serif)';

// ── ApplyCardProfessionPage ───────────────────────────────────────────────────

export default function ApplyCardProfessionPage({ onDone, onContinue }: ApplyCardProfessionPageProps) {
  const [employmentStatus, setEmploymentStatus] = useState('employed');
  const [industry, setIndustry] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [employer, setEmployer] = useState('');
  const [annualIncome, setAnnualIncome] = useState('');

  const handleContinue = () => {
    onContinue({ employmentStatus, industry, jobTitle, employer, annualIncome });
  };

  const isValid = employmentStatus && industry && jobTitle && employer && annualIncome;

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
              Tell us a little more about your job
            </h2>

            {/* Employment status */}
            <Select
              label="Employment status"
              value={employmentStatus}
              onChange={(e) => setEmploymentStatus(e.target.value)}
            >
              <option value="employed">Employed</option>
              <option value="self-employed">Self-employed</option>
              <option value="retired">Retired</option>
              <option value="student">Student</option>
              <option value="unemployed">Unemployed</option>
              <option value="stay-at-home">Stay-at-home</option>
            </Select>

            {/* Industry */}
            <Select
              label="Industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            >
              <option value="" disabled>Select industry</option>
              <option value="agriculture">Agriculture</option>
              <option value="construction">Construction</option>
              <option value="education">Education</option>
              <option value="finance">Finance &amp; Banking</option>
              <option value="government">Government</option>
              <option value="healthcare">Healthcare</option>
              <option value="hospitality">Hospitality &amp; Tourism</option>
              <option value="it">Information Technology</option>
              <option value="legal">Legal</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="media">Media &amp; Entertainment</option>
              <option value="real-estate">Real Estate</option>
              <option value="retail">Retail</option>
              <option value="transportation">Transportation</option>
              <option value="other">Other</option>
            </Select>

            {/* Job title */}
            <Select
              label="Job title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            >
              <option value="" disabled>Select job title</option>
              <option value="analyst">Analyst</option>
              <option value="associate">Associate</option>
              <option value="consultant">Consultant</option>
              <option value="coordinator">Coordinator</option>
              <option value="director">Director</option>
              <option value="engineer">Engineer</option>
              <option value="executive">Executive</option>
              <option value="manager">Manager</option>
              <option value="officer">Officer</option>
              <option value="specialist">Specialist</option>
              <option value="supervisor">Supervisor</option>
              <option value="technician">Technician</option>
              <option value="other">Other</option>
            </Select>

            {/* Current employer */}
            <TextField
              label="Current employer"
              value={employer}
              onChange={(e) => setEmployer(e.target.value)}
              textFieldProps={{ placeholder: 'Company name' }}
            />

            {/* Annual household income */}
            <Select
              label="Annual household income"
              value={annualIncome}
              onChange={(e) => setAnnualIncome(e.target.value)}
            >
              <option value="" disabled>Select income range</option>
              <option value="10000-49999">$10,000 – $49,999</option>
              <option value="50000-79999">$50,000 – $79,999</option>
              <option value="80000-99999">$80,000 – $99,000</option>
              <option value="100000+">$100,000+</option>
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
