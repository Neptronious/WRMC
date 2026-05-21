import * as React from 'react';
import { useState } from 'react';
import { useEverydaySans } from "./components/ld/EverdaySansFont";
import { useEverydaySansMono } from "./components/ld/EverdaySansMonoFont";
import { useLivingDesignIconsFont } from "./components/ld/LivingDesignIconsFont";
import { injectGibsonSans } from "./components/ld/GibsonSansFont";
import { injectBogleSans } from "./components/ld/BogleSansFont";
import { useInitializeTheming } from "./utils/Theming";
import { useInitializeStore } from "./utils/Store";
import LinkCardPage from "./LinkCardPage";
import VerifyPhonePage from "./VerifyPhonePage";
import CreditCardHomePage from "./CreditCardHomePage";
import PayBillPage from "./PayBillPage";
import PaymentConfirmationPage from "./PaymentConfirmationPage";
import ActivityPage from "./ActivityPage";
import RewardsPage from "./RewardsPage";
import ManagePage from "./ManagePage";
import RewardsActivityPage from "./RewardsActivityPage";
import WalmartCanadaHomePage from "./WalmartCanadaHomePage";
import CreditCardPromoPage from "./CreditCardPromoPage";
import ApplyCardPage from "./ApplyCardPage";
import ApplyCardEmailPage from "./ApplyCardEmailPage";
import ApplyCardMethodPage from "./ApplyCardMethodPage";
import ApplyCardPersonalPage, { type PersonalData } from "./ApplyCardPersonalPage";
import ApplyCardProfessionPage, { type ProfessionData } from "./ApplyCardProfessionPage";
import ApplyCardReviewPage from "./ApplyCardReviewPage";
import ApplyCardPrivacyPage from "./ApplyCardPrivacyPage";
import ApplyCardLegalPage from "./ApplyCardLegalPage";
import ApplyCardProcessingPage from "./ApplyCardProcessingPage";
import ApplyCardApprovedPage from "./ApplyCardApprovedPage";
import ActivateCardPage from "./ActivateCardPage";
import TemporaryShoppingPassPage from "./TemporaryShoppingPassPage";

type Page =
  | 'link-card'
  | 'verify-phone'
  | 'credit-card-home'
  | 'pay-bill'
  | 'payment-confirmation'
  | 'activity'
  | 'rewards'
  | 'manage'
  | 'rewards-activity'
  | 'walmart-canada-home'
  | 'credit-card-promo'
  | 'apply-card'
  | 'apply-card-email'
  | 'apply-card-method'
  | 'apply-card-personal'
  | 'apply-card-profession'
  | 'apply-card-review'
  | 'apply-card-privacy'
  | 'apply-card-legal'
  | 'apply-card-processing'
  | 'apply-card-approved'
  | 'activate-card'
  | 'temporary-shopping-pass';

// Maps bottom-nav keys to pages
const NAV_PAGE_MAP: Record<string, Page> = {
  'credit-card': 'credit-card-home',
  'activity':    'activity',
  'rewards':     'rewards',
  'manage':      'manage',
};

export default function App() {
  useEverydaySans();
  useEverydaySansMono();
  useLivingDesignIconsFont();

  useInitializeTheming('Walmart', ['Walmart'] as const, { injectGibsonSans, injectBogleSans });
  useInitializeStore();

  const [currentPage, setCurrentPage] = useState<Page>('walmart-canada-home');
  const [paymentMade, setPaymentMade] = useState(false);

  // ── Apply card flow state ──────────────────────────────────────────────────
  const [applyEmail, setApplyEmail] = useState('');
  const [applyMethod, setApplyMethod] = useState<'digital' | 'manual'>('digital');
  const [applyPersonal, setApplyPersonal] = useState<PersonalData>({
    firstName: '', lastName: '', dob: undefined, phone: '',
    address: '2625 Main Street, Charlotte Town, PE, C1A 1P9', housingStatus: 'own',
  });
  const [applyProfession, setApplyProfession] = useState<ProfessionData>({
    employmentStatus: 'employed', industry: '', jobTitle: '', employer: '', annualIncome: '',
  });

  const handleNavSelect = (key: string) => {
    const target = NAV_PAGE_MAP[key];
    if (target) setCurrentPage(target);
  };

  if (currentPage === 'verify-phone') {
    return (
      <VerifyPhonePage
        onBack={() => setCurrentPage('link-card')}
        onContinue={() => setCurrentPage('credit-card-home')}
      />
    );
  }

  if (currentPage === 'credit-card-home') {
    return (
      <CreditCardHomePage
        onBack={() => {}}
        onContinue={() => {}}
        onPayNow={() => setCurrentPage('pay-bill')}
        onNavSelect={handleNavSelect}
        paymentMade={paymentMade}
      />
    );
  }

  if (currentPage === 'pay-bill') {
    return (
      <PayBillPage
        onBack={() => setCurrentPage('credit-card-home')}
        onContinue={() => { setPaymentMade(true); setCurrentPage('payment-confirmation'); }}
      />
    );
  }

  if (currentPage === 'payment-confirmation') {
    return (
      <PaymentConfirmationPage
        onBack={() => setCurrentPage('credit-card-home')}
        onNavSelect={handleNavSelect}
      />
    );
  }

  if (currentPage === 'activity') {
    return (
      <ActivityPage
        onBack={() => setCurrentPage('credit-card-home')}
        onNavSelect={handleNavSelect}
      />
    );
  }

  if (currentPage === 'rewards') {
    return (
      <RewardsPage
        onBack={() => setCurrentPage('credit-card-home')}
        onNavSelect={handleNavSelect}
        onViewAll={() => setCurrentPage('rewards-activity')}
      />
    );
  }

  if (currentPage === 'rewards-activity') {
    return (
      <RewardsActivityPage
        onBack={() => setCurrentPage('rewards')}
        onNavSelect={handleNavSelect}
      />
    );
  }

  if (currentPage === 'manage') {
    return (
      <ManagePage
        onBack={() => setCurrentPage('credit-card-home')}
        onNavSelect={handleNavSelect}
      />
    );
  }

  if (currentPage === 'walmart-canada-home') {
    return (
      <WalmartCanadaHomePage
        onNavSelect={handleNavSelect}
        onPromoClick={() => setCurrentPage('credit-card-promo')}
      />
    );
  }

  if (currentPage === 'credit-card-promo') {
    return (
      <CreditCardPromoPage
        onBack={() => setCurrentPage('walmart-canada-home')}
        onNavSelect={handleNavSelect}
        onLinkCard={() => setCurrentPage('link-card')}
        onApplyCard={() => setCurrentPage('apply-card')}
      />
    );
  }

  if (currentPage === 'apply-card') {
    return (
      <ApplyCardPage
        onDone={() => setCurrentPage('credit-card-promo')}
        onContinue={() => setCurrentPage('apply-card-email')}
      />
    );
  }

  if (currentPage === 'apply-card-email') {
    return (
      <ApplyCardEmailPage
        onDone={() => setCurrentPage('credit-card-promo')}
        onContinue={(email) => { setApplyEmail(email); setCurrentPage('apply-card-method'); }}
      />
    );
  }

  if (currentPage === 'apply-card-method') {
    return (
      <ApplyCardMethodPage
        onDone={() => setCurrentPage('credit-card-promo')}
        onContinue={(method) => { setApplyMethod(method); setCurrentPage('apply-card-personal'); }}
      />
    );
  }

  if (currentPage === 'apply-card-personal') {
    return (
      <ApplyCardPersonalPage
        onDone={() => setCurrentPage('credit-card-promo')}
        onContinue={(data) => { setApplyPersonal(data); setCurrentPage('apply-card-profession'); }}
      />
    );
  }

  if (currentPage === 'apply-card-profession') {
    return (
      <ApplyCardProfessionPage
        onDone={() => setCurrentPage('credit-card-promo')}
        onContinue={(data) => { setApplyProfession(data); setCurrentPage('apply-card-review'); }}
      />
    );
  }

  if (currentPage === 'apply-card-review') {
    return (
      <ApplyCardReviewPage
        onDone={() => setCurrentPage('credit-card-promo')}
        onContinue={() => setCurrentPage('apply-card-privacy')}
        onEditEmail={() => setCurrentPage('apply-card-email')}
        onEditPersonal={() => setCurrentPage('apply-card-personal')}
        onEditProfession={() => setCurrentPage('apply-card-profession')}
        email={applyEmail}
        personalData={applyPersonal}
        professionData={applyProfession}
      />
    );
  }

  if (currentPage === 'apply-card-privacy') {
    return (
      <ApplyCardPrivacyPage
        onDone={() => setCurrentPage('credit-card-promo')}
        onContinue={() => setCurrentPage('apply-card-legal')}
      />
    );
  }

  if (currentPage === 'apply-card-legal') {
    return (
      <ApplyCardLegalPage
        onDone={() => setCurrentPage('credit-card-promo')}
        onSubmit={() => setCurrentPage('apply-card-processing')}
      />
    );
  }

  if (currentPage === 'apply-card-processing') {
    return (
      <ApplyCardProcessingPage
        onComplete={() => setCurrentPage('apply-card-approved')}
      />
    );
  }

  if (currentPage === 'apply-card-approved') {
    return (
      <ApplyCardApprovedPage
        onActivateCard={() => setCurrentPage('activate-card')}
        onViewShoppingPass={() => setCurrentPage('temporary-shopping-pass')}
      />
    );
  }

  if (currentPage === 'temporary-shopping-pass') {
    return (
      <TemporaryShoppingPassPage
        onBack={() => setCurrentPage('apply-card-approved')}
        onActivateCard={() => setCurrentPage('activate-card')}
      />
    );
  }

  if (currentPage === 'activate-card') {
    return (
      <ActivateCardPage
        onDone={() => setCurrentPage('apply-card-approved')}
        onActivated={() => setCurrentPage('credit-card-home')}
      />
    );
  }

  return (
    <LinkCardPage
      onContinue={() => setCurrentPage('verify-phone')}
    />
  );
}
