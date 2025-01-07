import '@//app/_styles/globals.css';
import { Josefin_Sans } from 'next/font/google';
import Header from './_components/Header';
import { ReservationProvider } from './_components/ReservationContext';
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
        className={`${josefin.className} relative  flex flex-col min-h-screen bg-primary-950 text-primary-100`}
      >
        <Header></Header>
        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
