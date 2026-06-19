import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import AdminPanel from './components/AdminPanel';
import Home from './pages/Home';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/admin" 
            element={
              <AdminPanel 
                onConfigChange={() => {}} 
                onPlanosChange={() => {}} 
              />
            } 
          />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
