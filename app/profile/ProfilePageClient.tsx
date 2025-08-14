"use client";
import { useEffect, useState } from "react";
import {
  Box, Container, Title, Text, Group, Stack,
  SimpleGrid, Paper, Divider, ThemeIcon
} from '@mantine/core';
import { IconUser, IconInfoCircle } from '@tabler/icons-react';

interface Course {
  _id: string;
  courseName: string;
  courseDescription: string;
  price: number;
  cgst: number;
  sgst: number;
  status: "ACTIVE" | "INACTIVE";
}

export default function ProfilePageClient({
  initialUser
}: {
  initialUser: { _id: string; name: string; phone: string };
}) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [user] = useState(initialUser);

  useEffect(() => {
    console.log("Loading courses for user:", user._id);
    async function fetchCourses() {
      try {
        // now using dynamic userId route
        const res = await fetch(`/api/courses/${user._id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        });

        if (!res.ok) throw new Error("Failed to fetch courses");

        const data = await res.json();
        if (data.success && Array.isArray(data.courses)) {
          setCourses(data.courses);
        } else {
          setCourses([]);
        }
      } catch (err) {
        console.error("Error loading courses:", err);
        setCourses([]);
      }
    }

    if (user._id) {
      fetchCourses();
    }
  }, [user._id]);

  return (
    <Box
      component="section"
      style={{
        minHeight: '100dvh',
        background: 'linear-gradient(180deg,#061537 0%,#0B2C64 55%,#114CA8 100%)',
        paddingTop: 'clamp(2rem,5vh,3.5rem)',
        paddingBottom: '4rem'
      }}
    >
      <Container size="xl">
        <Stack gap={40}>
          <Box>
            <Group gap="lg" align="flex-start" wrap="nowrap">
              <ThemeIcon size={54} radius="md" variant="gradient" gradient={{ from: '#0066FF', to: '#003366' }}>
                <IconUser size={30} />
              </ThemeIcon>
              <Stack gap={4} style={{ flexGrow: 1 }}>
                <Title order={1} size={40} fw={900} style={{ color: '#fff', letterSpacing: -1 }}>
                  {user.name}
                </Title>
                <Text size="sm" c="var(--mantine-color-gray-2)">
                  {user.phone}
                </Text>
              </Stack>
            </Group>
          </Box>

          <Title order={2} size={28} fw={800} style={{ color: '#fff', letterSpacing: -0.5 }}>
            Available Courses
          </Title>

          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={32}>
            {courses.map(c => (
              <Paper key={c._id} radius="lg" p="xl" withBorder style={{
                position: 'relative',
                background: 'linear-gradient(150deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
                border: '1px solid rgba(255,255,255,0.15)',
                backdropFilter: 'blur(14px)',
                overflow: 'hidden'
              }}>
                <Stack gap="sm">
                  <Title order={3} size={24} fw={800} style={{ color: '#fff', letterSpacing: -0.5 }}>
                    {c.courseName}
                  </Title>
                  <Text size="sm" c="var(--mantine-color-gray-2)">
                    {c.courseDescription}
                  </Text>

                  <Divider my="xs" label={
                    <Group gap={4}>
                      <IconInfoCircle size={14} />
                      <Text size="xs">Details</Text>
                    </Group>
                  } labelPosition="left" color="blue" />

                  <Text size="sm" c="var(--mantine-color-gray-1)">
                    Price: ₹{c.price}
                  </Text>
                  <Text size="sm" c="var(--mantine-color-gray-1)">
                    CGST: {c.cgst}%
                  </Text>
                  <Text size="sm" c="var(--mantine-color-gray-1)">
                    SGST: {c.sgst}%
                  </Text>
                  <Text size="sm" c={c.status === "ACTIVE" ? "green" : "red"}>
                    Status: {c.status}
                  </Text>
                </Stack>
              </Paper>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
}
