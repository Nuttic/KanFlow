import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from './routes';
import HomePage from '@/pages/mainPage';

export const router = createBrowserRouter([
  {
    children: [{
        path: ROUTES.DEFAULT,
        // element: <SignInPage/>
      },
      {
        path: ROUTES.HOME,
        element: <HomePage />,
      },
      {
        path: ROUTES.SIGNIN,
        // element: <SignInPage/>,
      },
       {
        path: ROUTES.SIGNUP,
        // element: <SignUpPage/>,
      },
    ],
  },
]);
