import Logo from '@/app/_components/Logo';
import Navigation from '@/app/_components/Navigation';
import '@//app/_styles/globals.css';
export const metadata = {
  title: 'Wild Oasis',
  description: 'created by Placide Imanzi Kabisa',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-primary-950 text-primary-100">
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
