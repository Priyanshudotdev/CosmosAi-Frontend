import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Builder } from './pages/Builder';
import { Home } from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/builder" element={<Builder />} />
      </Routes>
    </Router>
  );
}

export default App;