import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Cameroon Lawyer | Cameroon Laws and Penal Code",
//   description: "Your trusted AI assistant for legal insights on Cameroon laws and the penal code.",
// };

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'Cameroon Legal Assistant | AI-Powered Legal Insights',
  description: 'Your trusted AI assistant for legal insights on Cameroon laws, penal code, and legal procedures. Get instant answers about Cameroon legal system.',
  keywords: 'Cameroon lawyer, Cameroon laws, Cameroon legal system, Cameroon penal code, legal AI assistant, Cameroon legal advice, Cameroon jurisprudence, droit camerounais',
  authors: [{ name: 'Cameroon Legal AI Assistant' }],
  creator: 'Cameroon Legal AI Assistant',
  publisher: 'Cameroon Legal AI Assistant',
  metadataBase: new URL('https://your-domain.com'),
  openGraph: {
    title: 'Cameroon Legal Assistant | AI-Powered Legal Insights',
    description: 'Your trusted AI assistant for legal insights on Cameroon laws, penal code, and legal procedures. Get instant answers about Cameroon legal system.',
    type: 'website',
    locale: 'en_CM',
    alternateLocale: 'fr_CM',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cameroon Legal Assistant | AI-Powered Legal Insights',
    description: 'Your trusted AI assistant for legal insights on Cameroon laws, penal code, and legal procedures.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  category: 'Legal Technology',
  alternates: {
    languages: {
      'en-CM': '/en',
      'fr-CM': '/fr'
    }
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + ""}>{children}</body>
    </html>
  );
}
