import { Routes, Route } from 'react-router-dom';

import Homepage from './pages/Homepage';
import Projects from './pages/Projects';
import Work from './pages/Work';

import RealTimeClock from './pages/Projects/RealTimeClock';
import Header from './components/Header';
import SkillsList from './components/SkillsList';

import "./index.css";
import "./components/Header/index.scss";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/products" element={<h1>Hi</h1>} />
        <Route path="/about" element={<Homepage />} />
        <Route path="/work" element={<Work />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/realTimeClock" element={<RealTimeClock />} />
      </Routes>
      <SkillsList />
    </>
  );
}

export default App;
