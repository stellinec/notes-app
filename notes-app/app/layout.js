
import { ChakraProvider } from "@chakra-ui/react";
import './globals.css';
export default function RootLayout({ children }) {
  return (
    <html lang="en">
    
      <ChakraProvider>
      <body style={{ fontFamily: 'Montserrat, sans-serif' }} >{children}</body>
      </ChakraProvider>
    </html>
  );
}
