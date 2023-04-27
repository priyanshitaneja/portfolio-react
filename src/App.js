import { Routes, Route } from 'react-router-dom';
import "./App.css";
import { ComingSoon } from "./components/ComingSoon";
import Projects from './components/Projects';

function App() {
  return (
    // <div className="App">
      
    // </div>
    <>
      <Routes>
        <Route path="/" element={<ComingSoon />} />
        <Route path="/products" element={<h1>Hi</h1>} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </>
  );
}

export default App;
