import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import TabComponent from '../../components/TabComponent/TabComponent';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/colombia_dash" />} />
          <Route path="/colombia_dash" element={<TabComponent />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
