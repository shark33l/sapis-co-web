import './App.css'
import './assets/css/animation.css'
// import ComingSoon from './components/comingSoon/ComingSoon'
import Layout from './components/Layout/Layout';

// Components - Sections
import Home from './components/Sections/Home'
import AboutUs from './components/Sections/AboutUs';
import OurPurpose from './components/Sections/OurPurpose';
import Services from './components/Sections/Services';
import Contact from './components/Sections/Contact';

function App() {

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

export default App
