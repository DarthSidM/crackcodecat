'use client';
import { Box, Container, Title, Text, SimpleGrid, Paper, Badge, List, ThemeIcon, Button, Group, Stack } from '@mantine/core';
import { IconCheck, IconBolt, IconSparkles } from '@tabler/icons-react';
import { Carousel } from '@mantine/carousel';
import { useState } from 'react';

interface CourseCardProps {
  label?: string;
  name: string;
  duration: string;
  price: string;
  highlight?: boolean;
  inclusions: string[];
  cta: string;
  accent?: string;
}

function CourseCard({ label, name, duration, price, highlight, inclusions, cta, accent = '#0066FF' }: CourseCardProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <Paper
      withBorder
      radius="lg"
      p="xl"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        background: highlight
          ? 'linear-gradient(135deg, #061537 0%, #0B2C64 60%, #114CA8 100%)'
          : 'linear-gradient(180deg, #ffffff 0%, #f5f8ff 100%)',
        color: highlight ? '#fff' : '#0B2C64',
        boxShadow: hovered
          ? '0 12px 30px -6px rgba(0,102,255,0.35)'
          : '0 4px 16px -4px rgba(0,0,0,0.08)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 260ms cubic-bezier(.4,.8,.2,1)'
      }}
    >
      {label && (
        <Badge
          size="sm"
          variant={highlight ? 'filled' : 'light'}
          color={highlight ? 'yellow' : 'blue'}
          style={{ position: 'absolute', top: 12, right: 12 }}
        >
          {label}
        </Badge>
      )}
      <Stack gap="xs">
        <Group justify="space-between" align="flex-end">
          <div>
            <Title order={3} size={28} fw={900} style={{ letterSpacing: -0.5, color: highlight ? '#fff' : '#003366' }}>
              {name}
            </Title>
            <Text size="sm" fw={600} c={highlight ? 'var(--mantine-color-gray-3)' : 'dimmed'}>
              {duration}
            </Text>
          </div>
          <Text fw={800} style={{ fontSize: 32, color: highlight ? '#FFC700' : accent }}>
            {price}
          </Text>
        </Group>
        <List
          spacing={6}
          size="sm"
          center
          icon={
            <ThemeIcon size={22} radius="xl" color={highlight ? 'yellow' : 'blue'} variant={highlight ? 'light' : 'light'}>
              <IconCheck size={14} />
            </ThemeIcon>
          }
          style={{ marginTop: 8 }}
        >
          {inclusions.map(item => (
            <List.Item key={item} style={{ color: highlight ? 'var(--mantine-color-gray-1)' : undefined }}>
              {item}
            </List.Item>
          ))}
        </List>
        <Button
          size="md"
          mt="sm"
          radius="md"
          fullWidth
          variant={highlight ? 'filled' : 'gradient'}
          gradient={{ from: '#0066FF', to: '#003366' }}
          color={highlight ? 'yellow' : 'blue'}
          leftSection={highlight ? <IconSparkles size={18} /> : <IconBolt size={18} />}
          styles={{
            root: {
              fontWeight: 700,
              letterSpacing: 0.5,
              background: highlight ? 'linear-gradient(90deg,#FFC700,#FFDE55)' : undefined,
              color: highlight ? '#0B2C64' : undefined,
              boxShadow: highlight ? '0 4px 16px -2px rgba(255,199,0,0.55)' : undefined
            }
          }}
          aria-label={cta + ' for ' + name}
        >
          {cta}
        </Button>
      </Stack>
    </Paper>
  );
}

const COURSES: CourseCardProps[] = [
  {
    name: 'VARC Sprint',
    duration: '4 Months',
    price: '₹7,999',
    inclusions: ['60 Live Hours', '8 Full-Length Mocks', 'Daily Practice PDF Plan', 'Doubt Clinic Access'],
    cta: 'Start Cracking',
    accent: '#0066FF',
    label: 'Sprint'
  },
  {
    name: 'CAT Turbo',
    duration: '9 Months',
    price: '₹29,999',
    inclusions: ['Full Syllabus Coverage', '25 Adaptive Mocks', 'Quant + VARC + DILR Labs', 'Mentor Strategy Calls'],
    cta: 'Unlock Seat',
    highlight: true,
    label: 'Most Popular'
  },
  {
    name: 'Test-Series',
    duration: 'Self Paced',
    price: '₹4,999',
    inclusions: ['20 High-Fidelity Mocks', 'AI-Driven Analytics', 'Sectional Drill Sets', 'Rank Forecasting'],
    cta: 'Buy Now',
    accent: '#FFC700',
    label: 'Mocks'
  }
];

export function CourseCatalog() {
  return (
    <Box component="section" py={90} style={{
      background: 'linear-gradient(180deg,#0A1633 0%,#0E1F46 60%,#123160 100%)',
      position: 'relative'
    }}>
      <Container size="xl">
        <Stack gap="xl">
          <Box ta="center">
            <Badge size="lg" variant="light" color="blue" radius="md" style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(4px)',
              color: '#fff'
            }}>
              Choose Your Path
            </Badge>
            <Title order={2} size={48} fw={900} mt="md" style={{ color: '#fff', letterSpacing: -1 }}>
              Programs Built To Accelerate You
            </Title>
            <Text size="lg" mt="sm" c="var(--mantine-color-gray-3)">
              Pick a focused sprint or go all-in on a full turbo pathway. No fluff—pure outcome design.
            </Text>
          </Box>

          {/* Desktop Grid */}
          <Box visibleFrom="sm">
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing={32} mt={10}>
              {COURSES.map(c => (
                <CourseCard key={c.name} {...c} />
              ))}
            </SimpleGrid>
          </Box>

          {/* Mobile Carousel */}
          <Box hiddenFrom="sm">
            <Carousel
              withIndicators
              height="auto"
              slideSize="88%"
              slideGap="md"
              styles={{ indicator: { background: '#FFC700' } }}
            >
              {COURSES.map(c => (
                <Carousel.Slide key={c.name}>
                  <CourseCard {...c} />
                </Carousel.Slide>
              ))}
            </Carousel>
          </Box>
        </Stack>
      </Container>
      {/* Decorative blurred orb */}
      <Box style={{
        position: 'absolute',
        top: -80,
        left: -80,
        width: 260,
        height: 260,
        background: 'radial-gradient(circle at 30% 30%, rgba(0,102,255,0.6), rgba(0,102,255,0))',
        filter: 'blur(40px)',
        opacity: 0.7,
        pointerEvents: 'none'
      }} />
      <Box style={{
        position: 'absolute',
        bottom: -100,
        right: -60,
        width: 320,
        height: 320,
        background: 'radial-gradient(circle at 30% 30%, rgba(255,199,0,0.55), rgba(255,199,0,0))',
        filter: 'blur(50px)',
        opacity: 0.5,
        pointerEvents: 'none'
      }} />
    </Box>
  );
}
