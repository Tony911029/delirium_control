import './globals.css';

import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'Delirium Control Dashboard',
  description:
    'A user dashboard for monitoring patients with delirium.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen w-full flex-col">{children}</body>
      <Analytics />
    </html>
  );
}
