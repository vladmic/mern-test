// import React from 'react';
// import { Redirect, useLocation } from 'react-router-dom';
//
// const RedirectHoc = ({ component: Component }) => (
//   function Auth() {
//     const { pathname = '' } = useLocation();
//
//     const isAuthenticated = Boolean(localStorage.getItem('token'));
//
//     if (!isAuthenticated) {
//       return <Component />;
//     }
//     if (pathname === constants.routes.login) {
//       return <Redirect to={{ pathname: constants.routes.sport }} />;
//     }
//     return <Component />;
//   }
// );
//
// export default RedirectHoc;
