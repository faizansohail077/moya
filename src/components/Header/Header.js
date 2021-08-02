import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import './Header.css'
import { logo } from '../../assests/images'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../store/actions'
const Header = ({ authed }) => {

    const history = useHistory()
    const dispatch = useDispatch()
    const action = bindActionCreators(actions, dispatch)

    const logout = () => {
        action.logout()
    }


    return (
        <Navbar collapseOnSelect expand="lg" className="nav-bg" variant="dark">
            <Navbar.Brand onClick={() => history.push('/')}>
                <img
                    src={logo}
                    width="40%"
                    height="40%"
                    className="d-inline-block align-top"
                    alt="Logo"
                />
            </Navbar.Brand>
            {authed ? <>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="links ml-auto d-xl-none d-lg-none">
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/customers">Customer</Link>
                        <Link to="/profile">Profile</Link>
                        <Link to="" onClick={logout}>Logout</Link>
                    </Nav>
                    <Nav className="ml-auto">
                        <Nav.Link className="nav-link">v 0.1 Beta</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </>
                : <Nav className="ml-auto">
                    <Nav.Link className="nav-link">v 0.1 Beta</Nav.Link>
                </Nav>}
        </Navbar>
    )
}

export default Header
