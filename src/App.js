import { lazy, Suspense, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import SkillsList from './components/SkillsList';
import ThemeModal from './components/ThemeModal';
// SpinnerLoader removed — MainLoader handles the initial wait
import MainLoader from "./components/MainLoader";

import "./index.css";
import "./components/Header/index.scss";

const Homepage = lazy(() => import('./pages/Homepage'));
const Projects = lazy(() => import('./pages/Projects'));
const Work = lazy(() => import('./pages/Work'));
const Contact = lazy(() => import('./pages/Contact'));
const Error = lazy(() => import('./pages/Error404'));

function App() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <MainLoader onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="app-content-enter">
      <ThemeModal />
      <Header />
      <Routes className="routes">
        <Route path="/" exact element={<Suspense fallback={null}><Homepage /></Suspense>} />
        <Route path="/products" element={<h1>Hi</h1>} />
        <Route path="/about" element={<Suspense fallback={null}><Homepage /></Suspense>} />
        <Route path="/work" element={<Suspense fallback={null}><Work /></Suspense>} />
        <Route path="/projects" element={<Suspense fallback={null}><Projects /></Suspense>} />
        <Route path="/contact" element={<Suspense fallback={null}><Contact /></Suspense>} />
        <Route path="*" element={<Suspense fallback={null}><Error /></Suspense>} />
      </Routes>
      <SkillsList />
    </div>
  );
}

export default App;
