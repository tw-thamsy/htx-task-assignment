import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function createData(id: number, title: string, skills: string, status: string, assignee: string) {
  return { id, title, skills, status, assignee };
}

const rows = [
  createData(1, 'Task 1', 'React, TypeScript', 'In Progress', 'Alice'),
  createData(2, 'Task 2', 'Node.js, Express', 'Completed', 'Bob'),
  createData(3, 'Task 3', 'Python, Django', 'Pending', 'Charlie'),
  createData(4, 'Task 4', 'Java, Spring', 'In Progress', 'David'),
  createData(5, 'Task 5', 'C#, .NET', 'Completed', 'Eve'),
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
              <TableCell align="right">{row.skills}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">{row.assignee}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
