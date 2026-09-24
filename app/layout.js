import { Inter } from 'next/font/google';
import { CartProvider } from '@/components/CartContext';
import BottomNav from '@/components/BottomNav';
import PageTransition from '@/components/PageTransition';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata = {
  title: 'Table Order — Demo',
  description: 'QR-code table-ordering demo',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <div className="app-shell">
            <main className="app-main">
              <PageTransition>{children}</PageTransition>
            </main>
            <BottomNav />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
