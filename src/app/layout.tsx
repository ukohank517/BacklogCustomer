import type { Metadata } from "next";
import { Providers } from './providers';
import Header from './component/common/Header';
import Main from './component/common/Main';
import Footer from './component/common/Footer';

export const metadata: Metadata = {
  title: "Backlog Customer App",
  description: "customized page using Backlog Api",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <Main>
            {children}
          </Main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
