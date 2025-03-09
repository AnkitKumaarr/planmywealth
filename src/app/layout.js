import { Inter, Poppins } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import { AppProvider } from "@/context/AppContext";
import "./globals.css";
import { FormProvider } from "../context/FormContext";
import { AuthProvider } from "@/context/AuthContext";
import Script from "next/script";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Plan your wealth",
  description: "Plan your wealth",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <head>
        <Script
          id="ACXConnectScript"
          src="https://app.sendmails.io/websites/67cd8d1a0c29b/connect.js"
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <ThemeProvider>
          <AppProvider>
            <FormProvider>
              <AuthProvider>{children}</AuthProvider>
            </FormProvider>
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
