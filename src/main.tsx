import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AddFragment from './pages/fragement/AddFragment.tsx';
import DetailFragment from './pages/fragement/DetailFragment.tsx';
import UpdateFragment from './pages/fragement/UpdateFragment.tsx';
import Convert from './pages/fragement/Convert.tsx';
import { RecoilRoot } from 'recoil';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App isPassedToWithAuthenticator={true} />,
  },
  {
    path: '/addfragment',
    element: <AddFragment />,
  },
  {
    path: '/details/:id',
    element: <DetailFragment />,
  },
  {
    path: '/update/:id',
    element: <UpdateFragment />,
  },
  {
    path: '/convert/:id',
    element: <Convert />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>
);
