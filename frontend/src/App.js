import RouterMap from './RouterMap';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { store, history } from './redux/store';

// import Body from "./components/Body";
// import Header from "./components/Header";

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <RouterMap />
        {/*<Header />*/}
        {/*<Body />*/}
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
