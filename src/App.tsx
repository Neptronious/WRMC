import * as React from 'react';
import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
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
import ReportLostStolenPage from "./ReportLostStolenPage";
import ReportLostStolenReviewPage from "./ReportLostStolenReviewPage";
import ReportLostStolenConfirmationPage from "./ReportLostStolenConfirmationPage";
import FreshCreditCardHomePage from "./FreshCreditCardHomePage";

// Maps bottom-nav keys to URL paths
const NAV_PATH_MAP: Record<string, string> = {
  'credit-card': '/credit-card-home',
  'activity':    '/activity',
  'rewards':     '/rewards',
  'manage':      '/manage',
};

export default function App() {
  useEverydaySans();
  useEverydaySansMono();
  useLivingDesignIconsFont();

  useInitializeTheming('Walmart', ['Walmart'] as const, { injectGibsonSans, injectBogleSans });
  useInitializeStore();

  const navigate = useNavigate();
  const [paymentMade, setPaymentMade] = useState(false);
  const [lastPayment, setLastPayment] = useState<{ amount: string; date: string } | null>(null);
  const [reportReason, setReportReason] = useState('I have lost my card');

  // ── Apply card flow state ──────────────────────────────────────────────────
  const [applyEmail, setApplyEmail] = useState('');
  const [applyMethod, setApplyMethod] = useState<'digital' | 'manual'>('digital');
  const [applyPersonal, setApplyPersonal] = useState<PersonalData>({
    firstName: '', lastName: '', dob: undefined, phone: '',
    address: '2625 Main Street, Charlotte Town, PE, C1A 1P9', housingStatus: 'own',
  });
  const [applyProfession, setApplyProfession] = useState<ProfessionData>({
    employmentStatus: 'employed', industry: '', industryOther: '', jobTitle: '', jobTitleOther: '', employer: '', annualIncome: '',
  });

  const handleNavSelect = (key: string) => {
    const path = NAV_PATH_MAP[key];
    if (path) navigate(path);
  };

  return (
    <Routes>
      <Route path="/" element={
        <WalmartCanadaHomePage
          onNavSelect={handleNavSelect}
          onPromoClick={() => navigate('/credit-card-promo')}
        />
      } />

      <Route path="/link-card" element={
        <LinkCardPage
          onBack={() => navigate('/credit-card-promo')}
          onContinue={() => navigate('/verify-phone')}
        />
      } />

      <Route path="/verify-phone" element={
        <VerifyPhonePage
          onBack={() => navigate(-1)}
          onContinue={() => navigate('/credit-card-home')}
        />
      } />

      <Route path="/credit-card-home" element={
        <CreditCardHomePage
          onBack={() => navigate('/')}
          onContinue={() => navigate('/')}
          onPayNow={() => navigate('/pay-bill')}
          onNavSelect={handleNavSelect}
          paymentMade={paymentMade}
        />
      } />

      <Route path="/pay-bill" element={
        <PayBillPage
          onBack={() => navigate('/credit-card-home')}
          onContinue={(amount, date) => { setPaymentMade(true); setLastPayment({ amount, date }); navigate('/payment-confirmation'); }}
        />
      } />

      <Route path="/payment-confirmation" element={
        <PaymentConfirmationPage
          onBack={() => navigate('/credit-card-home')}
          onNavSelect={handleNavSelect}
          amount={lastPayment?.amount}
          paymentDate={lastPayment?.date}
        />
      } />

      <Route path="/activity" element={
        <ActivityPage
          onBack={() => navigate('/credit-card-home')}
          onNavSelect={handleNavSelect}
        />
      } />

      <Route path="/rewards" element={
        <RewardsPage
          onBack={() => navigate('/credit-card-home')}
          onNavSelect={handleNavSelect}
          onViewAll={() => navigate('/rewards-activity')}
        />
      } />

      <Route path="/rewards-activity" element={
        <RewardsActivityPage
          onBack={() => navigate('/rewards')}
          onNavSelect={handleNavSelect}
        />
      } />

      <Route path="/manage" element={
        <ManagePage
          onBack={() => navigate('/credit-card-home')}
          onNavSelect={handleNavSelect}
          onReportLostStolen={() => navigate('/report-lost-stolen')}
        />
      } />

      <Route path="/credit-card-promo" element={
        <CreditCardPromoPage
          onBack={() => navigate(-1)}
          onNavSelect={handleNavSelect}
          onLinkCard={() => navigate('/link-card')}
          onApplyCard={() => navigate('/apply-card')}
        />
      } />

      <Route path="/apply-card" element={
        <ApplyCardPage
          onDone={() => navigate('/credit-card-promo')}
          onContinue={() => navigate('/apply-card/email')}
        />
      } />

      <Route path="/apply-card/email" element={
        <ApplyCardEmailPage
          onDone={() => navigate('/credit-card-promo')}
          onBack={() => navigate(-1)}
          onContinue={(email) => { setApplyEmail(email); navigate('/apply-card/method'); }}
        />
      } />

      <Route path="/apply-card/method" element={
        <ApplyCardMethodPage
          onDone={() => navigate('/credit-card-promo')}
          onBack={() => navigate(-1)}
          onContinue={(method) => { setApplyMethod(method); navigate('/apply-card/personal'); }}
        />
      } />

      <Route path="/apply-card/personal" element={
        <ApplyCardPersonalPage
          onDone={() => navigate('/credit-card-promo')}
          onBack={() => navigate(-1)}
          onContinue={(data) => { setApplyPersonal(data); navigate('/apply-card/profession'); }}
        />
      } />

      <Route path="/apply-card/profession" element={
        <ApplyCardProfessionPage
          onDone={() => navigate('/credit-card-promo')}
          onBack={() => navigate(-1)}
          onContinue={(data) => { setApplyProfession(data); navigate('/apply-card/review'); }}
        />
      } />

      <Route path="/apply-card/review" element={
        <ApplyCardReviewPage
          onDone={() => navigate('/credit-card-promo')}
          onBack={() => navigate(-1)}
          onContinue={() => navigate('/apply-card/privacy')}
          onEditEmail={() => navigate('/apply-card/email')}
          onEditPersonal={() => navigate('/apply-card/personal')}
          onEditProfession={() => navigate('/apply-card/profession')}
          email={applyEmail}
          personalData={applyPersonal}
          professionData={applyProfession}
        />
      } />

      <Route path="/apply-card/privacy" element={
        <ApplyCardPrivacyPage
          onDone={() => navigate('/credit-card-promo')}
          onBack={() => navigate(-1)}
          onContinue={() => navigate('/apply-card/legal')}
        />
      } />

      <Route path="/apply-card/legal" element={
        <ApplyCardLegalPage
          onDone={() => navigate('/credit-card-promo')}
          onBack={() => navigate(-1)}
          onSubmit={() => navigate('/apply-card/processing')}
        />
      } />

      <Route path="/apply-card/processing" element={
        <ApplyCardProcessingPage
          onComplete={() => navigate('/apply-card/approved')}
        />
      } />

      <Route path="/apply-card/approved" element={
        <ApplyCardApprovedPage
          onActivateCard={() => navigate('/activate-card')}
          onGoToCreditCard={() => navigate('/temporary-shopping-pass')}
        />
      } />

      <Route path="/temporary-shopping-pass" element={
        <TemporaryShoppingPassPage
          onBack={() => navigate(-1)}
          onActivateCard={() => navigate('/activate-card')}
        />
      } />

      <Route path="/activate-card" element={
        <ActivateCardPage
          onDone={() => navigate('/apply-card/approved')}
          onActivated={() => navigate('/fresh-card')}
        />
      } />

      <Route path="/fresh-card" element={
        <FreshCreditCardHomePage
          onNavSelect={handleNavSelect}
          onGoToHome={() => navigate('/credit-card-home')}
        />
      } />

      <Route path="/report-lost-stolen" element={
        <ReportLostStolenPage
          onBack={() => navigate('/manage')}
          onContinue={(reason, _description) => { setReportReason(reason); navigate('/report-lost-stolen/review'); }}
        />
      } />

      <Route path="/report-lost-stolen/review" element={
        <ReportLostStolenReviewPage
          onBack={() => navigate('/report-lost-stolen')}
          onRecognize={() => navigate('/report-lost-stolen/confirmation')}
        />
      } />

      <Route path="/report-lost-stolen/confirmation" element={
        <ReportLostStolenConfirmationPage
          onBack={() => navigate('/credit-card-home')}
          onGoHome={() => navigate('/credit-card-home')}
          reason={reportReason}
        />
      } />

      {/* Fallback — redirect unknown paths to home */}
      <Route path="*" element={
        <WalmartCanadaHomePage
          onNavSelect={handleNavSelect}
          onPromoClick={() => navigate('/credit-card-promo')}
        />
      } />
    </Routes>
  );
}
