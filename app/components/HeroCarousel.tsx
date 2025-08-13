"use client";

import { useEffect, useMemo, useState } from "react";
import type { EmblaCarouselType } from "embla-carousel";
import { Carousel } from "@mantine/carousel";
import {
  Box,
  Button,
  Card,
  Grid,
  Group,
  Image,
  List,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
  rem,
  Badge,
} from "@mantine/core";
import { IconArrowRight, IconCheck, IconQuote, IconShieldCheck } from "@tabler/icons-react";

const students = [
  { name: "Aarav Shah", percentile: "99.82", img: "/6.jpg" },
  { name: "Ishita Mehra", percentile: "99.45", img: "/1.jpg" },
  { name: "Rohan Gupta", percentile: "99.11", img: "/2.jpg" },
  { name: "Neha Verma", percentile: "98.76", img: "/3.jpg" },
  { name: "Kunal Singh", percentile: "98.25", img: "/5.jpg" },
  { name: "Priya Rao", percentile: "97.90", img: "/4.jpg" },
];

const testimonials = [
  {
    quote:
      "Mentorship was game-changing. The strategy sessions boosted my VARC from 60 to 98 percentile.",
    name: "Sarthak (CAT 99.06)",
  },
  {
    quote:
      "Mocks were spot on. Doubt resolution within hours kept me on track even with a job.",
    name: "Aditi (CAT 98.4)",
  },
  {
    quote:
      "Daily targets gave me discipline. The course design is simply world-class.",
    name: "Vivek (CAT 97.8)",
  },
];

function useCountdown(targetDate: Date) {
  const getDiff = () => {
    const now = new Date().getTime();
    const distance = Math.max(0, targetDate.getTime() - now);
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds };
  };
  const [time, setTime] = useState(getDiff());
  useEffect(() => {
    const id = setInterval(() => setTime(getDiff()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export function HeroCarousel() {
  const [embla, setEmbla] = useState<EmblaCarouselType | null>(null);
  const [paused, setPaused] = useState(false);
  // Mini students carousel state
  const [miniEmbla, setMiniEmbla] = useState<EmblaCarouselType | null>(null);
  const [miniPaused, setMiniPaused] = useState(false);

  // Adjust this value to control vertical spacing on all slides
  const SLIDE_PADDING = { base: 8, md: 8 };

  // Next CAT date (adjust as needed)
  const catDate = useMemo(() => new Date("2025-11-30T09:00:00+05:30"), []);
  const countdown = useCountdown(catDate);

  useEffect(() => {
    if (!embla || paused) return;
    const id = setInterval(() => {
      try {
        embla.scrollNext();
      } catch { }
    }, 6000);
    return () => clearInterval(id);
  }, [embla, paused]);

  useEffect(() => {
    if (!miniEmbla || miniPaused) return;
    const id = setInterval(() => {
      try {
        if (miniEmbla.canScrollNext()) miniEmbla.scrollNext();
        else miniEmbla.scrollTo(0);
      } catch { }
    }, 2600);
    return () => clearInterval(id);
  }, [miniEmbla, miniPaused]);

  return (
    <Box
      component="section"
      // Full-bleed without horizontal overflow, handles scrollbar width
      style={{
        position: "relative",
        overflowX: "clip",
        overflowY: "hidden",
        left: "50%",
        right: "50%",
        marginLeft: "-50vw",
        marginRight: "-50vw",
        width: "100vw",
        background: '#fafbff',
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >

      <Carousel
        withIndicators
        height="83dvh"
        getEmblaApi={setEmbla}
        slideSize="100%"
        slideGap={0}
        controlsOffset="sm"
        controlSize={40}
        styles={{
          indicator: { backgroundColor: "#1f7cff" },
          container: { margin: -70 },
          viewport: { margin: 0 },
          root: { width: "100vw" },
          controls: { pointerEvents: "auto", zIndex: 10, right: 8 },
        }}
        emblaOptions={{ loop: true, align: "start" }}

      >
        {/* Slide 1: Mentor (free-standing) + Hero Copy + Countdown */}
        <Carousel.Slide>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "100vh",
              width: "100%",
            }}
            py={SLIDE_PADDING}
          >
            <Grid gutter={0} align="center" h="auto" style={{ width: "100%", maxWidth: 1200 }}>
              <Grid.Col span={{ base: 12, md: 6 }}>
                {/* Spotlight Mentor Section */}
                <Box
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: 'clamp(420px,70vh,820px)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    overflow: 'visible'
                  }}
                >
                  {/* Radial spotlight */}
                  <Box aria-hidden="true" style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at 50% 55%, rgba(31,124,255,0.25), rgba(255,255,255,0) 60%)'
                  }} />
                  {/* Soft glow layer */}
                  <Box aria-hidden="true" style={{
                    position: 'absolute',
                    top: '10%',
                    left: '50%',
                    width: '60%',
                    height: '60%',
                    transform: 'translateX(-50%)',
                    background: 'linear-gradient(135deg,#1f7cff55,#0066ff11)',
                    filter: 'blur(60px)',
                    opacity: 0.9
                  }} />
                  <Image
                    src="/crackcode.png"
                    alt="Lead Mentor"
                    fit="contain"
                    style={{
                      position: 'relative',
                      zIndex: 2,
                      height: '100%',
                      width: 'auto',
                      filter: 'drop-shadow(0 32px 64px rgba(0,0,0,0.25))'
                    }}
                  />
                  {/* Overlay Info */}
                  <Card
                    withBorder
                    radius="xl"
                    p="md"
                    shadow="lg"
                    style={{
                      position: 'absolute',
                      bottom: 24,
                      left: 24,
                      zIndex: 3,
                      minWidth: 200,
                      background: 'rgba(255,255,255,0.85)',
                      backdropFilter: 'blur(8px)',
                      boxShadow: '0 4px 32px rgba(31,124,255,0.10)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 8
                    }}
                  >
                    <Text size="xs" c="dimmed" fw={500} mb={2} style={{ letterSpacing: 0.2 }}>Lead Mentor</Text>
                    <Text fw={800} fz={22} style={{ lineHeight: 1.1, textAlign: 'center' }}>Abhishek Anand</Text>
                    <Badge
                      size="lg"
                      radius="md"
                      color="blue"
                      variant="filled"
                      style={{ marginTop: 8, fontWeight: 700, fontSize: 16, letterSpacing: 0.5 }}
                    >
                      100 %ile
                    </Badge>
                  </Card>
                </Box>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6 }}>
                <Stack gap={12} px={{ base: 8, md: 24 }} pr={{ md: 60 }}>
                  <Badge size="lg" variant="light" styles={{ root: { background: "#EAF2FF", color: "#0066FF" } }}>
                    From setbacks to success
                  </Badge>
                  <Title order={1} fz={{ base: 30, md: 56 }} fw={900} style={{ letterSpacing: -0.5, lineHeight: 1.05 }}>
                    Crack the Code in 120 Days!
                  </Title>
                  <Group gap={16}>
                    <Card withBorder radius="md" p="sm" shadow="sm" style={{ background: "rgba(255,255,255,0.65)", backdropFilter: "blur(6px)" }}>
                      <Text size="sm" c="dimmed">Next CAT in</Text>
                      <Group gap={12} wrap="nowrap" mt={6}>
                        {([['Days', countdown.days], ['Hours', countdown.hours], ['Minutes', countdown.minutes], ['Seconds', countdown.seconds]]).map(
                          ([label, val]) => (
                            <Stack key={label} gap={2} align="center">
                              <Text fw={800} fz={24}>{String(val).padStart(2, '0')}</Text>
                              <Text size="xs" c="dimmed">{label}</Text>
                            </Stack>
                          )
                        )}
                      </Group>
                    </Card>
                  </Group>
                  <Text fz={{ base: "md", md: 18 }} c="dimmed">
                    Learn with IIM alumni and 100 percentilers. Structured plans, daily targets, and precision mocks
                    designed to maximise your score.
                  </Text>
                  <Group gap="sm">
                    <Button size="md" radius="md" variant="filled" color="blue" rightSection={<IconArrowRight size={18} />} component="a" href="/payment">
                      Enroll Now @₹7,999
                    </Button>
                    <Button size="md" radius="md" variant="light" styles={{ root: { background: 'linear-gradient(135deg,#6d5dfc 0%,#8f73ff 100%)', color: '#fff', boxShadow:'0 4px 18px -4px rgba(109,93,252,0.55)' } }} component="a" href="tel:+918744003503">
                      Book Free Counseling Call
                    </Button>
                  </Group>
                  <Group gap={24} mt={8}>
                    <Group gap={8}>
                      <ThemeIcon color="blue" variant="light" radius="xl"><IconCheck size={16} /></ThemeIcon>
                      <Text fz="sm">Structured roadmap</Text>
                    </Group>
                    <Group gap={8}>
                      <ThemeIcon color="blue" variant="light" radius="xl"><IconCheck size={16} /></ThemeIcon>
                      <Text fz="sm">Mentor support</Text>
                    </Group>
                    <Group gap={8}>
                      <ThemeIcon color="blue" variant="light" radius="xl"><IconCheck size={16} /></ThemeIcon>
                      <Text fz="sm">Adaptive mock analysis</Text>
                    </Group>
                  </Group>
                </Stack>
              </Grid.Col>
            </Grid>
          </Box>
        </Carousel.Slide>

        <Carousel.Slide>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "100vh",
              width: "100%",
            }}
            py={SLIDE_PADDING}
          >
            <Grid
              gutter={0}
              align="center"
              h="auto"
              style={{
                width: "100%",
                maxWidth: 1200,
              }}
            >
              <Grid.Col span={{ base: 12, md: 7 }}>
                <Stack justify="space-between" h="100%" p={{ base: 'sm', md: 'lg' }} pb={{ base: 'xs', md: 'md' }}>
                  <Stack gap="md">
                    <Title order={1} fz={{ base: 32, md: 56 }} fw={900} c="gray.9">
                      <Text component="span" c="#1f7cff" inherit>540+</Text> Cracku Students Scored <Text component="span" c="#1f7cff" inherit>99+%ile</Text> in CAT
                    </Title>
                    <Text fz={{ base: 'lg', md: 'xl' }} c="gray.7">
                      You can be the next....
                    </Text>
                    <Button
                      size="lg"
                      radius="md"
                      variant="filled"
                      color="blue"
                      component="a"
                      href="/payment"
                      style={{
                        width: 'fit-content',
                        background: 'linear-gradient(135deg, #1f7cff 0%, #0066ff 100%)',
                        boxShadow: '0 8px 32px rgba(31, 124, 255, 0.3)'
                      }}
                      rightSection={<IconArrowRight size={20} />}
                    >
                      Enroll Now
                    </Button>
                  </Stack>
                  <Box onMouseEnter={() => setMiniPaused(true)} onMouseLeave={() => setMiniPaused(false)}>
                    <Card
                      shadow="xl"
                      radius="lg"
                      p="md"
                      withBorder
                      style={{
                        background: 'rgba(255, 255, 255, 0.85)',
                        backdropFilter: 'blur(20px)',
                        borderColor: 'rgba(31, 124, 255, 0.2)',
                        border: '1px solid rgba(31, 124, 255, 0.15)',
                        boxShadow: '0 8px 32px rgba(31, 124, 255, 0.1)'
                      }}
                    >
                      <Carousel
                        height={56} // reduced height
                        slideSize={{ base: '50%', sm: '33.33%', md: '25%' }}
                        slideGap={8} // explicit numeric gap for tighter layout
                        withControls={false}
                        styles={{
                          container: { alignItems: 'center' },
                          viewport: { paddingTop: 4, paddingBottom: 4 }, // slight vertical breathing
                        }}
                        emblaOptions={{ loop: true, align: 'start' }}
                        getEmblaApi={setMiniEmbla}
                      >
                        {students.map((s) => (
                          <Carousel.Slide key={s.name}>
                            <Group wrap="nowrap" gap={6} align="center" style={{ lineHeight: 1 }}>
                              <Image
                                src={s.img}
                                alt={`${s.name} headshot`}
                                w={40}
                                h={40}
                                radius="xl"
                                fit="cover"
                                style={{
                                  border: '1px solid rgba(31,124,255,0.25)',
                                  boxShadow: '0 2px 6px rgba(31,124,255,0.18)'
                                }}
                              />
                              <Stack gap={2} justify="center">
                                <Text fw={600} fz={12} lineClamp={1}>{s.name}</Text>
                                <Text fz={10} c="#1f7cff">CAT {s.percentile}%ile</Text>
                              </Stack>
                            </Group>
                          </Carousel.Slide>
                        ))}
                      </Carousel>
                    </Card>
                  </Box>
                </Stack>
              </Grid.Col>
              {/* Testimonials */}
              <Grid.Col span={{ base: 12, md: 5 }}>
                <Stack gap="sm" justify="center" h="100%" p={{ base: 'sm', md: 'md' }} pr={{ md: 'lg' }}>
                  {testimonials.map((t, i) => (
                    <Card
                      key={i}
                      shadow="lg"
                      radius="lg"
                      p="sm"
                      withBorder
                      style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(20px)',
                        borderColor: 'rgba(31, 124, 255, 0.15)',
                        border: '1px solid rgba(31, 124, 255, 0.1)',
                        boxShadow: '0 8px 32px rgba(31, 124, 255, 0.08)'
                      }}
                    >
                      <Stack gap="sm">
                        <Group>
                          <ThemeIcon
                            radius="xl"
                            size="lg"
                            variant="light"
                            color="blue"
                            style={{ background: 'rgba(31, 124, 255, 0.1)', color: '#1f7cff' }}
                          >
                            <IconQuote style={{ width: rem(20), height: rem(20) }} />
                          </ThemeIcon>
                          <Text fw={700} fz="md" c="#1f7cff">{t.name}</Text>
                        </Group>
                        <Text fz="sm" c="gray.7">{t.quote}</Text>
                      </Stack>
                    </Card>
                  ))}
                </Stack>
              </Grid.Col>
            </Grid>
          </Box>
        </Carousel.Slide>

        <Carousel.Slide>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "100dvh",
              width: "100%",
              position: 'relative',
              overflow: 'hidden'
            }}
            py={0}
          >
            <Grid gutter={40} align="center" style={{position:'relative',zIndex:2,width:'100%',maxWidth:1200,padding:'clamp(1.25rem,2.2vw,2.25rem)'}}>
              <Grid.Col span={{ base: 12, md: 7 }}>
                <Stack gap={28} pr={{ md: 32 }}>
                  <Stack gap={14}>
                    <Group gap={10} wrap="wrap">
                      <Badge styles={{root:{background:'#6d5dfc',color:'#fff',fontWeight:700}}}>EARLY-BIRD</Badge>
                      <Badge variant="light" styles={{root:{background:'#EAF2FF',color:'#0066FF',fontWeight:600}}}>EMI AVAILABLE</Badge>
                      <Badge variant="light" styles={{root:{background:'#1f7cff',color:'#fff',fontWeight:600}}}>LIMITED SEATS</Badge>
                    </Group>
                    <Title order={1} fz={{ base: 26, md: 50 }} fw={900} style={{lineHeight:1.08,letterSpacing:-0.5}}>
                      Complete CAT Course
                      <Text inherit component="span" display="block" fw={900} c="#0b66ff">Crack 2025 with Confidence</Text>
                    </Title>
                    <Text fz={{ base: 'sm', md: 16 }} c="dimmed" style={{maxWidth:720}}>
                      Live concept mastery, exam-level mocks, adaptive practice engine and personal mentor checkpoints – everything engineered to push you into the 99+ percentile zone.
                    </Text>
                  </Stack>

                  <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={8} verticalSpacing={8} style={{maxWidth:600}}>
                    {[
                      'Daily adaptive study targets',
                      '25 full-length CAT mocks',
                      '20k+ high-yield questions',
                      '1:1 mentor guidance',
                      'Sectional tests & analytics',
                      'Fast doubt resolution (<24h)'
                    ].map((feat) => (
                      <Group key={feat} gap={6} align="flex-start">
                        <ThemeIcon size={22} radius="md" variant="light" color="blue"><IconCheck size={14} /></ThemeIcon>
                        <Text fz={{ base: 'xs', md: 'sm' }} fw={500}>{feat}</Text>
                      </Group>
                    ))}
                  </SimpleGrid>

                  <Group gap={18} wrap="wrap">
                    <Button size="lg" radius="md" component="a" href="/payment" rightSection={<IconArrowRight size={20} />} styles={{root:{background:'linear-gradient(90deg,#1f7cff 0%,#0066ff 100%)',boxShadow:'0 10px 28px -8px rgba(31,124,255,.55)',paddingInline:34,fontWeight:700}}}>
                      Enroll Now
                    </Button>
                    <Button size="lg" radius="md" variant="outline" color="blue" component="a" href="#catalog" styles={{root:{background:'#ffffffaa',backdropFilter:'blur(6px)',fontWeight:600}}}>
                      View Curriculum
                    </Button>
                    <Group gap={8} wrap="nowrap">
                      <ThemeIcon size={30} radius="xl" color="blue" variant="light"><IconShieldCheck size={16} /></ThemeIcon>
                      <Text fz={10} c="dimmed" fw={500}>7‑day refund guarantee</Text>
                    </Group>
                  </Group>

                  <Group gap={24} pt={4} wrap="wrap">
                    <Stack gap={2}>
                      <Text fw={800} fz={24} c="#0b66ff">540+</Text>
                      <Text fz={11} c="dimmed">99+ %ilers mentored</Text>
                    </Stack>
                    <Stack gap={2}>
                      <Text fw={800} fz={24} c="#0b66ff">25</Text>
                      <Text fz={11} c="dimmed">Full mocks</Text>
                    </Stack>
                    <Stack gap={2}>
                      <Text fw={800} fz={24} c="#0b66ff">20k+</Text>
                      <Text fz={11} c="dimmed">Practice Qs</Text>
                    </Stack>
                    <Stack gap={2}>
                      <Text fw={800} fz={24} c="#0b66ff">98%</Text>
                      <Text fz={11} c="dimmed">Doubt SLA met</Text>
                    </Stack>
                  </Group>
                </Stack>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 5 }}>
                <Box style={{position:'relative',height:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                  {/* Hero illustration / visual container */}
                  <Box style={{position:'relative',width:'100%',maxWidth:460,aspectRatio:'4/3',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:28,background:'linear-gradient(135deg,#1f7cff10,#6d5dfc12)',boxShadow:'0 6px 32px -10px rgba(109,93,252,0.35)',backdropFilter:'blur(4px)',overflow:'hidden'}}>
                    <Image src="/hero.jpg" alt="Course experience" fit="contain" style={{objectFit:'contain',padding:20}} />
                    <Badge size="md" radius="sm" styles={{root:{position:'absolute',top:14,left:14,background:'#1f7cff',color:'#fff',fontWeight:600}}}>All Access</Badge>
                    <Badge size="md" radius="sm" styles={{root:{position:'absolute',top:14,right:14,background:'#6d5dfc',color:'#fff',fontWeight:600}}}>Offer</Badge>
                  </Box>
                  {/* Pricing block */}
                  <Group gap={18} mt={24} align="flex-end" style={{textAlign:'center'}}>
                    <Stack gap={4} align="center">
                      <Group gap={6}>
                        <Text fz={12} c="dimmed" style={{textDecoration:'line-through'}}>₹14,999</Text>
                        <Badge variant="light" color="blue" styles={{root:{background:'#EAF2FF',color:'#0066FF',fontWeight:600,fontSize:11,paddingInline:8}}}>47% OFF</Badge>
                      </Group>
                      <Group gap={4} align="baseline">
                        <Text fw={900} fz={rem(42)} c="#0b66ff">₹7,999</Text>
                        <Text fz={11} c="dimmed">GST incl.</Text>
                      </Group>
                      <Text fz={10} c="dimmed">Pay in 3 interest‑free EMIs • Instant access</Text>
                    </Stack>
                  </Group>
                </Box>
              </Grid.Col>
            </Grid>
          </Box>
        </Carousel.Slide>

      </Carousel>
    </Box>
  );
}

export default HeroCarousel;
