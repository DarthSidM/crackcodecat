"use client";
import { Box, Container, Title, Text, Grid, Paper, SimpleGrid, Group, Stack, ThemeIcon } from '@mantine/core';
import { IconAward, IconSchool, IconTimeline, IconBriefcase } from '@tabler/icons-react';

export function FacultySpotlight() {
  return (
    <Box component="section" py={80} style={{
      background: 'linear-gradient(180deg, #f0f4ff 0%, #ffffff 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Container size="xl">
        <Grid gutter={40} align="center">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img
                src="/guy.png"
                alt="Maruti Konduri"
                style={{
                  width: '100%',
                  maxWidth: '800px',
                  height: '600px',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </Box>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap="lg">
              <Text size="lg" fw={700} style={{ color: '#0066FF' }}>
                Meet Your Mentor
              </Text>
              <Title order={1} size={48} fw={900} style={{ color: '#003366', letterSpacing: -1.5 }}>
                Maruti Konduri
              </Title>
              <Text size="xl" c="dimmed" style={{ lineHeight: 1.6 }}>
                Known for effortlessly simplifying the most complex problems, Maruti Sir is a revered mentor for CAT aspirants nationwide. With a stellar track record and a passion for teaching, he has guided thousands to success.
              </Text>
              
              <SimpleGrid cols={2} spacing="lg" mt="md">
                <Paper withBorder p="md" radius="md" style={{ background: '#fff' }}>
                  <Group>
                    <ThemeIcon size="lg" variant="light" color="blue" radius="md">
                      <IconAward size={24} />
                    </ThemeIcon>
                    <Box>
                      <Text fw={700}>5-Time CAT 100%iler</Text>
                      <Text size="sm" c="dimmed">CAT 2019-2024</Text>
                    </Box>
                  </Group>
                </Paper>
                <Paper withBorder p="md" radius="md" style={{ background: '#fff' }}>
                  <Group>
                    <ThemeIcon size="lg" variant="light" color="grape" radius="md">
                      <IconSchool size={24} />
                    </ThemeIcon>
                    <Box>
                      <Text fw={700}>IIT-B & IIM-A Alumnus</Text>
                      <Text size="sm" c="dimmed">Premier Institutions</Text>
                    </Box>
                  </Group>
                </Paper>
                <Paper withBorder p="md" radius="md" style={{ background: '#fff' }}>
                  <Group>
                    <ThemeIcon size="lg" variant="light" color="teal" radius="md">
                      <IconTimeline size={24} />
                    </ThemeIcon>
                    <Box>
                      <Text fw={700}>10+ Years Experience</Text>
                      <Text size="sm" c="dimmed">Teaching Quant & LR</Text>
                    </Box>
                  </Group>
                </Paper>
                <Paper withBorder p="md" radius="md" style={{ background: '#fff' }}>
                  <Group>
                    <ThemeIcon size="lg" variant="light" color="orange" radius="md">
                      <IconBriefcase size={24} />
                    </ThemeIcon>
                    <Box>
                      <Text fw={700}>Ex-Investment Banker</Text>
                      <Text size="sm" c="dimmed">Barclays</Text>
                    </Box>
                  </Group>
                </Paper>
              </SimpleGrid>
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}
