import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html>
      <head>
        <title>Walk to X</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
