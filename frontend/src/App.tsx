import { ThemeProvider, createTheme } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import TaskCreationPage from './pages/task-creation/TaskCreationPage';
import TaskListPage from './pages/task-list/TaskListPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <TaskListPage />,
  },
  {
    path: '/tasks/create',
    element: <TaskCreationPage />,
  },
]);

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

const queryClient = new QueryClient();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
