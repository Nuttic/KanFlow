import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store/AuthStore';
import { ROUTES } from './routes';
import LoginPage from '@/pages/auth/Login';
import RegisterPage from '@/pages/auth/Registr';
import HomePage from '@/pages/mainPage';
import ProfilePage from '@/pages/ProfilePage';

const ProtectedRoute = () => {
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);

  // Пока checkAuth проверяет куки, показываем пустоту или спиннер
  if (isLoading) {
    return null; // Или <div className="spinner">...</div>
  }

  // Если проверка закончилась и юзера нет — на логин
  if (!user) {
    return <Navigate to={ROUTES.SIGNIN} replace />;
  }

  return <Outlet />;
};

export const router = createBrowserRouter([
  {
    path: '/',
    children: [
      // ПУБЛИЧНЫЕ РОУТЫ
      {
        path: ROUTES.SIGNIN,
        element: <LoginPage />,
      },
      {
        path: ROUTES.SIGNUP,
        element: <RegisterPage />,
      },
      
      // ЗАЩИЩЕННЫЕ РОУТЫ
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: ROUTES.HOME,
            element: <HomePage />,
          },
          {
            path: ROUTES.PROFILE,
            element: <ProfilePage />,
          },
          {
            path: ROUTES.DEFAULT, // Например, '*'
            element: <HomePage />,
          },
        ],
      },
    ],
  },
]);