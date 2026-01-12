import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import Login from "../pages/Login";
import Register from "../pages/Register";

export default function AppRouter() {
    const { isAuth } = useAuthStore();

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/registr" element={<Register />} />
            <Route path="/" element={isAuth ? <h1>Welcomeeeeeeeeeeee!</h1> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
}