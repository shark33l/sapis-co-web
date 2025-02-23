import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// CSS Imports
import './App.css'
import './assets/css/animation.css'

// Components
import LoadingScreen from './components/LoadingScreen/LoadingScreen';

// Load it lazy
const ComingSoon = lazy(() => import("./components/comingSoon/ComingSoon"));
const LandingPage = lazy(() => import("./components/Layout/LandingPage"));

function App() {

  return (
    <Suspense fallback={<LoadingScreen />} >
    <Routes>
      <Route path='/' element={<ComingSoon />} />
      <Route path='/demo' element={<LandingPage />} />
    </Routes>
    </Suspense>
  )
}

export default App;
