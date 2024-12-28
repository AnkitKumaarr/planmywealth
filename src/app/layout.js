import { ThemeProvider } from '@/context/ThemeContext';
import { AppProvider } from '@/context/AppContext';
import './globals.css';
import { FormProvider } from '../context/FormContext';

export const metadata = {
  title: 'Your App',
  description: 'Your app description',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <AppProvider>
            <FormProvider>
              {children}
            </FormProvider>
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
