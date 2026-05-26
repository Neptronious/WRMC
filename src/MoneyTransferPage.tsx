import * as React from 'react';
import { useState, useCallback } from 'react';

import { Container } from "./components/ld/Container";
import { Grid } from "./components/ld/Grid";
import { GridColumn } from "./components/ld/Grid";
import { Divider } from "./components/ld/Divider";

import { WCPHeader } from "./components/ld/WCPHeader";
import { WCPDesktopFooter } from "./components/ld/WCPDesktopFooter";
import { WCPCountrySelectDropdown } from "./components/ld/WCPCountrySelectDropdown";

import { Card } from "./components/ld/Card";
import { CardHeader } from "./components/ld/Card";
import { CardContent } from "./components/ld/Card";
import { TextField } from "./components/ld/TextField";
import { Select } from "./components/ld/Select";
import { Button } from "./components/ld/Button";
import { ButtonGroup } from "./components/ld/Button";
import { Alert } from "./components/ld/Alert";
import { Tag } from "./components/ld/Tag";
import { Badge } from "./components/ld/Badge";
import { ProgressTracker } from "./components/ld/ProgressTracker";
import { ProgressTrackerItem } from "./components/ld/ProgressTracker";
import { Modal } from "./components/ld/Modal";
import { Breadcrumb } from "./components/ld/Breadcrumb";
import { BreadcrumbItem } from "./components/ld/Breadcrumb";
import { LivingDesignFontIcon } from "./components/ld/LivingDesignIconsFont";

import { useHeaderCartBindings } from "./utils/Store";

// ─── Exchange Rate Data ───────────────────────────────────────────────────────
const EXCHANGE_RATES: Record<string, number> = {
  'USD-MXN': 17.23,
  'USD-EUR': 0.92,
  'USD-GBP': 0.79,
  'USD-INR': 83.42,
  'USD-PHP': 57.12,
  'USD-BRL': 4.97,
  'EUR-MXN': 18.73,
  'EUR-USD': 1.09,
  'EUR-GBP': 0.86,
  'GBP-USD': 1.27,
  'GBP-EUR': 1.16,
  'GBP-MXN': 21.76,
};

const CURRENCIES = ['USD', 'EUR', 'GBP', 'MXN', 'INR', 'PHP', 'BRL'];

const TRANSFER_FEE_USD = 4.99;

function getExchangeRate(from: string, to: string): number {
  if (from === to) return 1;
  return EXCHANGE_RATES[`${from}-${to}`] ?? 1;
}

// ─── MoneyTransferPage ────────────────────────────────────────────────────────
export default function MoneyTransferPage() {
  const { cartCount, cartPrice } = useHeaderCartBindings();

  // ─── Step state ───────────────────────────────────────────────
  const [activeStep, setActiveStep] = useState(0);

  // ─── Recipient form ───────────────────────────────────────────
  const [recipientName, setRecipientName] = useState('');
  const [recipientNameError, setRecipientNameError] = useState('');
  const [destinationCountry, setDestinationCountry] = useState('MX');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountNumberError, setAccountNumberError] = useState('');
  const [swiftCode, setSwiftCode] = useState('');

  // ─── Amount form ──────────────────────────────────────────────
  const [sendAmount, setSendAmount] = useState('500.00');
  const [sendAmountError, setSendAmountError] = useState('');
  const [sendCurrency, setSendCurrency] = useState('USD');
  const [receiveCurrency, setReceiveCurrency] = useState('MXN');

  // ─── Review Modal ─────────────────────────────────────────────
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  // ─── Derived values ───────────────────────────────────────────
  const exchangeRate = getExchangeRate(sendCurrency, receiveCurrency);
  const parsedSendAmount = parseFloat(sendAmount) || 0;
  const receiveAmount = (parsedSendAmount * exchangeRate).toFixed(2);
  const totalCost = (parsedSendAmount + TRANSFER_FEE_USD).toFixed(2);

  // ─── Validation ───────────────────────────────────────────────
  const validateStep0 = useCallback(() => {
    let valid = true;
    if (!recipientName.trim()) {
      setRecipientNameError('Recipient name is required');
      valid = false;
    } else {
      setRecipientNameError('');
    }
    if (!accountNumber.trim()) {
      setAccountNumberError('Account number or IBAN is required');
      valid = false;
    } else {
      setAccountNumberError('');
    }
    return valid;
  }, [recipientName, accountNumber]);

  const validateStep1 = useCallback(() => {
    const amount = parseFloat(sendAmount);
    if (!sendAmount || isNaN(amount) || amount <= 0) {
      setSendAmountError('Please enter a valid amount greater than 0');
      return false;
    }
    if (amount < 1) {
      setSendAmountError('Minimum transfer amount is $1.00');
      return false;
    }
    setSendAmountError('');
    return true;
  }, [sendAmount]);

  const handleNextStep = () => {
    if (activeStep === 0 && !validateStep0()) return;
    if (activeStep === 1 && !validateStep1()) return;
    if (activeStep === 1) {
      setIsReviewModalOpen(true);
      return;
    }
    setActiveStep((s) => Math.min(s + 1, 2));
  };

  const handleConfirmTransfer = () => {
    setIsReviewModalOpen(false);
    setIsConfirmed(true);
    setActiveStep(2);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* ── Header ─────────────────────────────────────────────── */}
      <WCPHeader cartCount={cartCount} cartPrice={cartPrice} />

      {/* ── Page Body ──────────────────────────────────────────── */}
      <div style={{ flex: 1, backgroundColor: '#f5f6f7' }}>
        <Container>
          {/* Breadcrumb */}
          <div style={{ padding: '16px 0 8px' }}>
            <Breadcrumb a11yLabel="Page navigation">
              <BreadcrumbItem href="#">Home</BreadcrumbItem>
              <BreadcrumbItem href="#">Financial Services</BreadcrumbItem>
              <BreadcrumbItem href="#" isCurrent>International Money Transfer</BreadcrumbItem>
            </Breadcrumb>
          </div>

          {/* Page Title */}
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 4px 0', color: '#2e2f32' }}>
              Send Money Overseas
            </h1>
            <p style={{ margin: 0, color: '#74767c', fontSize: 15 }}>
              Fast, secure international transfers to 150+ countries
            </p>
          </div>

          {/* ── Progress Stepper ─────────────────────────────── */}
          <div style={{ marginBottom: 32 }}>
            <ProgressTracker activeIndex={activeStep} variant={isConfirmed ? 'success' : 'info'}>
              <ProgressTrackerItem>Recipient Details</ProgressTrackerItem>
              <ProgressTrackerItem>Transfer Amount</ProgressTrackerItem>
              <ProgressTrackerItem>Confirmed</ProgressTrackerItem>
            </ProgressTracker>
          </div>

          {/* ── Confirmed State ──────────────────────────────── */}
          {isConfirmed ? (
            <div style={{ marginBottom: 48 }}>
              <Card>
                <CardContent>
                  <div style={{ textAlign: 'center', padding: '40px 24px' }}>
                    <div style={{ marginBottom: 16, color: '#2e844a' }}>
                      <LivingDesignFontIcon name="CheckCircleFill" />
                    </div>
                    <h2 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 8px 0', color: '#2e2f32' }}>
                      Transfer Initiated!
                    </h2>
                    <p style={{ color: '#74767c', margin: '0 0 8px 0', fontSize: 15 }}>
                      Your transfer of <strong>{sendCurrency} {parseFloat(sendAmount).toFixed(2)}</strong> to{' '}
                      <strong>{recipientName}</strong> has been submitted.
                    </p>
                    <p style={{ color: '#74767c', margin: '0 0 24px 0', fontSize: 15 }}>
                      Reference number: <strong style={{ color: '#FFC107' }}>WMT-{Math.floor(Math.random() * 9000000 + 1000000)}</strong>
                    </p>
                    <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                      <Button
                        variant="primary"
                        onClick={() => {
                          setIsConfirmed(false);
                          setActiveStep(0);
                          setRecipientName('');
                          setAccountNumber('');
                          setSwiftCode('');
                          setSendAmount('500.00');
                        }}
                      >
                        Send Another Transfer
                      </Button>
                      <Button variant="secondary" href="#">
                        Track This Transfer
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            /* ── Main 2-Column Layout ─────────────────────────────── */
            <Grid hasGutter>
              {/* ── Left Column: Form ─────────────────────────── */}
              <GridColumn sm={12} md={7} lg={7}>

                {/* Step 0: Recipient Details */}
                {activeStep === 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                    <Card>
                      <CardHeader
                        title="Recipient Details"
                        leadingIcon={<LivingDesignFontIcon name="User" />}
                      />
                      <CardContent>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                          <TextField
                            label="Recipient Full Name"
                            value={recipientName}
                            onChange={(e) => setRecipientName(e.target.value)}
                            error={recipientNameError || undefined}
                            helperText="Enter the name exactly as it appears on their bank account"
                            textFieldProps={{ placeholder: 'e.g. Maria Garcia' }}
                          />

                          <div>
                            <div style={{ marginBottom: 6, fontSize: 14, fontWeight: 500, color: '#2e2f32' }}>
                              Destination Country
                            </div>
                            <WCPCountrySelectDropdown
                              label="Select destination country"
                              value={destinationCountry}
                              onChange={(val) => {
                                if (typeof val === 'string') setDestinationCountry(val);
                              }}
                              triggerWidth="100%"
                            />
                          </div>

                          <TextField
                            label="Bank Account Number / IBAN"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            error={accountNumberError || undefined}
                            helperText="For European banks, use the IBAN format (e.g. DE89370400440532013000)"
                            textFieldProps={{ placeholder: 'Enter account number or IBAN' }}
                            leadingIcon={<LivingDesignFontIcon name="Card" />}
                          />

                          <TextField
                            label="SWIFT / BIC Code"
                            value={swiftCode}
                            onChange={(e) => setSwiftCode(e.target.value)}
                            helperText="8 or 11-character code identifying the recipient's bank (optional)"
                            textFieldProps={{ placeholder: 'e.g. DEUTDEDB' }}
                            leadingIcon={<LivingDesignFontIcon name="Globe" />}
                          />
                        </div>
                      </CardContent>
                    </Card>

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button variant="primary" onClick={handleNextStep} size="medium">
                        Continue to Transfer Amount
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 1: Transfer Amount */}
                {activeStep === 1 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                    <Card>
                      <CardHeader
                        title="Transfer Amount"
                        leadingIcon={<LivingDesignFontIcon name="DollarCircle" />}
                      />
                      <CardContent>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                          {/* You Send Row */}
                          <Grid hasGutter>
                            <GridColumn sm={12} md={8} lg={8}>
                              <TextField
                                label="You Send"
                                type="number"
                                value={sendAmount}
                                onChange={(e) => {
                                  setSendAmount(e.target.value);
                                  setSendAmountError('');
                                }}
                                error={sendAmountError || undefined}
                                textFieldProps={{ placeholder: '0.00' }}
                                leadingIcon={<LivingDesignFontIcon name="Dollar" />}
                              />
                            </GridColumn>
                            <GridColumn sm={12} md={4} lg={4}>
                              <Select
                                label="Currency"
                                value={sendCurrency}
                                onChange={(e) => setSendCurrency(e.target.value)}
                              >
                                {CURRENCIES.map((c) => (
                                  <option key={c} value={c}>{c}</option>
                                ))}
                              </Select>
                            </GridColumn>
                          </Grid>

                          {/* Exchange Rate Banner */}
                          <div style={{ backgroundColor: '#FFF7BF', borderRadius: 8, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
                            <span style={{ color: '#FFC107' }}>
                              <LivingDesignFontIcon name="Refresh" />
                            </span>
                            <div style={{ fontSize: 14, color: '#2e2f32' }}>
                              <strong>Exchange Rate:</strong>{' '}
                              1 {sendCurrency} = <strong style={{ color: '#FFC107' }}>{exchangeRate.toFixed(4)} {receiveCurrency}</strong>
                              <span style={{ color: '#74767c', marginLeft: 8, fontSize: 13 }}>
                                (updated just now)
                              </span>
                            </div>
                          </div>

                          {/* Recipient Gets Row */}
                          <Grid hasGutter>
                            <GridColumn sm={12} md={8} lg={8}>
                              <TextField
                                label="Recipient Gets"
                                value={receiveAmount}
                                onChange={() => {}}
                                readOnly
                                helperText="Amount recipient will receive after conversion"
                                leadingIcon={<LivingDesignFontIcon name="Dollar" />}
                              />
                            </GridColumn>
                            <GridColumn sm={12} md={4} lg={4}>
                              <Select
                                label="Currency"
                                value={receiveCurrency}
                                onChange={(e) => setReceiveCurrency(e.target.value)}
                              >
                                {CURRENCIES.filter((c) => c !== sendCurrency).map((c) => (
                                  <option key={c} value={c}>{c}</option>
                                ))}
                              </Select>
                            </GridColumn>
                          </Grid>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Fees Breakdown Card */}
                    <Card>
                      <CardHeader
                        title="Transfer Summary"
                        leadingIcon={<LivingDesignFontIcon name="Receipt" />}
                      />
                      <CardContent>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                          {[
                            { label: 'Transfer Amount', value: `${sendCurrency} ${parseFloat(sendAmount || '0').toFixed(2)}` },
                            { label: 'Transfer Fee', value: `${sendCurrency} ${TRANSFER_FEE_USD.toFixed(2)}`, hint: 'Flat fee, no hidden charges' },
                            { label: 'Exchange Rate', value: `1 ${sendCurrency} = ${exchangeRate.toFixed(4)} ${receiveCurrency}` },
                            { label: 'Recipient Gets', value: `${receiveCurrency} ${receiveAmount}`, bold: true },
                          ].map((row, i, arr) => (
                            <React.Fragment key={row.label}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '12px 0' }}>
                                <div>
                                  <div style={{ fontSize: 14, color: '#4a4c51', fontWeight: row.bold ? 600 : 400 }}>
                                    {row.label}
                                  </div>
                                  {row.hint && (
                                    <div style={{ fontSize: 12, color: '#74767c', marginTop: 2 }}>{row.hint}</div>
                                  )}
                                </div>
                                <div style={{ fontSize: 14, color: row.bold ? '#FFC107' : '#2e2f32', fontWeight: row.bold ? 700 : 400 }}>
                                  {row.value}
                                </div>
                              </div>
                              {i < arr.length - 1 && <Divider />}
                            </React.Fragment>
                          ))}

                          <div style={{ margin: '16px 0 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFF7BF', borderRadius: 8, padding: '12px 16px' }}>
                            <div style={{ fontWeight: 700, fontSize: 15, color: '#2e2f32' }}>Total You Pay</div>
                            <div style={{ fontWeight: 700, fontSize: 18, color: '#FFC107' }}>
                              {sendCurrency} {totalCost}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Estimated Delivery Card */}
                    <Card>
                      <CardHeader
                        title="Estimated Delivery"
                        leadingIcon={<LivingDesignFontIcon name="Clock" />}
                      />
                      <CardContent>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                          <Tag color="positive" variant="secondary">
                            <LivingDesignFontIcon name="Truck" />
                            {' '}1–3 Business Days
                          </Tag>
                          <Tag color="info" variant="secondary">
                            <LivingDesignFontIcon name="Flash" />
                            {' '}Express: Same Day
                          </Tag>
                        </div>
                        <p style={{ fontSize: 13, color: '#74767c', margin: '12px 0 0 0' }}>
                          Standard delivery is typically 1–3 business days. Express delivery is available for eligible countries and may incur an additional fee.
                        </p>
                      </CardContent>
                    </Card>

                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                      <Button variant="secondary" onClick={() => setActiveStep(0)}>
                        Back
                      </Button>
                      <Button variant="primary" onClick={handleNextStep} size="medium">
                        Review Transfer
                      </Button>
                    </div>
                  </div>
                )}
              </GridColumn>

              {/* ── Right Column: Info Panel ───────────────────── */}
              <GridColumn sm={12} md={5} lg={5}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: 16 }}>

                  {/* Trust / Security Card */}
                  <Card>
                    <CardHeader
                      title="Safe & Secure"
                      leadingIcon={<LivingDesignFontIcon name="Lock" />}
                    />
                    <CardContent>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {[
                          { icon: 'Lock', label: 'Bank-level encryption', sub: '256-bit SSL protection' },
                          { icon: 'IdCard', label: 'Regulatory compliant', sub: 'Licensed by FinCEN & state regulators' },
                          { icon: 'CheckCircle', label: 'Money-back guarantee', sub: 'Full refund if transfer fails' },
                        ].map((item) => (
                          <div key={item.label} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                            <span style={{ color: '#FFC107', flexShrink: 0, marginTop: 2 }}>
                              <LivingDesignFontIcon name={item.icon as any} />
                            </span>
                            <div>
                              <div style={{ fontSize: 14, fontWeight: 600, color: '#2e2f32' }}>{item.label}</div>
                              <div style={{ fontSize: 13, color: '#74767c' }}>{item.sub}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Transfer Summary Sticky Panel (visible on all steps) */}
                  {activeStep === 1 && (
                    <Card>
                      <CardHeader title="Quick Summary" />
                      <CardContent>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                            <span style={{ color: '#74767c' }}>You send</span>
                            <span style={{ fontWeight: 600 }}>{sendCurrency} {parseFloat(sendAmount || '0').toFixed(2)}</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                            <span style={{ color: '#74767c' }}>Fee</span>
                            <span>{sendCurrency} {TRANSFER_FEE_USD.toFixed(2)}</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                            <span style={{ color: '#74767c' }}>Rate</span>
                            <span>1 {sendCurrency} = {exchangeRate.toFixed(4)} {receiveCurrency}</span>
                          </div>
                          <div style={{ margin: '8px 0' }}><Divider /></div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15 }}>
                            <span style={{ fontWeight: 700 }}>Recipient gets</span>
                            <span style={{ fontWeight: 700, color: '#FFC107' }}>{receiveCurrency} {receiveAmount}</span>
                          </div>
                          <div style={{ marginTop: 8 }}>
                            <Button variant="primary" isFullWidth onClick={handleNextStep} size="medium">
                              Review Transfer
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Step 0 CTA card */}
                  {activeStep === 0 && (
                    <Card>
                      <CardContent>
                        <div style={{ textAlign: 'center', padding: '8px 0' }}>
                          <div style={{ marginBottom: 12, color: '#FFC107' }}>
                            <LivingDesignFontIcon name="Globe" />
                          </div>
                          <div style={{ fontSize: 14, fontWeight: 600, color: '#2e2f32', marginBottom: 4 }}>
                            Send to 150+ Countries
                          </div>
                          <div style={{ fontSize: 13, color: '#74767c', marginBottom: 16 }}>
                            Competitive rates, low fees, and fast delivery worldwide.
                          </div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
                            {['Mexico', 'India', 'Philippines', 'Brazil', 'UK', 'EU'].map((country) => (
                              <Badge key={country} color="brand">{country}</Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Need Help */}
                  <Alert variant="info">
                    <strong>Need help?</strong> Call us at 1-800-WALMART or chat with a specialist 24/7.
                  </Alert>
                </div>
              </GridColumn>
            </Grid>
          )}

          <div style={{ marginTop: 48 }} />
        </Container>
      </div>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <WCPDesktopFooter />

      {/* ── Review Confirmation Modal ───────────────────────────── */}
      <Modal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        title="Review Your Transfer"
        size="medium"
        actions={
          <ButtonGroup>
            <Button variant="secondary" onClick={() => setIsReviewModalOpen(false)}>
              Go Back & Edit
            </Button>
            <Button variant="primary" onClick={handleConfirmTransfer}>
              Confirm & Send
            </Button>
          </ButtonGroup>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Alert variant="info">
            Please review all transfer details carefully. Once confirmed, transfers cannot be cancelled.
          </Alert>

          {/* Recipient Section */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#74767c', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 10 }}>
              Recipient
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { label: 'Name', value: recipientName || '—' },
                { label: 'Country', value: destinationCountry },
                { label: 'Account / IBAN', value: accountNumber ? `****${accountNumber.slice(-4)}` : '—' },
                { label: 'SWIFT / BIC', value: swiftCode || '—' },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: '#74767c' }}>{item.label}</span>
                  <span style={{ fontWeight: 500, color: '#2e2f32' }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <Divider />

          {/* Transfer Section */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#74767c', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 10 }}>
              Transfer Details
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { label: 'You Send', value: `${sendCurrency} ${parseFloat(sendAmount || '0').toFixed(2)}` },
                { label: 'Transfer Fee', value: `${sendCurrency} ${TRANSFER_FEE_USD.toFixed(2)}` },
                { label: 'Exchange Rate', value: `1 ${sendCurrency} = ${exchangeRate.toFixed(4)} ${receiveCurrency}` },
                { label: 'Total You Pay', value: `${sendCurrency} ${totalCost}`, bold: true },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: '#74767c' }}>{item.label}</span>
                  <span style={{ fontWeight: (item as any).bold ? 700 : 500, color: (item as any).bold ? '#FFC107' : '#2e2f32' }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ backgroundColor: '#f0f7f0', borderRadius: 8, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#2e2f32' }}>Recipient Gets</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#1d6526' }}>{receiveCurrency} {receiveAmount}</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', fontSize: 13, color: '#74767c' }}>
            <LivingDesignFontIcon name="Clock" />
            Estimated delivery: <strong style={{ color: '#2e2f32' }}>1–3 Business Days</strong>
          </div>
        </div>
      </Modal>
    </div>
  );
}
