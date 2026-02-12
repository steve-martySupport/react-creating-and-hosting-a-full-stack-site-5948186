import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage';
import ArticlesList from './pages/ArticlesListPage';
import Layout from './Layout';
import ArticlePage from './pages/ArticlePage';
import NotFoundPage from './pages/NotFound';

const routes = [{
  path:'/',
  element: <Layout />,
  errorElement: <NotFoundPage />,
  children: [
  {
    path:'/',
    element: <HomePage />
  },
  {
    path:'/about',
    element: <AboutPage />
  },
  {
    path:'/articles',
    element: <ArticlesList />
  },
  {
    path:'/articles/:name',
    element:<ArticlePage />
  }
]
}]



const router = createBrowserRouter(routes);


function App() {

  return (
    <>
    <RouterProvider router={router} />
    </>
  
  )
}

export default App
