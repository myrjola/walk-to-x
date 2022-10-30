import {ReactNode} from 'react'
export { reportWebVitals } from 'next-axiom';

interface Props {
    children: ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html>
      <head>
         <title>Walk to X</title>
      </head>
      <body>{children}</body>
    </html>
  )
}
