"use client";
import { useState } from 'react';
import {
  Box,
  Container,
  Title,
  Text,
  Group,
  Stack,
  SimpleGrid,
  Paper,
  Button,
  ThemeIcon,
  Anchor,
  Divider,
  ActionIcon,
  Tooltip,
  CopyButton,
  Modal,
  TextInput,
  Textarea,
  rem
} from '@mantine/core';
import { IconBrandWhatsapp, IconFileDownload, IconClipboard, IconClipboardCheck, IconCircleCheck, IconInfoCircle, IconCalendar, IconUser, IconChevronRight, IconHeadphones, IconExternalLink } from '@tabler/icons-react';

interface EnrolledCourse {
  id: string;
  name: string;
  tier: string;
  enrolledOn: string;
  startDate: string;
  duration: string;
  cohortLabel: string;
  whatsappLink: string;
  nextLiveSession?: string;
  nextLiveTopic?: string;
  resources: { label: string; href?: string; description?: string }[];
  supportEmail: string;
  mentorName: string;
}

const MOCK_ENROLLED: EnrolledCourse[] = [
  {
    id: 'cat-turbo-2025',
    name: 'CAT Turbo (Full Program)',
    tier: 'Most Popular',
    enrolledOn: '2025-08-01',
    startDate: '2025-08-12',
    duration: '9 Months',
    cohortLabel: 'Turbo Cohort A – Aug 2025',
    whatsappLink: 'https://chat.whatsapp.com/XXXXXXXXXXXXXXXX',
    nextLiveSession: '2025-08-13 19:30 IST',
    nextLiveTopic: 'Quant Foundations: Number Systems Sprint',
    resources: [
      { label: 'Syllabus (PDF)', href: '#', description: 'Full structured outline' },
      { label: '120-Day Study Plan', href: '#', description: 'Daily accountability grid' },
      { label: 'Mock Strategy Guide', href: '#', description: 'Maximise percentile tactics' }
    ],
    supportEmail: 'support@catcrack.in',
    mentorName: 'Maruti Konduri'
  },
  {
    id: 'varc-sprint-q4',
    name: 'VARC Sprint',
    tier: 'Sprint',
    enrolledOn: '2025-08-05',
    startDate: '2025-08-15',
    duration: '4 Months',
    cohortLabel: 'Sprint Batch Q4',
    whatsappLink: 'https://chat.whatsapp.com/YYYYYYYYYYYYYYYYYYYYYY',
    nextLiveSession: '2025-08-16 18:00 IST',
    nextLiveTopic: 'Reading Logic Drills – Week 1',
    resources: [
      { label: 'Daily VARC Drill Sheet', href: '#', description: 'Day 1–30 tasks' },
      { label: 'Curated RC Pack', href: '#', description: 'High-yield passages' }
    ],
    supportEmail: 'support@catcrack.in',
    mentorName: 'Faculty Team'
  }
];

export default function ProfilePage() {
  const [courses] = useState(MOCK_ENROLLED);
  const [supportOpen, setSupportOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<EnrolledCourse | null>(null);

  // Mock user info (would come from auth context/api)
  const user = { name: 'Rohit Sharma', email: 'rohit@example.com', phone: '+91 98765 43210' };

  function openSupport(course: EnrolledCourse) {
    setSelectedCourse(course);
    setSupportOpen(true);
  }

  return (
    <Box component="section" style={{
      minHeight: '100dvh',
      background: 'linear-gradient(180deg,#061537 0%,#0B2C64 55%,#114CA8 100%)',
      paddingTop: 'clamp(2rem,5vh,3.5rem)',
      paddingBottom: '4rem'
    }}>
      <Container size="xl">
        <Stack gap={40}>
          <Box>
            <Group gap="lg" align="flex-start" wrap="nowrap">
              <ThemeIcon size={54} radius="md" variant="gradient" gradient={{ from: '#0066FF', to: '#003366' }}>
                <IconUser size={30} />
              </ThemeIcon>
              <Stack gap={4} style={{ flexGrow: 1 }}>
                <Title order={1} size={40} fw={900} style={{ color: '#fff', letterSpacing: -1 }}>{user.name}</Title>
                <Group gap={14} wrap="wrap">
                  <Text size="sm" c="var(--mantine-color-gray-2)">{user.email}</Text>
                  <Text size="sm" c="var(--mantine-color-gray-4)">•</Text>
                  <Text size="sm" c="var(--mantine-color-gray-2)">{user.phone}</Text>
                </Group>
                <Text size="xs" c="var(--mantine-color-gray-4)">Manage your active CAT prep enrollments below.</Text>
              </Stack>
            </Group>
          </Box>

          <Title order={2} size={28} fw={800} style={{ color: '#fff', letterSpacing: -0.5 }}>Enrolled Courses</Title>

          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={32}>
            {courses.map(c => (
              <Paper key={c.id} radius="lg" p="xl" withBorder style={{
                position: 'relative',
                background: 'linear-gradient(150deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
                border: '1px solid rgba(255,255,255,0.15)',
                backdropFilter: 'blur(14px)',
                overflow: 'hidden'
              }}>
                <Stack gap="sm">
                  <Group justify="space-between" align="flex-start">
                    <div>
                      <Title order={3} size={28} fw={800} style={{ color: '#fff', letterSpacing: -0.5 }}>{c.name}</Title>
                      <Text size="xs" c="var(--mantine-color-gray-4)">Enrolled on {c.enrolledOn} • Starts {c.startDate}</Text>
                      <Text size="sm" mt={4} c="var(--mantine-color-gray-2)">{c.cohortLabel} • {c.duration}</Text>
                    </div>
                  </Group>

                  <Divider my="xs" label={<Group gap={4}><IconInfoCircle size={14} /><Text size="xs">Key Info</Text></Group>} labelPosition="left" color="blue" />

                  <Group gap={6} justify="space-between" wrap="nowrap">
                    {c.nextLiveSession && (
                      <div>
                        <Text size="sm" c="var(--mantine-color-gray-1)">Next Live:</Text>
                        <Text size="sm" fw={500} style={{ color: '#fff' }}>{c.nextLiveSession}</Text>
                        {c.nextLiveTopic && <Text size="xs" c="var(--mantine-color-gray-4)">{c.nextLiveTopic}</Text>}
                      </div>
                    )}
                    <div>
                      <Text size="sm" c="var(--mantine-color-gray-1)">Mentor:</Text>
                      <Text size="sm" fw={500} style={{ color: '#fff' }}>{c.mentorName}</Text>
                    </div>
                  </Group>

                  <Group gap={10} mt="xs" wrap="wrap">
                    <Button
                      component="a"
                      href={c.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="sm"
                      leftSection={<IconBrandWhatsapp size={16} />}
                      variant="gradient"
                      gradient={{ from: '#25D366', to: '#128C7E' }}
                      styles={{ root: { fontWeight: 600 } }}
                    >
                      WhatsApp Group
                    </Button>
                    <Button
                      size="sm"
                      variant="light"
                      leftSection={<IconHeadphones size={16} />}
                      onClick={() => openSupport(c)}
                    >
                      Support
                    </Button>
                  </Group>
                </Stack>
              </Paper>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>

      <Modal opened={supportOpen} onClose={() => setSupportOpen(false)} title={selectedCourse ? `Support – ${selectedCourse.name}` : 'Support'} centered size="lg" radius="md">
        <Stack>
          <Text size="sm" c="dimmed">Describe your issue. Our team replies quickly. Avoid sharing passwords or payment numbers.</Text>
          <TextInput label="Email" placeholder="you@example.com" required radius="md" styles={{ input: { background: 'rgba(255,255,255,0.06)' } }} />
          <TextInput label="Phone (Optional)" placeholder="+91 ..." radius="md" styles={{ input: { background: 'rgba(255,255,255,0.06)' } }} />
           <Textarea label="Message" minRows={4} placeholder="Need clarification on..." radius="md" styles={{ input: { background: 'rgba(255,255,255,0.06)' } }} />
          <Group justify="flex-end" mt="md">
            <Button variant="subtle" onClick={() => setSupportOpen(false)}>Cancel</Button>
            <Button variant="gradient" gradient={{ from: '#0066FF', to: '#003366' }}>Send</Button>
          </Group>
        </Stack>
      </Modal>
    </Box>
  );
}
