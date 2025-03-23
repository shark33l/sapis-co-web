import { Helmet } from 'react-helmet';

interface SEOProps {
  title: string;
  description: string;
  ogImage?: string;
  twitterImage?: string;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  ogImage, 
  twitterImage 
}) => {
  // Since this is a single page app, the only URL is the home or /
  const canonical = "https://sapis.co/";
  
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      
      {/* OpenGraph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {twitterImage && <meta name="twitter:image" content={twitterImage} />}
    </Helmet>
  );
};

export default SEO;