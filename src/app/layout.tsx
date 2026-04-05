import { ClerkProvider } from '@clerk/nextjs'
import { arSA } from '@clerk/localizations'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider localization={arSA}>
      <html lang="ar" dir="rtl">
        <body className="antialiased">{children}</body>
      </html>
    </ClerkProvider>
  )
}
