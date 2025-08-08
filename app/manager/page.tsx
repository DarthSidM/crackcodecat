"use client";
import { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Title,
  Text,
  Grid,
  Paper,
  Group,
  Stack,
  ThemeIcon,
  Badge,
  SimpleGrid,
  Table,
  ScrollArea,
  TextInput,
  Select,
  Button,
  Divider,
  ActionIcon,
  Indicator,
  SegmentedControl,
  Tooltip,
  rem
} from '@mantine/core';
import { AreaChart } from '@mantine/charts';
import { IconUsers, IconCurrencyRupee, IconBook, IconChartLine, IconGrowth, IconSearch, IconFilter, IconDownload, IconCalendarTime, IconAlertTriangle, IconChecks, IconInbox } from '@tabler/icons-react';

// ------------------ Mock Data (would come from backend) ------------------ //
interface CourseInfo { id: string; name: string; price: number; active: boolean; startDate: string; students: number; whatsappLink: string; };
interface Student { id: string; name: string; email: string; phone?: string; courseId: string; enrolledOn: string; status: 'active' | 'pending' | 'completed' | 'refunded'; }

const COURSES: CourseInfo[] = [
  { id: 'turbo', name: 'CAT Turbo (Full Program)', price: 29999, active: true, startDate: '2025-08-12', students: 128, whatsappLink: 'https://chat.whatsapp.com/XXX' },
  { id: 'varc', name: 'VARC Sprint', price: 7999, active: true, startDate: '2025-08-15', students: 64, whatsappLink: 'https://chat.whatsapp.com/YYY' },
  { id: 'tests', name: 'Test-Series', price: 4999, active: true, startDate: 'rolling', students: 210, whatsappLink: 'https://chat.whatsapp.com/ZZZ' },
  { id: 'quant', name: 'Quant Booster (Legacy)', price: 12999, active: false, startDate: '2025-05-10', students: 42, whatsappLink: 'https://chat.whatsapp.com/QQQ' }
];

const STUDENTS: Student[] = Array.from({ length: 42 }).map((_, i) => {
  const course = COURSES[i % 3];
  const statuses: Student['status'][] = ['active', 'pending', 'completed'];
  return {
    id: `stu-${i + 1}`,
    name: `Student ${i + 1}`,
    email: `student${i + 1}@mail.com`,
    phone: `+91 98${(10000000 + i).toString().slice(-8)}`,
    courseId: course.id,
    enrolledOn: `2025-08-${(i % 28) + 1}`,
    status: statuses[i % statuses.length]
  } as Student;
});

const REVENUE_SERIES = [
  { month: 'Mar', revenue: 180000, enrollments: 80 },
  { month: 'Apr', revenue: 210000, enrollments: 92 },
  { month: 'May', revenue: 250000, enrollments: 110 },
  { month: 'Jun', revenue: 310000, enrollments: 138 },
  { month: 'Jul', revenue: 340000, enrollments: 150 },
  { month: 'Aug', revenue: 385000, enrollments: 162 }
];

// ------------------ Helpers ------------------ //
function formatINR(v: number) { return '₹' + v.toLocaleString('en-IN'); }

const statusColor: Record<Student['status'], string> = {
  active: 'green',
  pending: 'yellow',
  completed: 'blue',
  refunded: 'red'
};

// ------------------ Component ------------------ //
export default function ManagerDashboard() {
  const [search, setSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState<string | null>(null);
  const [view, setView] = useState<'students' | 'courses'>('students');
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const filteredStudents = useMemo(() => STUDENTS.filter(s => {
    const matches = `${s.name} ${s.email} ${s.phone}`.toLowerCase().includes(search.toLowerCase());
    const courseOk = !courseFilter || s.courseId === courseFilter;
    return matches && courseOk;
  }), [search, courseFilter]);

  const totalRevenue = COURSES.filter(c => c.active).reduce((sum, c) => sum + c.price * c.students, 0);
  const activeStudents = STUDENTS.filter(s => s.status === 'active').length;
  const activeCourses = COURSES.filter(c => c.active).length;
  const upcoming = COURSES.filter(c => c.active && c.startDate !== 'rolling' && new Date(c.startDate) > new Date()).length;

  return (
    <Box component="section" style={{
      minHeight: '100dvh',
      background: 'linear-gradient(180deg,#05142E 0%,#0B2C64 60%,#114CA8 100%)',
      paddingTop: 'clamp(2rem,5vh,3.5rem)',
      paddingBottom: '4rem'
    }}>
      <Container size="xl">
        <Stack gap={36}>
          {/* Header */}
          <Group justify="space-between" align="flex-end">
            <div>
              <Title order={1} size={46} fw={900} style={{ color: '#fff', letterSpacing: -1 }}>Manager Dashboard</Title>
              <Text size="sm" c="var(--mantine-color-gray-3)">Operational overview • revenue • cohorts • learner activity</Text>
            </div>
            <SegmentedControl value={view} onChange={(v) => setView(v as any)} data={[{ label: 'Students', value: 'students' }, { label: 'Courses', value: 'courses' }]} radius="md" />
          </Group>

          {/* KPI Cards */}
          <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing={24}>
            <Paper withBorder p="lg" radius="lg" style={{ background: 'linear-gradient(150deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))', backdropFilter: 'blur(10px)' }}>
              <Group justify="space-between" align="flex-start">
                <ThemeIcon size={44} radius="md" variant="gradient" gradient={{ from: '#FFC700', to: '#FFDE55' }}><IconCurrencyRupee size={24} color="#0B2C64" /></ThemeIcon>
                <Badge variant="light" color="yellow">FY</Badge>
              </Group>
              <Title order={3} mt="sm" style={{ color: '#fff' }} size={30}>{formatINR(totalRevenue)}</Title>
              <Text size="xs" c="var(--mantine-color-gray-4)">Projected gross (active cohorts)</Text>
            </Paper>
            <Paper withBorder p="lg" radius="lg" style={{ background: 'linear-gradient(150deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))', backdropFilter: 'blur(10px)' }}>
              <ThemeIcon size={44} radius="md" variant="gradient" gradient={{ from: '#0066FF', to: '#114CA8' }}><IconUsers size={24} /></ThemeIcon>
              <Title order={3} mt="sm" style={{ color: '#fff' }} size={30}>{activeStudents}</Title>
              <Text size="xs" c="var(--mantine-color-gray-4)">Active learners</Text>
            </Paper>
            <Paper withBorder p="lg" radius="lg" style={{ background: 'linear-gradient(150deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))', backdropFilter: 'blur(10px)' }}>
              <ThemeIcon size={44} radius="md" variant="gradient" gradient={{ from: '#0B2C64', to: '#114CA8' }}><IconBook size={24} /></ThemeIcon>
              <Title order={3} mt="sm" style={{ color: '#fff' }} size={30}>{activeCourses}</Title>
              <Text size="xs" c="var(--mantine-color-gray-4)">Active programs</Text>
            </Paper>
            <Paper withBorder p="lg" radius="lg" style={{ background: 'linear-gradient(150deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))', backdropFilter: 'blur(10px)' }}>
              <ThemeIcon size={44} radius="md" variant="gradient" gradient={{ from: '#25D366', to: '#128C7E' }}><IconCalendarTime size={24} /></ThemeIcon>
              <Title order={3} mt="sm" style={{ color: '#fff' }} size={30}>{upcoming}</Title>
              <Text size="xs" c="var(--mantine-color-gray-4)">Upcoming cohort starts</Text>
            </Paper>
          </SimpleGrid>

          {/* Revenue Chart */}
          <Paper withBorder radius="lg" p="xl" style={{ background: 'linear-gradient(150deg,rgba(255,255,255,0.07),rgba(255,255,255,0.015))', backdropFilter: 'blur(10px)' }}>
            <Group justify="space-between" mb="md">
              <div>
                <Group gap={8}>
                  <Title order={3} size={24} style={{ color: '#fff' }}>Revenue Trend</Title>
                  <Badge color="yellow" variant="light">Live</Badge>
                </Group>
                <Text size="xs" mt={4} c="var(--mantine-color-gray-4)">Monthly gross vs enrollments</Text>
              </div>
              <Button leftSection={<IconDownload size={16} />} variant="light" size="xs">Export CSV</Button>
            </Group>
            <AreaChart
              h={240}
              data={REVENUE_SERIES}
              dataKey="month"
              series={[
                { name: 'revenue', color: 'indigo.6', label: 'Revenue (₹)' },
                { name: 'enrollments', color: 'yellow.6', label: 'Enrollments' }
              ]}
              curveType="linear"
              strokeWidth={2}
              withLegend
              legendProps={{ verticalAlign: 'bottom', height: 32 }}
              yAxisProps={{ width: 60 }}
            />
          </Paper>

          {/* Conditional Main View */}
          {view === 'students' && (
            <Paper withBorder radius="lg" p="xl" style={{ background: 'linear-gradient(150deg,rgba(255,255,255,0.07),rgba(255,255,255,0.015))', backdropFilter: 'blur(10px)' }}>
              <Group mb="md" gap="sm" align="flex-end" wrap="wrap">
                <TextInput
                  placeholder="Search name / email / phone"
                  value={search}
                  onChange={(e) => setSearch(e.currentTarget.value)}
                  leftSection={<IconSearch size={16} />}
                  radius="md"
                />
                <Select
                  placeholder="Filter course"
                  data={[{ value: 'all', label: 'All Courses' }, ...COURSES.map(c => ({ value: c.id, label: c.name }))]}
                  value={courseFilter || 'all'}
                  onChange={(v) => setCourseFilter(v === 'all' ? null : v)}
                  radius="md"
                  leftSection={<IconFilter size={16} />}
                />
                <Button leftSection={<IconDownload size={16} />} variant="gradient" gradient={{ from: '#0066FF', to: '#003366' }} radius="md">Export</Button>
              </Group>
              <ScrollArea h={360} offsetScrollbars>
                <Table highlightOnHover withRowBorders={false} verticalSpacing="xs" fz="sm" className="dashboard-table">
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th style={{ color: '#fff' }}>Name</Table.Th>
                      <Table.Th style={{ color: '#fff' }}>Email</Table.Th>
                      <Table.Th style={{ color: '#fff' }}>Phone</Table.Th>
                      <Table.Th style={{ color: '#fff' }}>Course</Table.Th>
                      <Table.Th style={{ color: '#fff' }}>Status</Table.Th>
                      <Table.Th style={{ color: '#fff' }}>Enrolled</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {filteredStudents.map(s => {
                      const course = COURSES.find(c => c.id === s.courseId)!;
                      return (
                        <Table.Tr key={s.id}>
                          <Table.Td>
                            <Group gap={6}>
                              <Indicator color={statusColor[s.status]} size={10} />
                              <Text fw={600} style={{ color: '#fff' }}>{s.name}</Text>
                            </Group>
                          </Table.Td>
                          <Table.Td><Text c="var(--mantine-color-gray-3)" lineClamp={1}>{s.email}</Text></Table.Td>
                          <Table.Td><Text c="var(--mantine-color-gray-3)">{s.phone}</Text></Table.Td>
                          <Table.Td><Text size="xs" c="var(--mantine-color-gray-3)">{course.name}</Text></Table.Td>
                          <Table.Td><Badge size="sm" color={statusColor[s.status]} variant="light" radius="sm">{s.status}</Badge></Table.Td>
                          <Table.Td><Text size="xs" c="var(--mantine-color-gray-4)">{s.enrolledOn}</Text></Table.Td>
                        </Table.Tr>
                      );
                    })}
                  </Table.Tbody>
                </Table>
              </ScrollArea>
            </Paper>
          )}

          {view === 'courses' && (
            <Paper withBorder radius="lg" p="xl" style={{ background: 'linear-gradient(150deg,rgba(255,255,255,0.07),rgba(255,255,255,0.015))', backdropFilter: 'blur(10px)' }}>
              <Group justify="space-between" mb="md">
                <Title order={3} size={24} style={{ color: '#fff' }}>Course Performance</Title>
                {selectedCourse && (
                  <Button size="xs" variant="subtle" color="gray" onClick={() => setSelectedCourse(null)}>Back</Button>
                )}
              </Group>
              {!selectedCourse && (
                <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing={24}>
                  {COURSES.map(c => (
                    <Paper key={c.id} withBorder radius="md" p="lg" style={{ background: 'linear-gradient(150deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))' }}>
                      <Stack gap={6}>
                        <Group justify="space-between" align="flex-start">
                          <Text fw={600} style={{ color: '#fff' }}>{c.name}</Text>
                          {c.active ? <Badge color="green" variant="light">Active</Badge> : <Badge color="gray" variant="light">Inactive</Badge>}
                        </Group>
                        <Text size="xs" c="var(--mantine-color-gray-4)">Students: {c.students}</Text>
                        <Text size="xs" c="var(--mantine-color-gray-4)">Gross: {formatINR(c.students * c.price)}</Text>
                        <Text size="xs" c="var(--mantine-color-gray-4)">Start: {c.startDate}</Text>
                        <Button mt="xs" size="xs" variant="gradient" gradient={{ from: '#0066FF', to: '#003366' }} onClick={() => setSelectedCourse(c.id)}>View Cohort</Button>
                      </Stack>
                    </Paper>
                  ))}
                </SimpleGrid>
              )}
              {selectedCourse && (
                <Box>
                  <Title order={4} size={18} mb="sm" style={{ color: '#fff' }}>Cohort Students</Title>
                  <ScrollArea h={360} offsetScrollbars>
                    <Table highlightOnHover withRowBorders={false} verticalSpacing="xs" fz="sm" className="dashboard-table">
                      <Table.Thead>
                        <Table.Tr>
                          <Table.Th style={{ color: '#fff' }}>Name</Table.Th>
                          <Table.Th style={{ color: '#fff' }}>Email</Table.Th>
                          <Table.Th style={{ color: '#fff' }}>Phone</Table.Th>
                          <Table.Th style={{ color: '#fff' }}>Status</Table.Th>
                          <Table.Th style={{ color: '#fff' }}>Enrolled</Table.Th>
                        </Table.Tr>
                      </Table.Thead>
                      <Table.Tbody>
                        {STUDENTS.filter(s => s.courseId === selectedCourse).map(s => (
                          <Table.Tr key={s.id}>
                            <Table.Td>
                              <Group gap={6}>
                                <Indicator color={statusColor[s.status]} size={10} />
                                <Text fw={600} style={{ color: '#fff' }}>{s.name}</Text>
                              </Group>
                            </Table.Td>
                            <Table.Td><Text c="var(--mantine-color-gray-3)" lineClamp={1}>{s.email}</Text></Table.Td>
                            <Table.Td><Text c="var(--mantine-color-gray-3)">{s.phone}</Text></Table.Td>
                            <Table.Td><Badge size="sm" color={statusColor[s.status]} variant="light" radius="sm">{s.status}</Badge></Table.Td>
                            <Table.Td><Text size="xs" c="var(--mantine-color-gray-4)">{s.enrolledOn}</Text></Table.Td>
                          </Table.Tr>
                        ))}
                      </Table.Tbody>
                    </Table>
                  </ScrollArea>
                </Box>
              )}
            </Paper>
          )}
        </Stack>
      </Container>
      <style jsx global>{`
        .dashboard-table tbody tr { background: transparent !important; transition: background .15s ease; }
        .dashboard-table tbody tr:hover { background: rgba(255,255,255,0.05) !important; }
      `}</style>
    </Box>
  );
}

/* Removed global style override for table rows */
