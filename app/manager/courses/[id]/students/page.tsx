"use client";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import {
  Box,
  Container,
  Paper,
  Title,
  Text,
  Group,
  Stack,
  TextInput,
  ScrollArea,
  Avatar,
  Badge,
  Loader,
} from "@mantine/core";

type StudentDoc = {
  _id?: string;
  name: string;
  email: string;
  phone?: number;
};

export default function CourseStudentsPage() {
  const params = useParams<{ id: string }>();
  const courseId = useMemo(
    () => (Array.isArray(params?.id) ? params.id[0] : params?.id),
    [params]
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [students, setStudents] = useState<StudentDoc[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function load() {
      if (!courseId) return;
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(`/api/manager/users/by-course/${courseId}`);

        if (!isMounted) return;

        if (res.data.success) {
          setStudents(res.data.users || []);
        } else {
          setError("Failed to load students");
        }
      } catch (e: any) {
        if (isMounted) setError(e?.message || "Something went wrong");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, [courseId]);

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box
      component="section"
      style={{
        minHeight: "100dvh",
        background:
          "linear-gradient(180deg,#05142E 0%,#0B2C64 60%,#114CA8 100%)",
        paddingTop: "clamp(2rem,5vh,3.5rem)",
        paddingBottom: "4rem",
      }}
    >
      <Container size="sm">
        <Stack gap={24}>
          {/* Header */}
          <Group justify="space-between" align="center">
            <div>
              <Title
                order={1}
                size={32}
                fw={900}
                style={{ color: "#fff", letterSpacing: -0.5 }}
              >
                {loading ? "Loading…" : `Students`}
              </Title>
              <Text size="sm" c="var(--mantine-color-gray-3)">
                {loading
                  ? ""
                  : `${students.length} student${
                      students.length !== 1 ? "s" : ""
                    } enrolled`}
              </Text>
            </div>
            {!loading && (
              <Badge color="blue" variant="light">
                {students.length}
              </Badge>
            )}
          </Group>

          {/* Main Content */}
          <Paper
            withBorder
            radius="lg"
            p="xl"
            style={{
              background:
                "linear-gradient(150deg,rgba(255,255,255,0.07),rgba(255,255,255,0.015))",
              backdropFilter: "blur(10px)",
            }}
          >
            {loading ? (
              <Group justify="center" py="xl">
                <Loader color="blue" />
              </Group>
            ) : error ? (
              <Text size="sm" c="var(--mantine-color-red-4)">
                {error}
              </Text>
            ) : (
              <Stack gap="md">
                {/* Search Box */}
                <TextInput
                  placeholder="Search students..."
                  value={search}
                  onChange={(e) => setSearch(e.currentTarget.value)}
                  radius="md"
                  style={{ color: "white" }}
                />

                {/* Scrollable Students List */}
                <ScrollArea h={400} scrollbarSize={6}>
                  <Stack gap="sm">
                    {filteredStudents.length > 0 ? (
                      filteredStudents.map((student, idx) => (
                        <Group
                          key={student._id || idx}
                          p="sm"
                          style={{
                            borderRadius: "8px",
                            backgroundColor: "rgba(255,255,255,0.05)",
                          }}
                        >
                          <Avatar color="blue" radius="xl">
                            {student.name?.charAt(0).toUpperCase()}
                          </Avatar>
                          <Stack gap={2} style={{ flex: 1 }}>
                            <Text size="sm" fw={500} c="white">
                              {student.name}
                            </Text>
                            <Text size="xs" c="var(--mantine-color-gray-3)">
                              {student.email}
                            </Text>
                            {student.phone && (
                              <Text size="xs" c="var(--mantine-color-gray-4)">
                                📞 {student.phone}
                              </Text>
                            )}
                          </Stack>
                        </Group>
                      ))
                    ) : (
                      <Text size="sm" c="var(--mantine-color-gray-3)">
                        No students found.
                      </Text>
                    )}
                  </Stack>
                </ScrollArea>
              </Stack>
            )}
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}
