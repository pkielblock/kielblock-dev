import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pedro Kielblock",
  description: "Pedro Kielblock's personal website and portfolio.",
};

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'pt' }]
}

export default function RootLayout({ children, params }) {
  return (
    <div className={inter.className}>
      {children}
    </div>
  );
} 