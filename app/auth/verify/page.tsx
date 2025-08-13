"use client";
import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Box, Container, Paper, Title, Text, Button, Stack, PinInput, Group, Badge, Alert } from '@mantine/core';
import { IconBolt, IconCheck } from '@tabler/icons-react';

function mockDelay(ms: number) { return new Promise(r => setTimeout(r, ms)); }

export default function VerifyOtpPage() {
  const search = useSearchParams();
  const router = useRouter();
  const email = search.get('email') || '';
  const [code, setCode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleVerify() {
    if (code.trim().length !== 6) return;
    setSubmitting(true);
    setMessage(null);
    await mockDelay(800);
    setSubmitting(false);
    setMessage('Verified! Redirecting...');
    await mockDelay(600);
    router.push('/profile');
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
      <Box style={{ position: 'absolute', top: -120, left: -120, width: 300, height: 300, background: 'radial-gradient(circle at 30% 30%, rgba(0,102,255,0.55), rgba(0,102,255,0))', filter: 'blur(60px)', opacity: 0.7 }} />
      <Box style={{ position: 'absolute', bottom: -140, right: -100, width: 360, height: 360, background: 'radial-gradient(circle at 40% 40%, rgba(255,199,0,0.55), rgba(255,199,0,0))', filter: 'blur(70px)', opacity: 0.5 }} />
      <Container size="sm" style={{ position: 'relative', zIndex: 1 }}>
        <Stack gap="xl" align="center">
          <Badge size="lg" color="yellow" variant="light" leftSection={<IconBolt size={16} />}
            style={{ background: 'linear-gradient(90deg,#FFC700,#FFDE55)', color: '#0B2C64', fontWeight: 700 }}>
            Verify your email
          </Badge>
          <Title order={1} size={36} fw={900} style={{ color: '#fff', letterSpacing: -1, textAlign: 'center' }}>
            Enter the 6-digit code sent to
          </Title>
          <Text c="var(--mantine-color-gray-2)" ta="center">{email}</Text>

          <Paper radius="lg" p="xl" withBorder shadow="md" style={{
            background: 'linear-gradient(160deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
            backdropFilter: 'blur(14px)',
            border: '1px solid rgba(255,255,255,0.15)'
          }}>
            <Stack align="center" gap="md">
              {message && (
                <Alert color="green" variant="light" icon={<IconCheck size={18} />}>{message}</Alert>
              )}
              <PinInput size="lg" length={6} type="number" onChange={setCode} oneTimeCode />
              <Group>
                <Button variant="subtle" color="gray" onClick={() => router.back()}>Change email</Button>
                <Button
                  size="md"
                  radius="md"
                  disabled={submitting || code.trim().length !== 6}
                  onClick={handleVerify}
                  variant="gradient"
                  gradient={{ from: '#FFC700', to: '#FFDE55' }}
                  styles={{ root: { fontWeight: 700, color: '#0B2C64' } }}
                >
                  Verify & Continue
                </Button>
              </Group>
              <Button variant="light" color="yellow" size="xs" onClick={() => setMessage('OTP resent (demo)')}>Resend OTP</Button>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}
