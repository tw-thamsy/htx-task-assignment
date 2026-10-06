import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import './App.css';
import TaskCreationPage from './pages/task-creation/TaskCreationPage';
import TaskListPage from './pages/task-list/TaskListPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/task-list" replace />,
  },
  {
    path: '/task-list',
    element: <TaskListPage />,
  },
  {
    path: '/task-creation',
    element: <TaskCreationPage />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
