import React, { memo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navbar, Nav, NavItem, NavLink, Container } from 'reactstrap';
import {
  Switch,
  Redirect,
  Route,
  Link,
} from 'react-router-dom';
import constantsRoutes from './utils/routerConstants';

import { setIsAuthenticated } from './redux/actions';
import Header from './components/Header';
import { ROUTES, TOKEN } from './utils/routerConstants';

const { routes: { login, todos } } = constantsRoutes;

export const mapRoutes = (routes) => (
  routes.map((route) => <Route key={route.path} {...route} />)
);

// const Header = ({ isAuthenticated }) => (
//   <Navbar color="dark" dark expand="md">
//     <Nav className="mr-auto" navbar>
//       <NavItem>
//         <Link to="/todos">
//           <NavLink>
//             Todos
//           </NavLink>
//         </Link>
//       </NavItem>
//     </Nav>
//     <Nav navbar>
//       {isAuthenticated ? (
//         <NavItem>
//           <Link to="/logout">
//             <NavLink>
//               Logout
//             </NavLink>
//           </Link>
//         </NavItem>
//       ) : (
//         <>
//           <NavItem>
//             <Link to="/login">
//               <NavLink>
//                 Login
//               </NavLink>
//             </Link>
//           </NavItem>
//           <NavItem>
//             <Link to="/registration">
//               <NavLink>
//                 Registration
//               </NavLink>
//             </Link>
//           </NavItem>
//         </>
//       )}
//     </Nav>
//   </Navbar>
// );


const RouterMap = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state?.auth?.isAuthenticated ?? false);

  const tokens = localStorage.getItem(TOKEN)?.length > 0;

  useEffect(() => {
    if (tokens && !isAuthenticated) {
      console.log('setIsAuthenticated -->');
      dispatch(setIsAuthenticated());
    }
  }, [isAuthenticated]);
  //
  // useEffect(() => {
  //   if (isAuthToken) {
  //     // dispatch(AuthActions.getUserInfoRequest());
  //   }
  // }, [isAuthToken, dispatch]);

  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      <Container>
        <Switch>
          {mapRoutes(ROUTES)}
          <Redirect exact from="*" to={isAuthenticated ? todos : login} />
        </Switch>
      </Container>
    </>
  );
};

export default memo(RouterMap);
