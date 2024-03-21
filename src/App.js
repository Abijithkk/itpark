
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import Home from './Pages/Home';


function App() {
  return (
    <div className="App">
      <Routes>
     <Route path="/Home" element={<Home></Home>} ></Route>
      <Route path="/" element={<Login></Login>} ></Route>
      <Route path="/signup" element={<Signup></Signup>} ></Route>
      </Routes>
      
    </div>
    
  );
}

export default App;
