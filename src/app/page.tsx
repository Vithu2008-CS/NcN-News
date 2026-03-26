import NewsCard from "@/components/NewsCard";
import AdSlot from "@/components/ads/AdSlot";

export default function Home() {
  // Sample data for demonstration
  const featuredArticle = {
    id: "1",
    title: "AI Breakthough: New Model Outperforms Human Experts in Financial Analysis",
    summary: "A revolutionary large language model has demonstrated unprecedented accuracy in predicting market trends, potentially reshaping the future of algorithmic trading and investment strategy.",
    slug: "ai-breakthrough-financial-analysis",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1080",
    category: "AI & Tech",
    publishedAt: "2 hours ago",
    source: "NcN AI Insights"
  };

  const recentArticles = [
    {
      id: "2",
      title: "Global Supply Chains See Unexpected Stabilization in Q1",
      summary: "Recent data suggests that major shipping routes and manufacturing hubs are returning to pre-pandemic efficiency levels sooner than expected.",
      slug: "global-supplychains-stabilization",
      imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=500",
      category: "Business",
      publishedAt: "4 hours ago",
      source: "Reuters Summary"
    },
    {
      id: "3",
      title: "Sustainable Energy: Solar Efficiency Peaks with New Cell Design",
      summary: "Researchers have unveiled a tandem solar cell that reaches 30% efficiency, marking a significant milestone for renewable energy technology.",
      slug: "solar-efficiency-cell-design",
      imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=500",
      category: "Energy",
      publishedAt: "6 hours ago",
      source: "Al Jazeera Recap"
    },
    {
      id: "4",
      title: "Upcoming Tech Regulation: What It Means for Major Platforms",
      summary: "New antitrust legislation proposed in the EU could fundamentally change how tech giants operate their digital marketplaces and handle user data.",
      slug: "tech-regulation-major-platforms",
      imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=500",
      category: "Policy",
      publishedAt: "Yesterday",
      source: "BBC News AI Summary"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Breaking News Ticker */}
      <div className="mb-8 flex items-center gap-3 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 p-2 rounded-lg">
        <span className="bg-red-600 text-white text-[10px] font-black uppercase px-2 py-1 rounded animate-pulse">Breaking</span>
        <div className="overflow-hidden whitespace-nowrap text-sm font-medium text-red-900 dark:text-red-400">
          <p className="animate-marquee inline-block">
            Global markets react to new AI regulation proposals • Central banks signal potential interest rate shifts • Tech giants announce major Q1 earnings results • Future of work discussed at World Economic Forum
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Feed */}
        <div className="lg:col-span-8 space-y-12">
          {/* Featured Large Article */}
          <section>
            <div className="group relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 transition-all hover:shadow-2xl hover:shadow-indigo-500/10 active:scale-[0.99]">
              <div className="relative aspect-[21/9] w-full">
                <img 
                  src={featuredArticle.imageUrl} 
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent"></div>
              </div>
              
              <div className="absolute bottom-0 left-0 p-6 md:p-10 max-w-2xl">
                <span className="badge badge-accent mb-4 inline-block">{featuredArticle.category}</span>
                <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4 leading-tight">
                  <a href={`/article/${featuredArticle.slug}`} className="hover:underline underline-offset-4 decoration-2">
                    {featuredArticle.title}
                  </a>
                </h1>
                <p className="text-slate-300 text-sm md:text-base line-clamp-2 mb-6">
                  {featuredArticle.summary}
                </p>
                <div className="flex items-center gap-4">
                   <div className="text-[10px] text-slate-400 uppercase tracking-widest">{featuredArticle.source} • {featuredArticle.publishedAt}</div>
                </div>
              </div>
            </div>
          </section>

          {/* Ad Slot: Inside Feed */}
          <AdSlot slotId="feed-mid-1" />

          {/* News Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recentArticles.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </section>
          
          <button className="w-full py-4 border-2 border-slate-200 dark:border-slate-800 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 transition-colors uppercase text-xs tracking-widest">
            Load More Stories
          </button>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-10">
          {/* Trending Section */}
          <div className="glass p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-serif font-bold mb-6 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              Trending Now
            </h2>
            <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex gap-4 group cursor-pointer">
                  <span className="text-4xl font-black text-slate-100 dark:text-slate-800/50 group-hover:text-indigo-500/20 transition-colors">{i}</span>
                  <div>
                    <h4 className="font-bold text-sm leading-snug group-hover:text-indigo-600 transition-colors">
                       Market rally continues as inflation data exceeds expectations...
                    </h4>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider">Business • 3h ago</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Ad 300x250 */}
          <AdSlot slotId="sidebar-box-1" format="rectangle" />

          {/* Newsletter / Recs */}
          <div className="bg-slate-950 rounded-3xl p-8 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-indigo-500/20 blur-3xl rounded-full"></div>
             <h3 className="text-xl font-serif font-bold mb-4">NcN Daily Digest</h3>
             <p className="text-slate-400 text-sm mb-6">Get the top 5 AI-powered news summaries delivered to your inbox every morning.</p>
             <div className="flex gap-2">
               <input type="email" placeholder="Email address" className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-500" />
               <button className="bg-white text-slate-950 px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-200 transition-colors">Join</button>
             </div>
          </div>

          <AdSlot slotId="sidebar-sticky" className="sticky top-20" format="rectangle" label="Don't Miss" />
        </aside>
      </div>
    </div>
  );
}
