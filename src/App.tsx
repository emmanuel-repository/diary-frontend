import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { lazy } from 'react';
import './App.css';

const Layout = lazy(() => import("./pages/main/Layout"));
const MainContact = lazy(() => import('./pages/panel-user-module/Admin/MainContact'));
const FormContact = lazy(() => import('./pages/panel-user-module/Admin/FormContact'));
const FormUpdateContact = lazy(() => import('./pages/panel-user-module/Admin/FormUpdateContact'));

function App() {

  const router = createBrowserRouter([
    {
      path: "",
      element: (
        <Layout />
      ),
      children: [
        { path: "list-contact", element: <MainContact /> },
        { path: "new-contact", element: <FormContact /> },
        { path: "edit-contact", element: <FormUpdateContact /> }
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
