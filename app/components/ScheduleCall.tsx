"use client";
import { useState } from 'react';
import { Card, Stack, TextInput, Select, Button, Group, Text, Badge } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { IconCheck } from '@tabler/icons-react';

export function ScheduleCall() {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [year, setYear] = useState<string | null>('2025');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = () => {
    if (!name.trim()) return 'Name is required';
    if (!/^\d{10}$/.test(mobile)) return 'Enter 10 digit mobile number';
    if (!year) return 'Select target year';
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (v) { setError(v); return; }
    setError(null);
    setSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 900);
  };

  return (
    <Card withBorder radius="lg" shadow="sm" p="xl" style={{maxWidth:980, margin:'0 auto 80px', background:'linear-gradient(135deg,#ffffff 0%,#f4f8ff 100%)'}}>
      <Group align="stretch" gap={40} wrap="wrap" justify="space-between">
        {/* Inspirational / left rail */}
        <Stack flex={1} gap={22} style={{minWidth:260, maxWidth:360}}>
          <Stack gap={8}>
            <Badge variant="light" color="blue" styles={{root:{background:'#EAF2FF',color:'#0b66ff',fontWeight:600}}}>1:1 MENTOR CLARITY</Badge>
            <Text fw={800} fz={28} style={{letterSpacing:-0.8,lineHeight:1.15}}>Cut The Noise.<br />Build Your Attack Plan.</Text>
            <Text fz="sm" c="dimmed" style={{lineHeight:1.5}}>In 15 minutes we map where you stand, surface blind spots and give you a ruthless, focused next 30‑day action sheet.</Text>
          </Stack>
          <Stack gap={10}>
            {[
              'Personal percentile gap analysis',
              'Custom 4-week micro roadmap',
              'Profile & college fit discussion',
              'Mock & accuracy optimization tips'
            ].map(point => (
              <Group key={point} gap={10} align="flex-start">
                <Badge radius="sm" variant="light" styles={{root:{background:'#0b66ff10',color:'#0b66ff',padding:'4px 8px',fontWeight:600}}}>
                  <IconCheck size={14} />
                </Badge>
                <Text fz="sm" c="gray.7" style={{lineHeight:1.4}}>{point}</Text>
              </Group>
            ))}
          </Stack>
          <Group gap={24} mt={8}>
            <Stack gap={2}>
              <Text fw={800} fz={20} c="#0b66ff">98%</Text>
              <Text fz={11} c="dimmed">Found session actionable</Text>
            </Stack>
            <Stack gap={2}>
              <Text fw={800} fz={20} c="#0b66ff">15m</Text>
              <Text fz={11} c="dimmed">Avg clarity call</Text>
            </Stack>
            <Stack gap={2}>
              <Text fw={800} fz={20} c="#0b66ff">3k+</Text>
              <Text fz={11} c="dimmed">Students guided</Text>
            </Stack>
          </Group>
          <Text fz={11} c="dimmed" style={{maxWidth:300}}>No spam. No pushy sales. Just an honest assessment & priority path.</Text>
        </Stack>

        {/* Form column */}
        <form onSubmit={handleSubmit} style={{flex:1, minWidth:300}}>
          <Stack gap={18}>
            <Stack gap={4}>
              <Group gap={10}>
                <Text fw={800} fz={22} style={{letterSpacing:-0.5}}>Schedule Your Call</Text>
                {submitted && <Badge color="blue" variant="light">Booked</Badge>}
              </Group>
              <Text fz="sm" c="dimmed">Slots fill fast for this week. Grab one now.</Text>
            </Stack>
            <Group grow align="flex-start">
              <TextInput label="Name" placeholder="Your full name" value={name} onChange={(e)=>setName(e.currentTarget.value)} required radius="md" size="md" />
              <TextInput label="Mobile" placeholder="10 digit number" value={mobile} onChange={(e)=>setMobile(e.currentTarget.value.replace(/[^0-9]/g,''))} maxLength={10} required radius="md" size="md" />
            </Group>
            <Select label="Target Year" placeholder="Select" data={['2025','2026','2027']} value={year} onChange={setYear} required radius="md" size="md" />
            {error && <Text fz={12} c="red">{error}</Text>}
            {!submitted && (
              <Button type="submit" size="md" radius="md" loading={submitting} rightSection={<IconArrowRight size={18} />} styles={{root:{background:'linear-gradient(90deg,#1f7cff 0%,#0066ff 100%)',fontWeight:600}}}>
                {submitting ? 'Scheduling...' : 'Schedule Call'}
              </Button>
            )}
            {submitted && (
              <Card radius="md" p="md" withBorder style={{background:'rgba(0,102,255,0.06)', borderColor:'rgba(0,102,255,0.25)'}}>
                <Text fz="sm" fw={500} c="blue">Thanks {name.split(' ')[0] || 'there'}! A mentor will reach out shortly.</Text>
                <Button mt={12} variant="subtle" size="xs" onClick={()=>{setSubmitted(false); setName(''); setMobile(''); setYear('2025');}}>Schedule another</Button>
              </Card>
            )}
          </Stack>
        </form>
      </Group>
    </Card>
  );
}

export default ScheduleCall;
