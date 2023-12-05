import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import {Layout} from 'antd';
import Header from './components/Header';
import Home from './components/pages/Home';
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import {ProtectedRoute} from "./router/ProtectedRoute";
import CabinetDashboard from "./components/pages/CabinetDashboard";
import {isAuthenticated} from "./router/helpers";
import AdminDashboard from "./components/pages/AdminDashboard";
import CabinetProfile from "./components/pages/CabinetProfile";
import AdminUserCreate from "./components/pages/AdminUserCreate";
import AdminUserShow from "./components/pages/AdminUserShow";
import AdminUserUpdate from "./components/pages/AdminUserUpdate";

const {Content, Footer} = Layout;
export type User = {
    login: string;
    email: string;
    created_at: null | string;
    updated_at: string;
    first_name: string;
    second_name: null | string;
    last_name: string;
    date_of_birth: null | string;
    profession_id: number;
    photo_url: null | string;
    last_login_date: string;
    last_personal_data_edit_date: null | string;
    role: "admin" | "user";
};
// @ts-ignore
const Logout = ({handleLogout}) => {
    return handleLogout();
};
const App: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [auth, setAuth] = useState<string | null>(null);
    const handleLogin = (token: string, user: User) => {
        setAuth(token);
        setUser(user);
    }
    const handleLogout = () => {
        setUser(null);
        setAuth(null);
        localStorage.clear();
        return <Navigate to="/" replace/>;
    };

    useEffect(() => {
        setAuth(localStorage.getItem('authToken'));
        const userData = localStorage.getItem('userData');
        if (userData) {
            setUser(JSON.parse(userData))
        }
    }, []);
    return (
        <Router>
            <Layout>
                <Header/>
                <Content style={{padding: '50px'}}>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/login" element={<Login handleLogin={handleLogin}/>}/>
                        <Route path="/logout" element={<Logout handleLogout={handleLogout}/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/cabinet" element={
                            <ProtectedRoute isAllowed={isAuthenticated() && user?.role === 'user'}>
                                <CabinetDashboard/>
                            </ProtectedRoute>}/>
                        <Route path="/cabinet/profile" element={
                            <ProtectedRoute isAllowed={isAuthenticated() && user?.role === 'user'}>
                                <CabinetProfile/>
                            </ProtectedRoute>}/>
                        <Route path="/admin" element={
                            <ProtectedRoute isAllowed={isAuthenticated() && user?.role === 'admin'}>
                                <AdminDashboard/>
                            </ProtectedRoute>}/>
                        <Route path="/admin/users/create" element={
                            <ProtectedRoute isAllowed={isAuthenticated() && user?.role === 'admin'}>
                                <AdminUserCreate/>
                            </ProtectedRoute>}/>
                        <Route path="/admin/users/:id" element={
                            <ProtectedRoute isAllowed={isAuthenticated() && user?.role === 'admin'}>
                                <AdminUserShow/>
                            </ProtectedRoute>}/>
                        <Route path="/admin/users/:id/edit" element={
                            <ProtectedRoute isAllowed={isAuthenticated() && user?.role === 'admin'}>
                                <AdminUserUpdate/>
                            </ProtectedRoute>}/>
                    </Routes>
                </Content>
                <Footer style={{textAlign: 'center'}}>© 2023 Test App</Footer>
            </Layout>
        </Router>
    );
};

export default App;
