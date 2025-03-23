import Layout from './Layout';

// Components - Others
import SEO from '../seo/SEO';

// Images
import sapis_meta from '/images/meta/sapis_meta_image.jpg';
import NotFound from '../NotFound/NotFound';

function LandingPage() {

  return (
    <>
      <SEO
        title='Sapis | Super Alpha Petroleum Infrastructure Services'
        description='SAPIS: KOC-approved supplier of oil & gas infrastructure services. We provide spare parts, equipment rental, transportation, and skilled manpower for drilling operations. Quality infrastructure solutions for the petroleum industry.'
        ogImage={sapis_meta}
        twitterImage={sapis_meta}
      />
      <Layout>
        <NotFound />
      </Layout>
    </>
  )
}

export default LandingPage;
