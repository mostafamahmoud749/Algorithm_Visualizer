import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navs from '@/comp/Navs';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Sort & Search Visualizer',
  description: 'Visualization app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className='light'>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="flex flex-col items-center min-h-screen px-6 py-2 bg-linear-to-br from-gray-50 to-gray-200">
          <Navs />
          {children}
        </div>
      </body>
    </html>
  );
}
