import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Page1 from './Components/Page1';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Page1 />} />
      </Routes>
    </Router>
  );
}

export default App;
