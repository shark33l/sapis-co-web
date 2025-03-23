import Layout from './Layout';

// Components - Others
import SEO from '../seo/SEO';

// Components - Sections
import Home from '../Sections/Home'
import AboutUs from '../Sections/AboutUs';
import OurPurpose from '../Sections/OurPurpose';
import Services from '../Sections/Services';
import Contact from '../Sections/Contact';

// Images
import sapis_meta from '/images/meta/sapis_meta_image.jpg';

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
        <Home />
        <AboutUs />
        <Services />
        <OurPurpose />
        <Contact />
      </Layout>
    </>
  )
}

export default LandingPage;
