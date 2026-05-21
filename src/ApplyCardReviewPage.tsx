import * as React from 'react';

import { Container } from './components/ld/Container';
import { Button } from './components/ld/Button';
import { LinkButton } from './components/ld/LinkButton';
import { IconButton } from './components/ld/IconButton';
import { Card, CardContent } from './components/ld/Card';
import { Divider } from './components/ld/Divider';
import { LivingDesignFontIcon } from './components/ld/LivingDesignIconsFont';
import { Link } from './components/ld/Link';
import { type PersonalData } from './ApplyCardPersonalPage';
import { type ProfessionData } from './ApplyCardProfessionPage';

// ── Types ─────────────────────────────────────────────────────────────────────

interface ApplyCardReviewPageProps {
  onDone: () => void;
  onContinue: () => void;
  onEditEmail: () => void;
  onEditPersonal: () => void;
  onEditProfession: () => void;
  email: string;
  personalData: PersonalData;
  professionData: ProfessionData;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const FONT = 'var(--ld-primitive-font-family-sans, "Everyday Sans UI", -apple-system, Roboto, sans-serif)';

function formatDate(d: Date | undefined): string {
  if (!d) return '—';
  return d.toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' });
}

function formatLabel(value: string): string {
  const map: Record<string, string> = {
    'own': 'Own',
    'rent': 'Rent',
    'live-with-family': 'Live with family',
    'other': 'Other',
    'employed': 'Employed',
    'self-employed': 'Self-employed',
    'retired': 'Retired',
    'student': 'Student',
    'unemployed': 'Unemployed',
    'stay-at-home': 'Stay-at-home',
    'digital': 'Digital ID verification',
    'manual': 'Enter details manually',
    '10000-49999': '$10,000 – $49,999',
    '50000-79999': '$50,000 – $79,999',
    '80000-99999': '$80,000 – $99,000',
    '100000+': '$100,000+',
  };
  return map[value] ?? value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, ' ');
}

// ── ReviewCard component ──────────────────────────────────────────────────────

function ReviewCard({
  title,
  rows,
  onEdit,
}: {
  title: string;
  rows: { label: string; value: string }[];
  onEdit: () => void;
}) {
  return (
    <Card>
      <CardContent>
        {/* Card heading + edit */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#2e2f32', fontFamily: FONT }}>{title}</p>
          <LinkButton type="button" size="small" color="default" onClick={onEdit}>
            Edit
          </LinkButton>
        </div>

        <div style={{ margin: '0 0 12px' }}>
          <Divider />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {rows.map((row) => (
            <div key={row.label} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontSize: 12, color: '#74767c', fontFamily: FONT }}>{row.label}</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#2e2f32', fontFamily: FONT }}>{row.value || '—'}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// ── ApplyCardReviewPage ───────────────────────────────────────────────────────

export default function ApplyCardReviewPage({
  onDone,
  onContinue,
  onEditEmail,
  onEditPersonal,
  onEditProfession,
  email,
  personalData,
  professionData,
}: ApplyCardReviewPageProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#ffffff' }}>

      {/* ── Top bar ──────────────────────────────────────────────────────────── */}
      <div
        style={{
          backgroundColor: '#0053e2',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <LinkButton type="button" size="medium" color="white" onClick={onDone}>
          Done
        </LinkButton>
        <IconButton a11yLabel="Refresh application" variant="round" size="medium" color="white">
          <LivingDesignFontIcon name="Refresh" />
        </IconButton>
      </div>

      {/* ── Blue title bar ───────────────────────────────────────────────────── */}
      <div
        style={{
          backgroundColor: '#0053e2',
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 56,
          flexShrink: 0,
        }}
      >
        <h1 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#ffffff', fontFamily: FONT, whiteSpace: 'nowrap' }}>
          Card Application
        </h1>
      </div>

      {/* ── Scrollable body ───────────────────────────────────────────────────── */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <Container>
          <div style={{ maxWidth: 600, margin: '0 auto', padding: '32px 0', display: 'flex', flexDirection: 'column', gap: 20 }}>

            <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#2e2f32', fontFamily: FONT }}>
              Please make sure your information is correct.
            </h2>

            {/* Contact information */}
            <ReviewCard
              title="Contact information"
              onEdit={onEditEmail}
              rows={[{ label: 'Email address', value: email }]}
            />

            {/* Personal information */}
            <ReviewCard
              title="Personal information"
              onEdit={onEditPersonal}
              rows={[
                { label: 'First name', value: personalData.firstName },
                { label: 'Last name', value: personalData.lastName },
                { label: 'Date of birth', value: formatDate(personalData.dob) },
                { label: 'Phone number', value: personalData.phone ? `+1 ${personalData.phone}` : '—' },
                { label: 'Address', value: personalData.address },
                { label: 'Housing status', value: formatLabel(personalData.housingStatus) },
              ]}
            />

            {/* Employment & financial information */}
            <ReviewCard
              title="Employment & financial information"
              onEdit={onEditProfession}
              rows={[
                { label: 'Employment status', value: formatLabel(professionData.employmentStatus) },
                { label: 'Industry', value: formatLabel(professionData.industry) },
                { label: 'Job title', value: formatLabel(professionData.jobTitle) },
                { label: 'Current employer', value: professionData.employer },
                { label: 'Annual household income', value: formatLabel(professionData.annualIncome) },
              ]}
            />

          </div>
        </Container>
      </div>

      {/* ── Sticky footer ─────────────────────────────────────────────────────── */}
      <div style={{ flexShrink: 0, backgroundColor: '#ffffff', borderTop: '1px solid #e5e7eb', padding: '16px 16px 24px' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Button variant="primary" isFullWidth size="medium" onClick={onContinue}>
            Continue
          </Button>
          <p style={{ margin: 0, fontSize: 12, color: '#74767c', lineHeight: 1.6, textAlign: 'center', fontFamily: FONT }}>
            By clicking continue, I certify that this information is accurate and complete.
          </p>
        </div>
      </div>

    </div>
  );
}
