import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { Skills } from '#shared/skills.constants';

function createData(id: number, title: string, skills: Skills[], status: string, assignee: string) {
  return { id, title, skills, status, assignee };
}

const rows = [
  createData(1, 'Task 1', [Skills.BACKEND, Skills.FRONTEND], 'In Progress', 'Alice'),
  createData(2, 'Task 2', [Skills.BACKEND], 'Completed', 'Bob'),
  createData(3, 'Task 3', [Skills.FRONTEND], 'Pending', 'Charlie'),
  createData(4, 'Task 4', [], 'In Progress', 'David'),
  createData(5, 'Task 5', [Skills.FRONTEND], 'Completed', 'Eve'),
];

export default function TaskTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Task Title</TableCell>
            <TableCell align="right">Skills</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Assignee</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.skills.join(', ')}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">{row.assignee}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
