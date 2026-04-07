import { RouterProvider } from 'react-router-dom';
import '@/styles/index.css'
import { router } from './router/router';

function App() {
  return (
    <>
     <RouterProvider router={router} />
    </>
  )
}

export default App
