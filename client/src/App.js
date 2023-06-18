import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Addnew from './components/Addnew';
import Home from './components/Home';
import MyNavbar from './components/MyNavbar';
import ViewOne from './components/ViewOne';
import Update from './components/Edit';
function App() {

  return (
    <BrowserRouter>
    <MyNavbar/>
    <Routes>
        <Route path ='/' element={<Home />} />
        <Route path="/Addnew" element={<Addnew/>} />
        <Route path="/getuser/:searchItem" element={<ViewOne/>} />
        <Route path="/Edit/:id" element={<Update/>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
