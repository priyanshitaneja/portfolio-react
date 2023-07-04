import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import SkillsList from './components/SkillsList';
import SpinnerLoader from "./components/SpinnerLoader";

import "./index.css";
import "./components/Header/index.scss";

const Homepage = lazy(() => import('./pages/Homepage'));
const Projects = lazy(() => import('./pages/Projects'));
const Work = lazy(() => import('./pages/Work'));
const Contact = lazy(() => import('./pages/Contact'));

function App() {
  return (
    <>
      <Header />
      <Routes className="routes">
        <Route path="/" exact element={<Suspense fallback={<SpinnerLoader />}><Homepage /></Suspense>} />
        <Route path="/products" element={<h1>Hi</h1>} />
        <Route path="/about" element={<Suspense fallback={<SpinnerLoader />}><Homepage /></Suspense>} />
        <Route path="/work" element={<Suspense fallback={<SpinnerLoader />}><Work /></Suspense>} />
        <Route path="/projects" element={<Suspense fallback={<SpinnerLoader />}><Projects /></Suspense>} />
        <Route path="/contact" element={<Suspense fallback={<SpinnerLoader />}><Contact /></Suspense>} />
      </Routes>
      <SkillsList />
    </>
  );
}

export default App;
