import AddIcon from '@mui/icons-material/Add';
import { Box, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import TaskTable from './task-table/TaskTable';

export default function TaskListPage() {
  return (
    <div>
      <h1>Tasks</h1>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          component={RouterLink}
          to="/tasks/create"
          variant="contained"
          color="primary"
          endIcon={<AddIcon />}
        >
          Create Task
        </Button>
      </Box>
      <TaskTable />
    </div>
  );
}
