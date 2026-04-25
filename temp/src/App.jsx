import { Toaster } from 'sonner';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
function App() {

  return (
    <><Toaster richColors position='top-right' />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter></>

  );

}

export default App
