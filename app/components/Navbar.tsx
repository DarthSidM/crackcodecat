'use client';
import { Group, Container, Box, Anchor, Flex, Image, ActionIcon, Button, rem } from '@mantine/core';
import { IconBrandWhatsapp, IconPhoneCall } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Home', href: '/' },
    { label: 'Programs', href: '#programs' },
    { label: 'Features', href: '#features' },
    { label: 'Mentors', href: '#mentors' },
    { label: 'Achievers', href: '#achievers' },
    { label: 'FAQs', href: '#faqs' }
  ];

  return (
    <Box
      component="nav"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(10px)',
        background: scrolled
          ? 'linear-gradient(90deg,#061537 0%,#0B2C64 60%,#114CA8 100%)'
          : 'linear-gradient(90deg,#041024 0%,#06224A 55%,#0A3C7E 100%)',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.10)' : '1px solid rgba(255,255,255,0.06)',
        boxShadow: scrolled ? '0 4px 18px -4px rgba(0,0,0,0.35)' : '0 2px 10px -4px rgba(0,0,0,0.25)',
        transition: 'background 300ms ease, border-color 300ms ease, box-shadow 300ms ease'
      }}
      py="sm"
    >
      <Container size="xl">
        <Flex align="center" gap="lg" justify="space-between">
          {/* Logo */}
          <Anchor href="/" underline="never" style={{ display: 'flex', alignItems: 'center', gap: rem(8) }}>
            <Image src="/company.png" alt="Company Logo" height={42} width={42} fit="contain" radius="md" />
            <span style={{
              fontWeight: 800,
              fontFamily: 'Montserrat, sans-serif',
              letterSpacing: '-0.5px',
              fontSize: rem(18),
              color: '#fff',
              opacity: scrolled ? 1 : 1,
              transition: 'opacity 400ms ease'
            }}>CAT Crack</span>
          </Anchor>

          {/* Links */}
          <Group gap="md" visibleFrom="md" style={{ fontWeight: 600 }}>
            {links.map(link => (
              <Anchor
                key={link.href}
                href={link.href}
                underline="never"
                style={{
                  position: 'relative',
                  color: 'rgba(255,255,255,0.85)',
                  padding: '4px 8px',
                  borderRadius: 8,
                  fontSize: rem(14),
                  transition: 'color 200ms ease, background 200ms ease'
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                {link.label}
              </Anchor>
            ))}
          </Group>

          {/* Right Side Actions */}
          <Group gap={8} ml="auto">
            <Group gap={4} visibleFrom="sm">
              <ActionIcon
                component="a"
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                variant="subtle"
                aria-label="WhatsApp"
                color="green"
                style={{ color: '#25D366' }}
              >
                <IconBrandWhatsapp size={20} />
              </ActionIcon>
              <ActionIcon
                component="a"
                href="tel:1234567890"
                size="lg"
                variant="subtle"
                aria-label="Call"
                color="blue"
              >
                <IconPhoneCall size={20} />
              </ActionIcon>
            </Group>
            <Button
              component="a"
              href="/auth/signin"
              variant="subtle"
              color="gray"
              styles={{ root: { color: '#fff', fontWeight: 600 } }}
            >
              Sign In
            </Button>
            <Button
              component="a"
              href="/auth/signup"
              variant="gradient"
              gradient={{ from: '#FFC700', to: '#FFDE55' }}
              styles={{
                root: {
                  fontWeight: 700,
                  color: '#0B2C64',
                  boxShadow: '0 4px 14px -2px rgba(255,199,0,0.45)'
                }
              }}
            >
              Sign Up
            </Button>
          </Group>
        </Flex>
      </Container>
    </Box>
  );
}
