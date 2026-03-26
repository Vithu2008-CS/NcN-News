import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AdSlot from "@/components/ads/AdSlot";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

// Logic to inject ads into content
const renderContentWithAds = (content: string) => {
  const paragraphs = content.split('\n\n');
  if (paragraphs.length < 3) return <p className="mb-6 leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: content }} />;

  return (
    <>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        {paragraphs.slice(0, 1).map((p, i) => (
          <p key={i} className="mb-6 leading-relaxed text-lg font-medium text-slate-800 dark:text-slate-200">{p}</p>
        ))}
        
        <AdSlot slotId="article-top" format="rectangle" label="In-Article Top" />

        {paragraphs.slice(1, Math.floor(paragraphs.length / 2)).map((p, i) => (
          <p key={i} className="mb-6 leading-relaxed text-slate-600 dark:text-slate-400">{p}</p>
        ))}

        <AdSlot slotId="article-middle" format="rectangle" label="Don't Miss" />

        {paragraphs.slice(Math.floor(paragraphs.length / 2)).map((p, i) => (
          <p key={i} className="mb-6 leading-relaxed text-slate-600 dark:text-slate-400">{p}</p>
        ))}
      </div>
    </>
  );
};

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  console.log('Viewing article:', slug);
  // Demo data - in production this would fetch from DB
  const article = {
    title: "The Future of AI: How LLMs are Redefining Professional Expertise",
    publishedAt: "March 26, 2024",
    source: "NcN AI Desk",
    category: "AI Technology",
    summary: "As Large Language Models continue to evolve, they are moving beyond simple text generation to complex reasoning, fundamentally shifts how we define and utilize professional knowledge across industries.",
    keyPoints: [
      "AI models are achieving superior benchmarks in legal and financial reasoning.",
      "Human-AI collaboration is becoming the new standard for professional efficiency.",
      "Ethical frameworks must evolve to handle autonomous AI decision-making.",
      "Skill sets in the workforce are shifting toward 'AI Orchestration'."
    ],
    content: `The landscape of professional expertise is undergoing its most significant transformation since the industrial revolution. With the advent of more sophisticated Large Language Models (LLMs), the boundary between human intuition and machine calculation is blurring. No longer are these systems mere tools for automation; they are becoming partners in complex problem-solving.\n\nFrom medical diagnostics to architectural design, LLMs are being integrated into the core workflows of professionals. This integration is not just about speed; it's about the quality of insights. By processing vast datasets in seconds, AI can highlight patterns that even the most experienced human experts might overlook. This synergy allows for a more nuanced approach to decision-making that combines human empathy with machine accuracy.\n\nHowever, this shift also brings substantial challenges. The question of accountability in AI-assisted decisions remains a critical legal and ethical frontier. Professionals must now develop a new kind of literacy—learning how to prompt, verify, and govern the outputs of AI systems. This transition to an 'Augmented Workforce' requires a fundamental rethinking of educational structures and corporate training programs.\n\nAs we look toward the next decade, the measure of professional success will likely be determined by how effectively one can leverage AI to solve increasingly complex global problems. The age of the 'Solo Expert' is giving way to the era of 'AI-Enhanced Collaboration', promising a future where expertise is more accessible and powerful than ever before.`,
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1080"
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span>/</span>
        <span className="text-blue-600">{article.category}</span>
      </nav>

      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-slate-950 dark:text-white leading-[1.1] mb-6">
          {article.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 border-y border-slate-100 dark:border-slate-800/50 py-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-[10px]">NcN</div>
            <span className="font-semibold text-slate-900 dark:text-slate-200">{article.source}</span>
          </div>
          <span>•</span>
          <time>{article.publishedAt}</time>
          <div className="ml-auto flex items-center gap-4">
            <button className="hover:text-blue-600 transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/></svg>
            </button>
            <button className="hover:text-blue-600 transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            </button>
          </div>
        </div>
      </header>

      <div className="relative aspect-[21/9] rounded-3xl overflow-hidden mb-12 shadow-2xl">
         <Image 
           src={article.imageUrl} 
           alt={article.title} 
           fill 
           priority
           className="object-cover" 
         />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
           {/* AI Summary Block */}
           <div className="bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-600 p-8 rounded-2xl mb-12">
              <h3 className="font-bold text-blue-700 dark:text-blue-400 mb-4 uppercase tracking-tighter text-sm flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                AI Quick Summary
              </h3>
              <p className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed italic">
                &quot;{article.summary}&quot;
              </p>
           </div>

           {/* Key Points */}
           <div className="mb-12">
             <h4 className="font-serif font-black text-2xl mb-6">Key Takeaways</h4>
             <ul className="space-y-4">
               {article.keyPoints.map((point, index) => (
                 <li key={index} className="flex gap-4 items-start">
                    <div className="mt-1.5 w-5 h-5 min-w-[20px] rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                       <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{point}</span>
                 </li>
               ))}
             </ul>
           </div>

           <hr className="my-12 border-slate-100 dark:border-slate-800" />

           {/* Main Content with Ads */}
           <div className="content-area">
             {renderContentWithAds(article.content)}
           </div>

           {/* Sticky Box Ad near end */}
           <AdSlot slotId="article-bottom-sticky" label="Continue Reading" />
           
           <div className="mt-16 flex items-center justify-center gap-4 flex-wrap">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Share this story:</span>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-full text-xs font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all">Twitter</button>
              <button className="px-6 py-2 bg-indigo-700 text-white rounded-full text-xs font-bold hover:bg-indigo-800 shadow-lg shadow-indigo-500/20 transition-all">Facebook</button>
              <button className="px-6 py-2 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-full text-xs font-bold hover:opacity-90 shadow-lg shadow-slate-500/20 transition-all">LinkedIn</button>
           </div>
        </div>

        {/* Article Sidebar */}
        <aside className="lg:col-span-4 space-y-12">
           <AdSlot slotId="article-side-1" format="rectangle" />
           
           <div className="glass p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
              <h4 className="font-serif font-black text-lg mb-6">Related Stories</h4>
              <div className="space-y-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="group cursor-pointer">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3">
                       <Image 
                         src={`https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=300&i=${i}`} 
                         alt="Related story"
                         fill
                         className="object-cover group-hover:scale-110 transition-transform duration-500" 
                       />
                    </div>
                    <h5 className="font-bold text-sm leading-snug group-hover:text-blue-600 transition-colors">
                      How decentralized finance is disrupting traditional banking models in late 2024.
                    </h5>
                  </div>
                ))}
              </div>
           </div>

           <AdSlot slotId="article-sidebar-sticky" className="sticky top-24" format="rectangle" />
        </aside>
      </div>
    </div>
  );
}
