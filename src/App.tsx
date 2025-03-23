import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// CSS Imports
import './App.css'
import './assets/css/animation.css'

// Components
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import NotFoundPage from './components/Layout/NotFoundPage';

// Load it lazy
const LandingPage = lazy(() => import("./components/Layout/LandingPage"));

function App() {

  return (
    <Suspense fallback={<LoadingScreen />} >
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='*' element={<NotFoundPage />} /> {/* This catches all unmatched routes */}
    </Routes>
    </Suspense>
  )
}

export default App;
