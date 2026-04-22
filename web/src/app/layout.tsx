import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { AuthSessionProvider } from "@/components/providers/auth-session-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getSiteMetadataBase } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Almeida Mares — Gestão profissional de imóveis por temporada",
    template: "%s · Almeida Mares",
  },
  description:
    "Plataforma integrada de gestão de aluguéis por temporada. Calendário unificado, relatórios financeiros automáticos e portal transparente para proprietários.",
  metadataBase: getSiteMetadataBase(),
  openGraph: {
    title: "Almeida Mares",
    description:
      "Gestão profissional de imóveis por temporada — Airbnb, Booking e canais diretos em um só lugar.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <a
          href="#conteudo-principal"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Pular para o conteúdo
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthSessionProvider>
            <TooltipProvider delay={200}>
              {children}
              <Toaster position="top-right" richColors />
            </TooltipProvider>
          </AuthSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
