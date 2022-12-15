import logo from './logo.svg';
import { Routes, Route } from "react-router-dom";
import './App.css';
import Main from './pages/Main';
import Detail from './pages/Detail';
import NotFound from './pages/NotFound';
import Search from './pages/Search';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/:bookId" element={<Detail />}/>
        <Route path="/search" element={<Search />}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </div>
  );
}

export default App;
