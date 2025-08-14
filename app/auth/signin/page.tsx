"use client";
import { useState } from 'react';
import {
  Box, Container, Paper, Title, Text, TextInput, Button, Group, Anchor, Divider,
   Stack, Badge, Alert ,PasswordInput
} from '@mantine/core';
import { IconBolt, IconCheck, IconPhone } from '@tabler/icons-react';

function mockDelay(ms: number) { return new Promise(r => setTimeout(r, ms)); }

export default function SignInPage() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const canSubmit = phone.trim().length >= 10;

  async function handleSignIn() {
    if (!canSubmit) return;
    //Flawed logic, state updates are async , so this won't work and number will still contain prefixes
    //just handle this while submitting the form rather than updating the state
    if(phone.startsWith("+91") && phone.length == 13){setPhone(phone.slice(3))}
    else if (phone.startsWith("0") && phone.length == 11){setPhone(phone.slice(1))}
    setSubmitting(true);
    setMessage(null);
    await mockDelay(700);
    console.log("phone submitted is still",phone);
    setSubmitting(false);
    setMessage('Signed in successfully. (Demo)');
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
      {/* decorative orbs */}
      <Box style={{ position: 'absolute', top: -120, left: -120, width: 300, height: 300, background: 'radial-gradient(circle at 30% 30%, rgba(0,102,255,0.55), rgba(0,102,255,0))', filter: 'blur(60px)', opacity: 0.7 }} />
      <Box style={{ position: 'absolute', bottom: -140, right: -100, width: 360, height: 360, background: 'radial-gradient(circle at 40% 40%, rgba(255,199,0,0.55), rgba(255,199,0,0))', filter: 'blur(70px)', opacity: 0.5 }} />
      <Container size="sm" style={{ position: 'relative', zIndex: 1 }}>
        <Stack gap="xl">
          <div style={{ textAlign: 'center' }}>
            <Badge size="lg" color="yellow" variant="light" leftSection={<IconBolt size={16} />}
              style={{ background: 'linear-gradient(90deg,#FFC700,#FFDE55)', color: '#0B2C64', fontWeight: 700 }}>
              Welcome back
            </Badge>
            <Title order={1} mt="md" size={42} fw={900} style={{ color: '#fff', letterSpacing: -1 }}>
              Sign in to Continue
            </Title>
            <Text c="var(--mantine-color-gray-3)" mt={4}>
              Enter your phone number to access your dashboard.
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
              <TextInput
                label="Phone"
                placeholder="eg. 98765 43210"
                value={phone}
                onChange={e => setPhone(e.currentTarget.value)}
                leftSection={<IconPhone size={18} />}
                radius="md"
                required
                styles={{
                  input: { color: '#fff', backgroundColor: 'rgba(255,255,255,0.08)' },
                  label: { color: '#fff' }
                }}
              />
              <PasswordInput
              label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.currentTarget.value)}
                radius="md"
                required
                styles={{
                  input: { color: '#fff', backgroundColor: 'rgba(255,255,255,0.08)' },
                  label: { color: '#fff' }
                }}/>
              <Button
                size="md"
                radius="md"
                disabled={!canSubmit || submitting}
                onClick={handleSignIn}
                variant="gradient"
                gradient={{ from: '#0066FF', to: '#003366' }}
                styles={{ root: { fontWeight: 700, letterSpacing: 0.5 } }}
              >
                Sign In
              </Button>
              <Divider my="sm" labelPosition="center" label={<Text size="xs" c="dimmed">New here?</Text>} />
              <Group justify="center">
                <Anchor
                  href="/auth/signup"
                  c="#FFC700"
                  fz="sm"
                  style={{ fontWeight: 600 }}
                >
                  Create an account
                </Anchor>
              </Group>
            </Stack>
          </Paper>
          <Text size="xs" c="var(--mantine-color-gray-4)" ta="center">
            Phone-only quick sign in (demo). No passwords stored.
          </Text>
        </Stack>
      </Container>
    </Box>
  );
}
