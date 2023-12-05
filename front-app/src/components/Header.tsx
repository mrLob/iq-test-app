import React from 'react';
import {Link} from 'react-router-dom';
import {Layout, Menu} from 'antd';
import {getRole, isAuthenticated} from "../router/helpers";

const {Header: AntHeader} = Layout;

const Header: React.FC = () => {

    const PublicMenu = <>
        <Menu.Item key="register">
            <Link to="/register">Sign up</Link>
        </Menu.Item>
        <Menu.Item key="login">
            <Link to="/login">Sign in</Link>
        </Menu.Item>
    </>

    const AdminMenu =
        <>
            <Menu.Item key="admin">
                <Link to="/admin">Dashboard</Link>
            </Menu.Item>
        </>;
    const UserMenu =
        <>
            <Menu.Item key="cabinet">
                <Link to="/cabinet">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="cabinet/profile">
                <Link to="/cabinet/profile">Profile</Link>
            </Menu.Item>
        </>
    return (
        <AntHeader>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['home']}>
                {(!isAuthenticated() && PublicMenu) || (getRole() === 'user' && UserMenu) || AdminMenu}
                {isAuthenticated() &&
                  <Menu.Item key="logout">
                    <Link to="/logout">Sign Out</Link>
                  </Menu.Item>}
            </Menu>
        </AntHeader>
    );
};

export default Header;
