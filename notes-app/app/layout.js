
import { ChakraProvider } from "@chakra-ui/react";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ChakraProvider>
      <body >{children}</body>
      </ChakraProvider>
    </html>
  );
}
