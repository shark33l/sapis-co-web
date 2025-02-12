import './App.css'
import './assets/css/animation.css'
// import ComingSoon from './components/comingSoon/ComingSoon'
import Layout from './components/Layout/Layout';
import AboutUs from './components/Sections/AboutUs';

// Components - Sections
import Home from './components/Sections/Home'
import Services from './components/Sections/Services';

function App() {

  return (
    <>
      <Layout>
        <Home />
        <AboutUs />
        <Services />
      </Layout>
    </>
  )
}

export default App
