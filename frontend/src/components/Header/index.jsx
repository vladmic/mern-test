import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavItem, NavLink } from "reactstrap";
import {logoutUserRequest} from "../../redux/actions";

const Header = ({ isAuthenticated }) => {
  const dispatch = useDispatch();
  // const isAuthenticated = useSelector((state) => state?.auth?.isAuthenticated ?? false);

  const logOut = () => dispatch(logoutUserRequest());

  console.log('Header -->', isAuthenticated);
  return (
    <Navbar color="dark" dark expand="md">
      <Nav className="mr-auto" navbar>
        <NavItem>
          <Link to="/todos">
            <NavLink>
              Todos
            </NavLink>
          </Link>
        </NavItem>
      </Nav>
      <Nav navbar>
        {isAuthenticated ? (
          <NavItem onClick={logOut}>
            <NavLink>
              Logout
            </NavLink>
          </NavItem>
        ) : (
          <>
            <NavItem>
              <Link to="/login">
                <NavLink>
                  Login
                </NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/registration">
                <NavLink>
                  Registration
                </NavLink>
              </Link>
            </NavItem>
          </>
        )}
      </Nav>
    </Navbar>
  );
}

export default memo(Header);

