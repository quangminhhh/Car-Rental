import './App.css';
import {Route, BrowserRouter, Routes, Navigate} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookingCar from "./pages/BookingCar";


function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/bookingcar/:carid" element={<ProtectedRoutes><BookingCar /></ProtectedRoutes>} />
            </Routes>
        </BrowserRouter>

    </div>
  );
}

function ProtectedRoutes({ children }) {
    if (localStorage.getItem('user')) {
        return children;
    } else {
        return <Navigate to="/login" replace={true} />; // Sử dụng Navigate và replace
    }
}

export default App;

