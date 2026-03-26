import React from 'react';

interface NewsSchemaProps {
  article: {
    title: string;
    description: string;
    image?: string;
    datePublished: string;
    dateModified: string;
    author: string;
    publisher: string;
    url: string;
  };
}

const NewsSchema = ({ article }: NewsSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.title,
    "image": article.image ? [article.image] : [],
    "datePublished": article.datePublished,
    "dateModified": article.dateModified,
    "author": [{
      "@type": "Person",
      "name": article.author,
      "url": "https://ncn-news.com/author/ai-editor"
    }],
    "publisher": {
      "@type": "Organization",
      "name": "NcN Global",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ncn-news.com/logo.png"
      }
    },
    "description": article.description,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": article.url
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default NewsSchema;
