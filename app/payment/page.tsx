"use client"
import axios from "axios";
import Script from "next/script";
import { useState, useMemo, useEffect } from 'react';
import { Card, Stack, Text, Group, Button, Divider, Badge, TextInput, LoadingOverlay, ThemeIcon, rem } from '@mantine/core';
import { IconShieldCheck, IconLock, IconArrowRight, IconCheck } from '@tabler/icons-react';
import { Document } from "mongoose";


interface Course extends Document{
  courseName: string;
  courseDescription: string;
  price: number;
  cgst : number;
  sgst : number;
}

export default function Payment(){
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [custName, setCustName] = useState('');
  const [custEmail, setCustEmail] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [course,setCourse] = useState<Course>()

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get("/api/manager/courses/");
        // console.log(res.data);
        
        setCourse(res.data.courses[0]);
      } catch (err) {
        console.error("Failed to fetch course", err);
        setError("Could not load course details. Please try again later.");
      }
    };
  
    fetchCourse();
  }, []);
  
 
  // Derive inclusive tax breakdown
  const breakdown = useMemo(() => {
    if (!course) return { base: 0, cgst: 0, sgst: 0, total: 0 };
    
    return {
      base: course.price,
      cgst: course.price * course.cgst/100,
      sgst: course.price * course.sgst/100,
      total: course.price + course.price * course.cgst/100 + course.price * course.sgst/100
    };
  }, [course]);
  

  const valid = custName.trim() && /\S+@\S+\.\S+/.test(custEmail) && /^\d{10}$/.test(custPhone);

  const handlePay = async () => {
    if (!valid) { setError('Enter valid name, email & 10 digit mobile'); return; }
    setError(null);
    setLoading(true);
    try {
      const orderRes = await axios.post("/api/create-order", {course_Id : course?.id}); // paise
      const options: any = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
        amount: 9000 * 100,
        currency: "INR",
        name: "CrackCAT Course",
        description: "Complete CAT Course Enrollment",
        order_id: orderRes.data.id,
        prefill: { name: custName, email: custEmail, contact: `+91${custPhone}` },
        notes: { plan: 'complete_cat_course', target_year: '2025' },
        theme: { color: "#0b66ff" },
        handler: (resp: any) => {
          console.log('Payment success', resp);
        },
        modal: {
          ondismiss: () => { console.log('Checkout closed'); }
        }
      };
      const rp = new (window as any).Razorpay(options);
      rp.open();
    } catch (e: any) {
      console.error(e);
      setError(e?.response?.data?.message || 'Could not initiate payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Script id="razorpay-checkout-js" src="https://checkout.razorpay.com/v1/checkout.js" />
      <Card withBorder radius="lg" shadow="sm" p="xl" style={{maxWidth:860,margin:'40px auto 80px',background:'linear-gradient(135deg,#ffffff 0%,#f5f8ff 100%)',position:'relative'}}>
        <LoadingOverlay visible={loading} zIndex={40} overlayProps={{bg:'#ffffffaa', blur:2}} />
        <Stack gap={28}>
          <Stack gap={4}>
            <Group gap={10}>
              <Text fw={800} fz={30} style={{letterSpacing:-0.8}}>Secure Checkout</Text>
              <Badge variant="light" color="blue" styles={{root:{background:'#EAF2FF',color:'#0b66ff',fontWeight:600}}}>GST 18% Included</Badge>
            </Group>
            <Text fz="sm" c="dimmed">Enroll now and unlock live mentorship, adaptive practice & full mock stack instantly.</Text>
          </Stack>

          <Group align="flex-start" gap={32} wrap="wrap" justify="space-between">
            {/* Summary */}
            <Card withBorder radius="md" p="lg" style={{flex:1,minWidth:300}}>
              <Stack gap={14}>
                <Text fw={700} fz={18}>Order Summary</Text>
                <Stack gap={6}>
                  <Group justify="space-between">
                    <Text fz="sm" c="dimmed">Course Fee (Base)</Text>
                    <Text fz="sm" fw={600}>₹{breakdown.base.toLocaleString('en-IN')}</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text fz="sm" c="dimmed">CGST 9%</Text>
                    <Text fz="sm" fw={600}>₹{breakdown.cgst.toLocaleString('en-IN')}</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text fz="sm" c="dimmed">SGST 9%</Text>
                    <Text fz="sm" fw={600}>₹{breakdown.sgst.toLocaleString('en-IN')}</Text>
                  </Group>
                  <Divider my={4} />
                  <Group justify="space-between">
                    <Text fw={700}>Total Payable</Text>
                    <Text fw={800} fz={22} style={{letterSpacing:-0.5,color:'#0b66ff'}}>₹{breakdown.total.toLocaleString('en-IN')}</Text>
                  </Group>
                </Stack>
                <Group gap={10} mt={4}>
                  <ThemeIcon size={34} radius="md" variant="light" color="blue"><IconShieldCheck size={18} /></ThemeIcon>
                  <Text fz={12} c="dimmed">100% secure encrypted payment • Instant activation post success</Text>
                </Group>
                <Group gap={10}>
                  <ThemeIcon size={34} radius="md" variant="light" color="blue"><IconLock size={18} /></ThemeIcon>
                  <Text fz={12} c="dimmed">We do not store your card data on our servers</Text>
                </Group>
                <Stack gap={6} mt={6}>
                  {['Live mentor checkpoints','Adaptive mock analytics','Doubt solving support','Full archive access'].map(f => (
                    <Group gap={8} key={f}>
                      <ThemeIcon size={22} radius="xl" variant="light" color="blue"><IconCheck size={14} /></ThemeIcon>
                      <Text fz={12} fw={500}>{f}</Text>
                    </Group>
                  ))}
                </Stack>
              </Stack>
            </Card>

            {/* Details / form */}
            <Card withBorder radius="md" p="lg" style={{flex:1,minWidth:300,position:'relative'}}>
              <Stack gap={16}>
                <Text fw={700} fz={18}>Your Details</Text>
                <TextInput label="Full Name" placeholder="Enter name" value={custName} onChange={e=>setCustName(e.currentTarget.value)} required radius="md" />
                <TextInput label="Email" placeholder="you@example.com" value={custEmail} onChange={e=>setCustEmail(e.currentTarget.value)} required radius="md" />
                <TextInput label="Mobile" placeholder="10 digit" value={custPhone} onChange={e=>setCustPhone(e.currentTarget.value.replace(/[^0-9]/g,''))} maxLength={10} required radius="md" />
                {error && <Text fz={12} c="red">{error}</Text>}
                <Button size="md" radius="md" disabled={!valid || loading} loading={loading} rightSection={<IconArrowRight size={18} />} styles={{root:{background:'linear-gradient(90deg,#1f7cff 0%,#0066ff 100%)',fontWeight:600}}} onClick={handlePay}>
                  {loading ? 'Processing...' : `Pay ₹${breakdown.total.toLocaleString('en-IN')}`}
                </Button>
                <Text fz={11} c="dimmed" ta="center">By proceeding you agree to our Terms & Refund Policy.</Text>
              </Stack>
            </Card>
          </Group>
        </Stack>
      </Card>
    </>
  )
}