"use client";
import { Box, Grid, Group, Stack, Text, Anchor, Divider, Button, ActionIcon } from "@mantine/core";
import { IconBrandLinkedin, IconBrandInstagram, IconBrandTwitter, IconArrowRight } from "@tabler/icons-react";

export function Footer() {
  return (
    <Box component="footer" pt={60} pb={24} style={{background: 'linear-gradient(135deg,#0b66ff 0%,#004ab3 55%,#004099 100%)', color: '#fff', position:'relative', overflow:'hidden'}}>
      {/* placeholder styling */}
      <Box component="style">{`
        footer input::placeholder { color: rgba(255,255,255,0.72); opacity:1; }
        footer input::-webkit-input-placeholder { color: rgba(255,255,255,0.72); }
        footer input::-moz-placeholder { color: rgba(255,255,255,0.72); }
        footer input:-ms-input-placeholder { color: rgba(255,255,255,0.72); }
        footer input::-ms-input-placeholder { color: rgba(255,255,255,0.72); }
      `}</Box>
      {/* subtle texture / overlay */}
      <Box aria-hidden style={{position:'absolute', inset:0, background:'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.12), rgba(255,255,255,0) 70%)'}} />
      <Box aria-hidden style={{position:'absolute', top:-140, left:-140, width:380, height:380, background:'radial-gradient(circle at 40% 40%,rgba(255,255,255,0.10),rgba(255,255,255,0) 70%)'}} />

      <Box style={{position:'relative', zIndex:1, maxWidth:1200, margin:'0 auto', padding:'0 clamp(1rem,4vw,2rem)'}}>
        <Grid gutter={40} pb={40}>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap={10}>
              <Text fw={800} fz={28} style={{letterSpacing:-0.5}}>Crack<span style={{color:'#ffd966'}}>CAT</span></Text>
              <Text fz="sm" c="rgba(255,255,255,0.75)" style={{maxWidth:340,lineHeight:1.5}}>Structured mentorship, adaptive practice and relentless analysis engineered to push you into the 99+ percentile bracket.</Text>
              <Group gap={8} mt={8}>
                {[{icon: IconBrandLinkedin, href:'#'},{icon: IconBrandTwitter, href:'#'},{icon: IconBrandInstagram, href:'#'}].map(({icon:Icon, href}) => (
                  <ActionIcon key={href} size="lg" radius="xl" variant="white" component="a" href={href} target="_blank" style={{background:'rgba(255,255,255,0.15)', color:'#fff'}}>
                    <Icon size={18} />
                  </ActionIcon>
                ))}
              </Group>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 6, sm: 4, md: 2 }}>
            <Stack gap={10}>
              <Text fw={600} fz={14} tt="uppercase" c="rgba(255,255,255,0.8)" style={{letterSpacing:0.5}}>Program</Text>
              <Stack gap={6} fz="sm">
                {['Course Overview','Mentors','Success Stories','Pricing','FAQs'].map(l => (
                  <Anchor key={l} href={`#${l.toLowerCase().replace(/ /g,'-')}`} c="rgba(255,255,255,0.75)" fz="sm" underline="never" style={{fontWeight:500}}>{l}</Anchor>
                ))}
              </Stack>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 6, sm: 4, md: 2 }}>
            <Stack gap={10}>
              <Text fw={600} fz={14} tt="uppercase" c="rgba(255,255,255,0.8)" style={{letterSpacing:0.5}}>Resources</Text>
              <Stack gap={6}>
                {['Free Blog','Daily Targets','Mock Series','Syllabus Tracker','Contact'].map(l => (
                  <Anchor key={l} href={`#${l.toLowerCase().replace(/ /g,'-')}`} c="rgba(255,255,255,0.75)" fz="sm" underline="never" style={{fontWeight:500}}>{l}</Anchor>
                ))}
              </Stack>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 4, md: 4 }}>
            <Stack gap={14}>
              <Text fw={600} fz={14} tt="uppercase" c="rgba(255,255,255,0.8)" style={{letterSpacing:0.5}}>Stay Updated</Text>
              <Text fz="sm" c="rgba(255,255,255,0.75)">Get strategy tips & important CAT updates directly in your inbox.</Text>
              <Group wrap="nowrap" gap={8}>
                <input aria-label="Email" placeholder="Email address" style={{flex:1,background:'rgba(255,255,255,0.18)',border:'1px solid rgba(255,255,255,0.25)',borderRadius:8,padding:'10px 14px',color:'#fff',fontSize:14,outline:'none'}} />
                <Button radius="md" size="sm" variant="white" rightSection={<IconArrowRight size={16} />} styles={{root:{background:'#fff',color:'#0b66ff',fontWeight:600}}}>Join</Button>
              </Group>
              <Text fz={10} c="rgba(255,255,255,0.5)">We respect your privacy. Unsubscribe anytime.</Text>
            </Stack>
          </Grid.Col>
        </Grid>
        <Divider color="rgba(255,255,255,0.15)" />
        <Group justify="space-between" pt={18} wrap="wrap" gap={8}>
          <Text fz={12} c="rgba(255,255,255,0.6)">© {new Date().getFullYear()} CrackCAT. All rights reserved.</Text>
          <Group gap={18}>
            <Anchor href="#terms" c="rgba(255,255,255,0.65)" fz={12} underline="never">Terms</Anchor>
            <Anchor href="#privacy" c="rgba(255,255,255,0.65)" fz={12} underline="never">Privacy</Anchor>
            <Anchor href="#refund" c="rgba(255,255,255,0.65)" fz={12} underline="never">Refund Policy</Anchor>
          </Group>
        </Group>
      </Box>
    </Box>
  );
}

export default Footer;
