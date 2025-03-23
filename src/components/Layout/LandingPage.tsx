import Layout from './Layout';

// Components - Sections
import Home from '../Sections/Home'
import AboutUs from '../Sections/AboutUs';
import OurPurpose from '../Sections/OurPurpose';
import Services from '../Sections/Services';
import Contact from '../Sections/Contact';

function LandingPage() {

  return (
    <>
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
