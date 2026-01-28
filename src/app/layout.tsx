import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/sections/Footer';
import CustomCursor from '@/components/effects/CustomCursor';

const cormorant = Cormorant_Garamond({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Aura Space | Luxury Architecture',
  description:
    'Where Architecture Meets Timeless Elegance. Aura Space creates bespoke architectural designs that transcend the ordinary.',
  keywords: ['architecture', 'luxury', 'design', 'interior', 'residential'],
  authors: [{ name: 'Aura Space' }],
  openGraph: {
    title: 'Aura Space | Luxury Architecture',
    description: 'Where Architecture Meets Timeless Elegance',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${inter.variable}`}>
        <CustomCursor />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
