import { Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import Projects from './components/Projects';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/products" element={<h1>Hi</h1>} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </>
  );
}

export default App;
