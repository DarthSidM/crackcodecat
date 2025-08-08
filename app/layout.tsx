// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports

import '@mantine/core/styles.css';

import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';
import { Navbar } from './components/Navbar';

export const metadata = {
  title: 'CAT Crack - Crack the Code in 120 Days',
  description: 'Join the best CAT preparation program with expert mentors and proven strategies.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <Navbar />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}