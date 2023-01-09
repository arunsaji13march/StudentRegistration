import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/admin/login';
import Admin from './pages/admin/admin';
import StudentRegistration from './pages/studentRegister';
import NotFound from './pages/notFound';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import IdCard from './idCard/idCard';


function App() {
  return (

    <div className="App">
      <ToastContainer/>
r
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/dashboard' element={<Admin />} />
        <Route path='/login' element={<Login />} />
        <Route path='/student' element={<StudentRegistration />} />
        <Route path='/idcard/:studentId' element={<IdCard />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
