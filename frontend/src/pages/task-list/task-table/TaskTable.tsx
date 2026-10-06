import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useQuery } from '@tanstack/react-query';

import { fetchTasks } from '../../../api/tasks';
import AssigneeSelect from './AssigneeSelect';
import StatusSelect from './StatusSelect';

export default function TaskTable() {
  const {
    data: tasks = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });

  if (isPending) {
    return <p>Loading tasks...</p>;
  }

  if (isError) {
    return <p role="alert">Unable to load tasks: {error.message}</p>;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Task Title</TableCell>
            <TableCell>Skills</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Assignee</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {task.title}
              </TableCell>
              <TableCell>{task.skillsRequired.join(', ')}</TableCell>
              <TableCell>
                <StatusSelect taskId={task.id} value={task.status} />
              </TableCell>
              <TableCell>
                <AssigneeSelect taskId={task.id} value={task.assignedTo ?? null} />
              </TableCell>
            </TableRow>
          ))}
          {tasks.length === 0 && (
            <TableRow>
              <TableCell colSpan={4}>No tasks found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
