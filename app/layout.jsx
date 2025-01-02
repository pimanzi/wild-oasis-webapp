import Logo from '@/app/_components/Logo';
import Navigation from '@/app/_components/Navigation';
import '@//app/_styles/globals.css';
import { Josefin_Sans } from 'next/font/google';
export const metadata = {
  // title: 'Wild Oasis',
  title: {
    template: '%s / The wild oasis',
    default: 'Welcome / The wild oasis',
  },
  description:
    'Luxurious cabin hotel,located in Rwanda,surrounded by beautiful mountains and dark forests',
};
const josefin = Josefin_Sans({
  display: 'swap',
  subsets: ['latin'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} min-h-screen bg-primary-950 text-primary-100`}
      >
        <header>
          <Logo></Logo>
          <Navigation></Navigation>
        </header>

        <main>{children}</main>

        <footer>Copyright by The wild Oasis</footer>
      </body>
    </html>
  );
}
