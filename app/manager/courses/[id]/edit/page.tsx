"use client";
import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Paper,
  Title,
  Text,
  Group,
  Stack,
  TextInput,
  Textarea,
  NumberInput,
  Button,
  Badge
} from '@mantine/core';

type CourseDoc = {
  _id: string;
  courseName: string;
  courseDescription: string;
  price: number;
  cgst: number;
  sgst: number;
  status: 'ACTIVE' | 'INACTIVE';
};

export default function EditCoursePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const courseId = useMemo(() => (Array.isArray(params?.id) ? params.id[0] : params?.id), [params]);

  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [courseName, setCourseName] = useState<string>('');
  const [courseDescription, setCourseDescription] = useState<string>('');
  const [price, setPrice] = useState<number | ''>('');
  const [cgst, setCgst] = useState<number | ''>('');
  const [sgst, setSgst] = useState<number | ''>('');

  useEffect(() => {
    let isMounted = true;
    async function load() {
      if (!courseId) return;
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('/api/manager/courses');
        if (!res.ok) throw new Error('Failed to load courses');
        const json = await res.json();
        const doc: CourseDoc | undefined = (json?.courses || []).find((c: CourseDoc) => c._id === courseId);
        if (!isMounted) return;
        if (!doc) {
          setError('Course not found');
          setLoading(false);
          return;
        }
        setCourseName(doc.courseName || '');
        setCourseDescription(doc.courseDescription || '');
        setPrice(typeof doc.price === 'number' ? doc.price : '');
        setCgst(typeof doc.cgst === 'number' ? doc.cgst : '');
        setSgst(typeof doc.sgst === 'number' ? doc.sgst : '');
      } catch (e: any) {
        if (!isMounted) return;
        setError(e?.message || 'Something went wrong');
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => { isMounted = false; };
  }, [courseId]);

  async function handleSave() {
    try {
      setSaving(true);
      setError(null);
      if (!courseId) throw new Error('Missing course id');
      if (!courseName.trim() || !courseDescription.trim()) {
        throw new Error('Name and description are required');
      }
      const toNumber = (v: number | ''): number | undefined => (typeof v === 'number' ? v : undefined);
      const body: any = {
        id: courseId,
        courseName: courseName.trim(),
        courseDescription: courseDescription.trim(),
      };
      const p = toNumber(price);
      const cg = toNumber(cgst);
      const sg = toNumber(sgst);
      if (typeof p === 'number') body.price = p;
      if (typeof cg === 'number') body.cgst = cg;
      if (typeof sg === 'number') body.sgst = sg;

      const res = await fetch('/api/manager/courses', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.message || 'Failed to save');
      }
      router.push('/manager');
    } catch (e: any) {
      setError(e?.message || 'Unable to save');
    } finally {
      setSaving(false);
    }
  }

  return (
    <Box component="section" style={{
      minHeight: '100dvh',
      background: 'linear-gradient(180deg,#05142E 0%,#0B2C64 60%,#114CA8 100%)',
      paddingTop: 'clamp(2rem,5vh,3.5rem)',
      paddingBottom: '4rem'
    }}>
      <Container size="sm">
        <Stack gap={24}>
          <Group justify="space-between" align="center">
            <div>
              <Title order={1} size={32} fw={900} style={{ color: '#fff', letterSpacing: -0.5 }}>Edit Course</Title>
              <Text size="sm" c="var(--mantine-color-gray-3)">Update course details</Text>
            </div>
            {saving && <Badge color="yellow" variant="light">Saving…</Badge>}
          </Group>

          <Paper withBorder radius="lg" p="xl" style={{ background: 'linear-gradient(150deg,rgba(255,255,255,0.07),rgba(255,255,255,0.015))', backdropFilter: 'blur(10px)' }}>
            {loading ? (
              <Text size="sm" c="var(--mantine-color-gray-3)">Loading…</Text>
            ) : error ? (
              <Text size="sm" c="var(--mantine-color-red-4)">{error}</Text>
            ) : (
              <Stack gap="md">
                <TextInput
                  label="Course name"
                  placeholder="Enter course name"
                  value={courseName}
                  onChange={(e) => setCourseName(e.currentTarget.value)}
                  radius="md"
                  style={{color:"white"}}
                />
                <Textarea
                  label="Description"
                  placeholder="Describe the course"
                  minRows={4}
                  value={courseDescription}
                  onChange={(e) => setCourseDescription(e.currentTarget.value)}
                  radius="md"
                  style={{color:"white"}}
                />
                <Group grow>
                  <NumberInput
                    label="Price"
                    placeholder="0"
                    value={price}
                    onChange={(e:any)=>{setPrice(e.target.value)}}
                    min={0}
                    thousandSeparator
                    radius="md"
                    style={{color:"white"}}
                  />
                  <NumberInput
                    label="CGST (%)"
                    placeholder="0"
                    value={cgst}
                    onChange={(e:any)=>{setCgst(e.target.value)}}
                    min={0}
                    max={100}
                    style={{color:"white"}}
                    radius="md"
                  />
                  <NumberInput
                    label="SGST (%)"
                    placeholder="0"
                    value={sgst}
                    onChange={(e:any)=>{setSgst(e.target.value)}}
                    min={0}
                    max={100}
                    radius="md"
                    style={{color:"white"}}
                  />
                </Group>
                <Group justify="flex-end" mt="sm">
                  <Button variant="light" color="gray" radius="md" onClick={() => router.back()}>Cancel</Button>
                  <Button radius="md" variant="gradient" gradient={{ from: '#0066FF', to: '#003366' }} loading={saving} onClick={handleSave}>Save Changes</Button>
                </Group>
              </Stack>
            )}
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}


