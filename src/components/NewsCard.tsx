import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface NewsCardProps {
  article: {
    id: string;
    title: string;
    summary: string;
    slug: string;
    imageUrl?: string;
    category: string;
    publishedAt: string;
    source: string;
  };
  compact?: boolean;
}

const NewsCard = ({ article, compact = false }: NewsCardProps) => {
  return (
    <article className={`premium-card h-full flex flex-col ${compact ? 'md:flex-row gap-4' : ''}`}>
      <div className={`relative ${compact ? 'w-full md:w-32 h-40 md:h-auto' : 'w-full aspect-video'}`}>
        {article.imageUrl ? (
          <Image 
            src={article.imageUrl} 
            alt={article.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-400 italic">
            No Image
          </div>
        )}
        <div className="absolute top-2 left-2 flex gap-1">
          <span className="badge badge-blue">{article.category}</span>
        </div>
      </div>
      
      <div className={`p-5 flex flex-col flex-grow ${compact ? 'justify-center' : ''}`}>
        <div className="flex items-center gap-2 text-[10px] text-slate-400 uppercase tracking-wider mb-2">
          <span>{article.source}</span>
          <span>•</span>
          <span>{article.publishedAt}</span>
        </div>
        
        <h3 className={`font-serif font-bold text-slate-900 dark:text-slate-100 leading-tight hover:text-blue-600 transition-colors ${compact ? 'text-lg mb-1' : 'text-xl mb-3'}`}>
          <Link href={`/article/${article.slug}`}>
            {article.title}
          </Link>
        </h3>
        
        {!compact && (
          <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-3 mb-4">
            {article.summary}
          </p>
        )}
        
        <div className="mt-auto pt-2 flex items-center justify-between">
          <Link href={`/article/${article.slug}`} className="text-xs font-bold text-blue-600 hover:text-blue-700 uppercase tracking-tighter flex items-center gap-1">
            Read AI Summary 
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </Link>
          <div className="flex gap-2 opacity-50">
             <span className="text-[10px]">#SEO</span>
             <span className="text-[10px]">#TRENDING</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
