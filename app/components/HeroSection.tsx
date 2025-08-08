"use client";
import { Box, Container, Flex, Button, Image, Group } from "@mantine/core";

export function HeroSection() {
  return (
    <Box 
      component="section" 
      py={80} 
      style={{ 
        background: 'linear-gradient(120deg, #0066FF 0%, #0052CC 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated background elements */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)
          `,
          animation: 'float 6s ease-in-out infinite'
        }}
      />
      <Container size="lg" style={{ position: 'relative', zIndex: 1 }}>
        <Flex 
          align="center" 
          justify="space-between" 
          direction={{ base: 'column', md: 'row' }} 
          gap={60}
        >
          <Box style={{ flex: 1 }}>
            <h1 
              style={{ 
                fontSize: 48, 
                fontWeight: 900, 
                margin: 0, 
                lineHeight: 1.1,
                color: 'white',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                animation: 'slideInLeft 1s ease-out',
                textAlign: 'left'
              }}
            >
              Crack the Code in{' '}
              <span style={{ 
                color: '#ffd700',
                textShadow: '0 0 20px rgba(255, 215, 0, 0.5)'
              }}>
                120 Days!
              </span>
            </h1>
            <p 
              style={{ 
                fontSize: 22, 
                margin: '32px 0 0 0', 
                color: 'rgba(255,255,255,0.9)', 
                maxWidth: 520,
                lineHeight: 1.6,
                animation: 'slideInLeft 1s ease-out 0.2s both',
                textAlign: 'left'
              }}
            >
              Transform your CAT preparation with our proven 4-month sprint. From setbacks to success - join{' '}
              <strong style={{ color: '#ffd700' }}>1,200+ students</strong> who cracked the code.
            </p>
            <Group mt={36} gap={20} style={{ flexWrap: 'wrap', alignItems: 'flex-start', animation: 'slideInLeft 1s ease-out 0.4s both' }}>
              <Button
                component="a"
                href="#enroll"
                size="lg"
                radius="xl"
                fw={700}
                px={32}
                py={10}
                style={{
                  background: 'linear-gradient(90deg, #FFC700 0%, #FFD700 100%)',
                  color: '#003366',
                  fontSize: 20,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                  letterSpacing: 0.5,
                  border: 'none',
                  transition: 'transform 0.15s, background 0.2s',
                }}
                styles={{
                  root: {
                    '&:hover, &:focus': {
                      background: 'linear-gradient(90deg, #FFD700 0%, #FFC700 100%)',
                      color: '#003366',
                      transform: 'translateY(-4px) scale(1.03)',
                    },
                  },
                }}
              >
                Enroll Now @ ₹7,999 – VARC Sprint
              </Button>
              <Button
                component="a"
                href="#counseling"
                size="lg"
                radius="xl"
                variant="outline"
                fw={700}
                px={32}
                py={10}
                style={{
                  border: '2px solid #0066FF',
                  color: '#0066FF',
                  background: '#fff',
                  fontSize: 18,
                  letterSpacing: 0.5,
                  transition: 'transform 0.15s, background 0.2s, color 0.2s',
                }}
                styles={{
                  root: {
                    '&:hover, &:focus': {
                      background: '#E3F0FF',
                      color: '#0052CC',
                      borderColor: '#0052CC',
                      transform: 'translateY(-4px) scale(1.03)',
                    },
                  },
                }}
              >
                Book Free Counseling Call
              </Button>
            </Group>
          </Box>
          <Box 
            style={{ 
              flex: 1, 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              animation: 'slideInRight 1s ease-out 0.4s both'
            }}
          >
            <Box
              style={{
                position: 'relative',
                borderRadius: '50%',
                background: 'linear-gradient(145deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: 24,
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                animation: 'pulse 3s ease-in-out infinite'
              }}
            >
              <Image
                src="/hero.jpg"
                alt="Hero Logo"
                height={280}
                width={280}
                fit="contain"
                style={{ 
                  borderRadius: '50%',
                  animation: 'rotate 20s linear infinite'
                }}
              />
            </Box>
          </Box>
        </Flex>
      </Container>
      {/* Animations moved to globals.css */}
    </Box>
  );
}
