"use client";
import { Box, Container, Title, Text, Paper, ThemeIcon, SimpleGrid } from '@mantine/core';
import { IconTargetArrow, IconChalkboard, IconHelp, IconAward, IconClock, IconListCheck, IconBook2, IconCalendarTime, IconVideo } from '@tabler/icons-react';


const features = [
  {
    icon: <IconTargetArrow size={36} color="#0066FF" />, title: 'CAT Daily Targets',
    desc: 'Take daily tests with video solutions, attempted by 3-5k students.'
  },
  {
    icon: <IconChalkboard size={36} color="#FF7A00" />, title: 'Classes by CAT Toppers',
    desc: 'Learn from CAT 100%iler, IIM Alumni & Toppers.'
  },
  {
    icon: <IconHelp size={36} color="#E64980" />, title: 'Expert Doubt Solving',
    desc: 'Get your doubts answered within 1 working day by expert faculties.'
  },
  {
    icon: <IconAward size={36} color="#FFC700" />, title: 'Proven Results',
    desc: 'In CAT 2024, 540 students scored above 99+ percentile.'
  },
  {
    icon: <IconListCheck size={36} color="#4C6EF5" />, title: 'CAT Mock Tests',
    desc: 'Get 25 Full-length CAT mocks with video solutions.'
  },
  {
    icon: <IconBook2 size={36} color="#FFA94D" />, title: '20,000+ CAT Questions',
    desc: 'Thousands of practice tests with actual CAT-level questions.'
  },
  {
    icon: <IconCalendarTime size={36} color="#228BE6" />, title: 'CAT Study Plan',
    desc: 'Get Structured Daily Schedule!'
  },
  {
    icon: <IconVideo size={36} color="#FA5252" />, title: 'Daily Live CAT Classes',
    desc: 'Daily live classes at 8 pm (Mon - Fri) led by CAT top scorers.'
  },
];

export function CourseOffering() {
  return (
    <Box component="section" py={64} style={{ background: '#f8faff' }}>
      <Container size="lg">
        <Title order={2} size={36} fw={900} mb={32} ta="center" style={{ color: '#003366', letterSpacing: -1 }}>
          Program Features
        </Title>
        <SimpleGrid cols={4} spacing={24}> 
          {features.map((f, i) => (
            <Paper key={i} shadow="md" radius={16} p={28} style={{ background: '#fff', border: '1.5px solid #e3e8f0', minHeight: 160, display: 'flex', flexDirection: 'column', justifyContent: 'center', transition: 'box-shadow 0.2s', cursor: 'pointer' }}
              withBorder
              onMouseOver={e => (e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,102,255,0.08)')}
              onMouseOut={e => (e.currentTarget.style.boxShadow = '')}
            >
              <ThemeIcon size={48} radius={16} mb={12} style={{ background: '#f4f8ff' }}>{f.icon}</ThemeIcon>
              <Title order={4} style={{ fontWeight: 700, fontSize: 20, marginBottom: 6, color: '#222' }}>{f.title}</Title>
              <Text size="sm" style={{ color: '#444', fontSize: 15 }}>{f.desc}</Text>
            </Paper>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
