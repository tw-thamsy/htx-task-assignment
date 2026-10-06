import { ThemeProvider, createTheme } from '@mui/material/styles';
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

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
