"use client";
import { useState } from 'react';
import {
  Box, Container, Paper, Title, Text, TextInput, Button, Group, Anchor, Divider, Stack, Badge, Checkbox, Alert
} from '@mantine/core';
import { IconMail, IconUser, IconBolt, IconShieldCheck, IconCheck, IconPhone, IconLock } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const canSubmit =
    name.trim().length > 1 &&
    phone.trim().length >= 8 &&
    password.trim().length >= 6 &&
    agree;

  async function handleSignup() {
    if (!canSubmit) return;
    setSubmitting(true);
    setMessage(null);
    setError(null);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber: phone,
          name: name,
          password: password
        })
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Signup failed");
        setSubmitting(false);
        return;
      }

      setMessage("Signup successful! You can now log in.");
      router.push("/auth/signin");
    } catch (err) {
      setError("Server error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Box
      component="section"
      style={{
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(140deg,#061537 0%,#0B2C64 55%,#114CA8 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Box style={{ position: 'absolute', top: -120, left: -120, width: 300, height: 300, background: 'radial-gradient(circle at 30% 30%, rgba(0,102,255,0.55), rgba(0,102,255,0))', filter: 'blur(60px)', opacity: 0.7 }} />
      <Box style={{ position: 'absolute', bottom: -140, right: -100, width: 360, height: 360, background: 'radial-gradient(circle at 40% 40%, rgba(255,199,0,0.55), rgba(255,199,0,0))', filter: 'blur(70px)', opacity: 0.5 }} />
      <Container size="sm" style={{ position: 'relative', zIndex: 1 }}>
        <Stack gap="xl">
          <div style={{ textAlign: 'center' }}>
            <Badge
              size="lg"
              color="yellow"
              variant="light"
              leftSection={<IconBolt size={16} />}
              style={{ background: 'linear-gradient(90deg,#FFC700,#FFDE55)', color: '#0B2C64', fontWeight: 700 }}
            >
              Create your seat
            </Badge>
            <Title order={1} mt="md" size={42} fw={900} style={{ color: '#fff', letterSpacing: -1 }}>
              Start Cracking CAT
            </Title>
            <Text c="var(--mantine-color-gray-3)" mt={4}>
              Fill in your details to sign up.
            </Text>
          </div>

          <Paper
            radius="lg"
            p="xl"
            withBorder
            shadow="md"
            style={{
              background: 'linear-gradient(160deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
              backdropFilter: 'blur(14px)',
              border: '1px solid rgba(255,255,255,0.15)'
            }}
          >
            <Stack>
              {message && (
                <Alert color="green" variant="light" title="Status" icon={<IconCheck size={18} />}>
                  {message}
                </Alert>
              )}
              {error && (
                <Alert color="red" variant="light" title="Error" icon={<IconCheck size={18} />}>
                  {error}
                </Alert>
              )}

              <TextInput
                label="Full Name"
                placeholder="Your name"
                value={name}
                onChange={e => setName(e.currentTarget.value)}
                leftSection={<IconUser size={18} />}
                radius="md"
                required
                styles={{
                  input: { color: '#fff', backgroundColor: 'rgba(255,255,255,0.08)' },
                  label: { color: '#fff' }
                }}
              />

              <TextInput
                label="Phone Number"
                placeholder="e.g. +91 98765 43210"
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

              <TextInput
                label="Password"
                placeholder="Your password"
                type="password"
                value={password}
                onChange={e => setPassword(e.currentTarget.value)}
                leftSection={<IconLock size={18} />}
                radius="md"
                required
                styles={{
                  input: { color: '#fff', backgroundColor: 'rgba(255,255,255,0.08)' },
                  label: { color: '#fff' }
                }}
              />

              <Button
                size="md"
                radius="md"
                disabled={!canSubmit || submitting}
                onClick={handleSignup}
                variant="gradient"
                gradient={{ from: '#0066FF', to: '#003366' }}
                leftSection={<IconShieldCheck size={18} />}
                styles={{ root: { fontWeight: 700, letterSpacing: 0.5 } }}
              >
                Sign Up
              </Button>

              <Checkbox
                label={<Text size="xs" c="var(--mantine-color-gray-4)">I agree to Terms & Privacy Policy</Text>}
                checked={agree}
                onChange={e => setAgree(e.currentTarget.checked)}
                styles={{ label: { cursor: 'pointer' } }}
              />

              <Divider my="sm" labelPosition="center" label={<Text size="xs" c="dimmed">Have an account?</Text>} />
              <Group justify="center">
                <Anchor
                  href="/auth/signin"
                  c="#FFC700"
                  fz="sm"
                  style={{ fontWeight: 600 }}
                >
                  Sign in instead
                </Anchor>
              </Group>
            </Stack>
          </Paper>

          <Text size="xs" c="var(--mantine-color-gray-4)" ta="center">
            Secure signup – phone and password required.
          </Text>
        </Stack>
      </Container>
    </Box>
  );
}
