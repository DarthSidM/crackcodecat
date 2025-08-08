"use client";
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Box,
  Container,
  Paper,
  Title,
  Text,
  TextInput,
  PasswordInput,
  Button,
  Group,
  Anchor,
  Divider,
  Stack,
  Badge,
  Checkbox,
  rem,
  ThemeIcon,
  Alert
} from '@mantine/core';
import { IconMail, IconLock, IconUser, IconBolt, IconShieldCheck, IconCheck } from '@tabler/icons-react';

// Very lightweight mock submit
function mockDelay(ms: number) { return new Promise(r => setTimeout(r, ms)); }

export default function AuthPage() {
  const searchParams = useSearchParams();
  const initialMode = (searchParams.get('mode') === 'signup' ? 'signup' : 'signin') as 'signin' | 'signup';
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [agree, setAgree] = useState(false);
  const [otpRequested, setOtpRequested] = useState(false);
  const [otp, setOtp] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  const isSignup = mode === 'signup';
  const canRequestOtp = email.trim().length > 5 && (!isSignup || (name.trim().length > 1 && agree));
  const canSubmitOtp = otpRequested && otp.trim().length >= 4;

  async function handleRequestOtp() {
    if (!canRequestOtp) return;
    setSubmitting(true);
    setMessage(null);
    await mockDelay(800);
    setOtpRequested(true);
    setSubmitting(false);
    setMessage('OTP sent to your email. (Demo)');
  }

  async function handleVerify() {
    if (!canSubmitOtp) return;
    setSubmitting(true);
    await mockDelay(900);
    setSubmitting(false);
    setMessage(isSignup ? 'Account created & signed in. (Demo)' : 'Signed in successfully. (Demo)');
  }

  return (
    <Box component="section" style={{
      minHeight: '100dvh',
      display: 'flex',
      alignItems: 'center',
      background: 'linear-gradient(140deg,#061537 0%,#0B2C64 55%,#114CA8 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative gradients / orbs */}
      <Box style={{ position: 'absolute', top: -120, left: -120, width: 300, height: 300, background: 'radial-gradient(circle at 30% 30%, rgba(0,102,255,0.55), rgba(0,102,255,0))', filter: 'blur(60px)', opacity: 0.7 }} />
      <Box style={{ position: 'absolute', bottom: -140, right: -100, width: 360, height: 360, background: 'radial-gradient(circle at 40% 40%, rgba(255,199,0,0.55), rgba(255,199,0,0))', filter: 'blur(70px)', opacity: 0.5 }} />

      <Container size="sm" style={{ position: 'relative', zIndex: 1 }}>
        <Stack gap="xl">
          <div style={{ textAlign: 'center' }}>
            <Badge size="lg" color="yellow" variant="light" leftSection={<IconBolt size={16} />}
              style={{ background: 'linear-gradient(90deg,#FFC700,#FFDE55)', color: '#0B2C64', fontWeight: 700 }}>
              {isSignup ? 'Create your seat' : 'Welcome back'}
            </Badge>
            <Title order={1} mt="md" size={42} fw={900} style={{ color: '#fff', letterSpacing: -1 }}>
              {isSignup ? 'Start Cracking CAT' : 'Sign in & Continue'}
            </Title>
            <Text c="var(--mantine-color-gray-3)" mt={4}>
              {isSignup ? 'Join the sprint – class links emailed within 24h after payment.' : 'Enter your email to get a secure OTP.'}
            </Text>
          </div>

          <Paper radius="lg" p="xl" withBorder shadow="md" style={{
            background: 'linear-gradient(160deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
            backdropFilter: 'blur(14px)',
            border: '1px solid rgba(255,255,255,0.15)'
          }}>
            <Stack>
              {message && (
                <Alert color="green" variant="light" title="Status" icon={<IconCheck size={18} />}>
                  {message}
                </Alert>
              )}
              {isSignup && (
                <TextInput
                  label="Full Name"
                  placeholder="Your name"
                  value={name}
                  onChange={e => setName(e.currentTarget.value)}
                  leftSection={<IconUser size={18} />}
                  radius="md"
                  required
                />
              )}
              <TextInput
                label="Email"
                placeholder="you@example.com"
                type="email"
                value={email}
                onChange={e => setEmail(e.currentTarget.value)}
                leftSection={<IconMail size={18} />}
                radius="md"
                required
              />
              {isSignup && (
                <TextInput
                  label="Phone (Optional)"
                  placeholder="e.g. +91 98765 43210"
                  value={phone}
                  onChange={e => setPhone(e.currentTarget.value)}
                  leftSection={<IconLock size={18} style={{ opacity: 0 }} />}
                  radius="md"
                />
              )}

              {!otpRequested && (
                <Button
                  size="md"
                  radius="md"
                  disabled={!canRequestOtp || submitting}
                  onClick={handleRequestOtp}
                  variant="gradient"
                  gradient={{ from: '#0066FF', to: '#003366' }}
                  leftSection={<IconShieldCheck size={18} />}
                  styles={{ root: { fontWeight: 700, letterSpacing: 0.5 } }}
                >
                  {isSignup ? 'Send OTP & Create Account' : 'Send OTP'}
                </Button>
              )}

              {otpRequested && (
                <>
                  <TextInput
                    label="OTP"
                    placeholder="Enter 6-digit code"
                    value={otp}
                    onChange={e => setOtp(e.currentTarget.value)}
                    leftSection={<IconLock size={18} />}
                    radius="md"
                    required
                  />
                  <Group grow>
                    <Button
                      variant="subtle"
                      color="gray"
                      disabled={submitting}
                      onClick={() => { setOtp(''); setOtpRequested(false); setMessage(null); }}
                    >
                      Change Email
                    </Button>
                    <Button
                      size="md"
                      radius="md"
                      disabled={!canSubmitOtp || submitting}
                      onClick={handleVerify}
                      variant="gradient"
                      gradient={{ from: '#FFC700', to: '#FFDE55' }}
                      styles={{ root: { fontWeight: 700, color: '#0B2C64' } }}
                    >
                      {isSignup ? 'Finish Signup' : 'Verify & Sign In'}
                    </Button>
                  </Group>
                </>
              )}

              {isSignup && !otpRequested && (
                <Checkbox
                  label={<Text size="xs" c="var(--mantine-color-gray-4)">I agree to Terms & Privacy Policy</Text>}
                  checked={agree}
                  onChange={e => setAgree(e.currentTarget.checked)}
                  styles={{ label: { cursor: 'pointer' } }}
                />
              )}

              <Divider my="sm" labelPosition="center" label={<Text size="xs" c="dimmed">{isSignup ? 'Have an account?' : 'New here?'}</Text>} />
              <Group justify="center">
                <Anchor
                  onClick={(e) => { e.preventDefault(); setOtp(''); setOtpRequested(false); setMessage(null); setMode(isSignup ? 'signin' : 'signup'); }}
                  c="#FFC700"
                  fz="sm"
                  style={{ fontWeight: 600 }}
                >
                  {isSignup ? 'Sign in instead' : 'Create an account'}
                </Anchor>
              </Group>
            </Stack>
          </Paper>

          <Text size="xs" c="var(--mantine-color-gray-4)" ta="center">
            Secure OTP flow only – we never store passwords. GST invoices auto-issued post payment.
          </Text>
        </Stack>
      </Container>
    </Box>
  );
}
