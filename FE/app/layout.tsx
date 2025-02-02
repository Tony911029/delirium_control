import './globals.css';

import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'Delirium Control Dashboard',
  description:
    'A user dashboard for monitoring patients with delirium.',
  icons: {
    icon: './robot.ico',
  },
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/robot.ico" />
        {/* For Apple devices */}
        <link rel="apple-touch-icon" href="/robot.png" />
      </head>
      <body className="flex min-h-screen w-full flex-col">{children}</body>
      <Analytics />
    </html>
  );
}
