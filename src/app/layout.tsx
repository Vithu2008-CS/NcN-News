import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "NcN | Automated AI Newsroom",
  description: "Worldwide breaking news, AI-summarized for maximum clarity.",
  keywords: ["news", "AI", "breaking news", "tech", "finance", "summaries"],
  openGraph: {
    title: "NcN | Automated AI Newsroom",
    description: "Worldwide breaking news, AI-summarized for maximum clarity.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100`}>
        <div className="min-h-screen flex flex-col">
          {/* Ad Slot: Top Banner */}
          <div className="w-full bg-slate-50 dark:bg-slate-900 py-2 border-b border-slate-200 dark:border-slate-800 flex justify-center items-center overflow-hidden">
             <div className="w-[728px] h-[90px] bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-xs text-slate-400">
               AdSense Top Banner (728x90)
             </div>
          </div>
          
          <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">NcN</span>
                <span className="hidden sm:inline-block text-sm font-medium text-slate-500">Global AI News</span>
              </div>
              
              <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
                <a href="/" className="hover:text-blue-600 transition-colors">Home</a>
                <a href="/tech" className="hover:text-blue-600 transition-colors">Technology</a>
                <a href="/finance" className="hover:text-blue-600 transition-colors">Finance</a>
                <a href="/business" className="hover:text-blue-600 transition-colors">Business</a>
                <a href="/ai" className="hover:text-blue-600 transition-colors text-indigo-500 font-semibold underline decoration-2 underline-offset-4">AI Focus</a>
              </div>

              <div className="flex items-center gap-4">
                <button className="p-2 text-slate-500 hover:text-slate-900 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                </button>
                <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 hidden sm:block"></div>
                <button className="hidden sm:block text-sm font-semibold px-4 py-2 bg-slate-900 text-white dark:bg-white dark:text-slate-950 rounded-full hover:opacity-90 transition-opacity">
                  Sign In
                </button>
              </div>
            </nav>
          </header>

          <main className="flex-grow">
            {children}
          </main>

          <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-12 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="col-span-1 md:col-span-2 space-y-4">
                <div className="text-2xl font-bold">NcN</div>
                <p className="text-slate-500 text-sm max-w-sm">
                  Leveraging advanced AI to deliver factual, concise, and summarized news from trusted sources worldwide. Stay informed without the fluff.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Categories</h4>
                <ul className="space-y-2 text-sm text-slate-500">
                  <li><a href="#" className="hover:text-blue-600">Technology</a></li>
                  <li><a href="#" className="hover:text-blue-600">Finance</a></li>
                  <li><a href="#" className="hover:text-blue-600">Health</a></li>
                  <li><a href="#" className="hover:text-blue-600">AI Trends</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-sm text-slate-500">
                  <li><a href="#" className="hover:text-blue-600">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-blue-600">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-blue-600">Cookie Policy</a></li>
                  <li><a href="#" className="hover:text-blue-600">Ad Disclosure</a></li>
                </ul>
              </div>
            </div>
          </footer>

          {/* Ad Slot: Sticky Bottom Mobile */}
          <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-slate-900/95 backdrop-blur-sm border-t border-slate-800 py-1 flex justify-center">
             <div className="w-[320px] h-[50px] bg-slate-800 flex items-center justify-center text-[10px] text-slate-400">
               AdSense Sticky Bottom (320x50)
             </div>
          </div>
        </div>
      </body>
    </html>
  );
}
