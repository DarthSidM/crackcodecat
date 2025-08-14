"use client";
import { useState, useMemo, useEffect } from 'react';
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
  rem,
  em
} from '@mantine/core';
import { AreaChart } from '@mantine/charts';
import { IconUsers, IconCurrencyRupee, IconBook, IconChartLine, IconGrowth, IconSearch, IconFilter, IconDownload, IconCalendarTime, IconAlertTriangle, IconChecks, IconInbox, IconPlayerPause, IconPlayerPlay, IconEdit, IconPlus } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import Link from 'next/link';

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
  // --- New state for real courses and enrollments
  const [dbCourses, setDbCourses] = useState<Array<{ _id: string; courseName: string; courseDescription: string; price: number; cgst: number; sgst: number; status: 'ACTIVE' | 'INACTIVE'; createdAt?: string; }>>([]);
  const [enrollCounts, setEnrollCounts] = useState<Record<string, number>>({});
  const [isLoadingCourses, setIsLoadingCourses] = useState<boolean>(false);
  const [isToggling, setIsToggling] = useState<Record<string, boolean>>({});
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  // Load courses and enrollment counts from APIs
  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        setIsLoadingCourses(true);
        const [coursesRes, usersRes] = await Promise.all([
          fetch('/api/manager/courses'),
          fetch('/api/manager/users/with-courses')
        ]);
        if (!coursesRes.ok) throw new Error('Failed to load courses');
        if (!usersRes.ok) throw new Error('Failed to load users');
        const coursesJson = await coursesRes.json();
        const usersJson = await usersRes.json();
        if (!isMounted) return;
        const courses = (coursesJson?.courses ?? []) as Array<any>;
        setDbCourses(courses);
        const counts: Record<string, number> = {};
        const users = (usersJson?.users ?? []) as Array<any>;
        for (const u of users) {
          const regs = Array.isArray(u?.coursesRegistered) ? u.coursesRegistered : [];
          for (const c of regs) {
            const id = typeof c === 'string' ? c : c?._id;
            if (!id) continue;
            counts[id] = (counts[id] || 0) + 1;
          }
        }
        setEnrollCounts(counts);
      } catch (e) {
        // ignore
      } finally {
        if (isMounted) setIsLoadingCourses(false);
      }
    }
    load();
    return () => { isMounted = false; };
  }, []);

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
          {/* Header */
            /* Keeping brand, colors and overall styling */}
          <Group justify="space-between" align="flex-end">
            <div>
              <Title order={1} size={46} fw={900} style={{ color: '#fff', letterSpacing: -1 }}>Manager Dashboard</Title>
              <Text size="sm" c="var(--mantine-color-gray-3)">Operational overview • revenue • cohorts • learner activity</Text>
            </div>
            <div />
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

          {/* Revenue Chart (kept as-is) */}
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
          {/* All Courses (new section) */}
          <AllCoursesSection
            isMobile={isMobile}
            isLoadingCourses={isLoadingCourses}
            dbCourses={dbCourses}
            enrollCounts={enrollCounts}
            onToggleStatus={async (courseId, toStatus) => {
              setIsToggling((prev) => ({ ...prev, [courseId]: true }));
              try {
                const res = await fetch('/api/manager/courses', {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ id: courseId, status: toStatus })
                });
                if (!res.ok) throw new Error('Failed to update');
                const json = await res.json();
                const updated = json.course;
                setDbCourses((prev) => prev.map((c) => (c._id === courseId ? { ...c, status: updated.status } : c)));
              } catch (e) {
                // noop toast for brevity
              } finally {
                setIsToggling((prev) => ({ ...prev, [courseId]: false }));
              }
            }}
          />
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

// ------------------ AllCoursesSection ------------------ //
type AllCoursesSectionProps = {
  isMobile: boolean;
  isLoadingCourses: boolean;
  dbCourses: Array<{ _id: string; courseName: string; courseDescription: string; price: number; cgst: number; sgst: number; status: 'ACTIVE' | 'INACTIVE'; createdAt?: string; }>;
  enrollCounts: Record<string, number>;
  onToggleStatus: (courseId: string, toStatus: 'ACTIVE' | 'INACTIVE') => Promise<void>;
};

function formatDate(dateIso?: string) {
  if (!dateIso) return '—';
  try {
    const d = new Date(dateIso);
    if (isNaN(d.getTime())) return '—';
    return d.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return '—';
  }
}

function AllCoursesSection(props: AllCoursesSectionProps) {
  const { isMobile, isLoadingCourses, dbCourses, enrollCounts, onToggleStatus } = props;
  return (
    <Paper withBorder radius="lg" p="xl" style={{ background: 'linear-gradient(150deg,rgba(255,255,255,0.07),rgba(255,255,255,0.015))', backdropFilter: 'blur(10px)' }}>
      <Group justify="space-between" mb="md">
        <Title order={3} size={24} style={{ color: '#fff' }}>All Courses</Title>
        <Button
          component={Link as any}
          href="/manager/courses/new"
          leftSection={<IconPlus size={16} />}
          variant="gradient"
          gradient={{ from: '#0066FF', to: '#003366' }}
          radius="md"
        >
          Add Course
        </Button>
      </Group>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing={24}>
        {isLoadingCourses && Array.from({ length: 3 }).map((_, i) => (
          <Paper key={i} withBorder radius="md" p="lg" style={{ background: 'linear-gradient(150deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))', minHeight: 150 }}>
            <Stack gap="xs">
              <Badge variant="light" color="gray">Loading…</Badge>
              <Text size="xs" c="var(--mantine-color-gray-4)">Fetching course</Text>
            </Stack>
          </Paper>
        ))}
        {!isLoadingCourses && dbCourses.length === 0 && (
          <Paper withBorder radius="md" p="lg" style={{ background: 'linear-gradient(150deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))' }}>
            <Text size="sm" c="var(--mantine-color-gray-3)">No courses yet. Click "Add Course" to create one.</Text>
          </Paper>
        )}
        {dbCourses.map((c) => {
          const enrolled = enrollCounts[c._id] || 0;
          const isActive = c.status === 'ACTIVE';
          return (
            <Paper key={c._id} withBorder radius="md" p="lg" style={{ background: 'linear-gradient(150deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))' }}>
              <Stack gap={8}>
                <Group justify="space-between" align="flex-start">
                  <Text fw={600} style={{ color: '#fff' }}>{c.courseName}</Text>
                  {isActive ? <Badge color="green" variant="light">Active</Badge> : <Badge color="gray" variant="light">Inactive</Badge>}
                </Group>
                <Text size="xs" c="var(--mantine-color-gray-4)">Price: {formatINR(c.price)}</Text>
                <Text size="xs" c="var(--mantine-color-gray-4)">Start: {formatDate(c.createdAt)}</Text>
                <Text size="xs" c="var(--mantine-color-gray-4)">
                  Students: <Link href={`/manager/courses/${c._id}/students`} style={{ color: 'var(--mantine-color-blue-3)', textDecoration: 'underline' }}>{enrolled}</Link>
                </Text>
                <Group gap="xs" mt="xs">
                  <Button
                    component={Link as any}
                    href={`/manager/courses/${c._id}/edit`}
                    leftSection={<IconEdit size={16} />}
                    variant="gradient"
                    gradient={{ from: '#0066FF', to: '#003366' }}
                    size="xs"
                  >
                    Edit
                  </Button>
                  {isActive ? (
                    <Button
                      leftSection={<IconPlayerPause size={16} />}
                      variant="light"
                      color="red"
                      size="xs"
                      onClick={() => {
                        const ok = typeof window !== 'undefined' ? window.confirm(`Pause enrollments for "${c.courseName}"?`) : true;
                        if (ok) onToggleStatus(c._id, 'INACTIVE');
                      }}
                    >
                      Stop
                    </Button>
                  ) : (
                    <Button
                      leftSection={<IconPlayerPlay size={16} />}
                      variant="light"
                      color="green"
                      size="xs"
                      onClick={() => onToggleStatus(c._id, 'ACTIVE')}
                    >
                      Resume
                    </Button>
                  )}
                </Group>
              </Stack>
            </Paper>
          );
        })}
      </SimpleGrid>
    </Paper>
  );
}
