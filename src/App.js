import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Projects from './pages/Projects';
import RealTimeClock from './pages/Projects/RealTimeClock';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/products" element={<h1>Hi</h1>} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/realTimeClock" element={<RealTimeClock />} />
      </Routes>
    </>
  );
}

export default App;
