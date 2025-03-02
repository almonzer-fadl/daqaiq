import { Geist, Geist_Mono } from "next/font/google"; // Import Geist and Geist_Mono fonts from Google Fonts
import "./globals.css"; // Import global CSS styles

const geistSans = Geist({ // Define the Geist Sans font
  variable: "--font-geist-sans", // Set the CSS variable for the font
  subsets: ["latin"], // Specify the subsets to include
});

const geistMono = Geist_Mono({ // Define the Geist Mono font
  variable: "--font-geist-mono", // Set the CSS variable for the font
  subsets: ["latin"], // Specify the subsets to include
});

export const metadata = { // Define metadata for the application
  title: 'دقائق - فحص سيارات',
  description: 'نفحص سيارتك بكل عناية ودقة',
  keywords: 'دقائق - دقه في دقائق ,فحص سيارات, صيانة سيارات, دقائق',
  metadatabase: {
    viewport: 'width=device-width, initial-scale=1',
    robots: 'index, follow',
    title: {
      template: '%s | دقائق',
      default: 'دقائق - خدمات فحص السيارات',
    },
    description: 'خدمات فحص السيارات في المملكة العربية السعودية',
    openGraph: {
      type: 'website',
      locale: 'ar_SA',
      url: 'https://yourdomain.com',
      siteName: 'دقائق',
    }
  }
};

export default function RootLayout({ children }) { // Define the RootLayout functional component
  return (
    <html lang="ar">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Apply the font variables and antialiasing to the body */}
        {children} {/* Render the children components */}
      </body>
    </html>
  );
}