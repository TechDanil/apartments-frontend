import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from 'store';
import router from 'router/router';

import { RouterProvider } from 'react-router';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
