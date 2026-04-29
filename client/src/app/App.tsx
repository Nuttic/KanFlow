import { RouterProvider } from 'react-router-dom';
import '@/styles/index.css'
import { router } from './router/Router';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/AuthStore';

function App() {
  const { checkAuth, isLoading } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  
  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary"></div>
      </div>
    );
  }
  return (
    <>
     <RouterProvider router={router} />
    </>
  )
}

export default App
