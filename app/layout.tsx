import './globals.css';
import type { Metadata } from 'next';
import { Itim } from 'next/font/google';
import { Navbar, Footer, Providers } from '@/shared/components';

const itim = Itim({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
  title: 'Flexibble',
  description: 'Flexibble App'
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang='en'>
      <body className={itim.className}>
        <Providers />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
