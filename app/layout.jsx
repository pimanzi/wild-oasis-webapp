import Logo from '@/app/_components/Logo';
import Navigation from '@/app/_components/Navigation';

export const metadata = {
  title: 'Wild Oasis',
  description: 'created by Placide Imanzi Kabisa',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
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
