import React, { useState } from 'react';
import './App.css';
import { Button, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, InputLabel, FormControl, Box, Typography, Stack } from '@mui/material';

const customersData = [
  { id: 1, name: 'Acme Corp', status: 'Done', lastUpdate: '2024-06-01' },
  { id: 2, name: 'Beta LLC', status: 'In Progress', lastUpdate: '2024-06-10' },
  { id: 3, name: 'Gamma Inc', status: 'Red Flag', lastUpdate: '2024-06-12' },
  { id: 4, name: 'Delta Ltd', status: 'Done', lastUpdate: '2024-06-05' },
  { id: 5, name: 'Epsilon GmbH', status: 'In Progress', lastUpdate: '2024-06-11' },
  { id: 6, name: 'Zeta S.A.', status: 'Red Flag', lastUpdate: '2024-06-13' },
];

const statusColors = {
  'Done': 'success',
  'In Progress': 'warning',
  'Red Flag': 'error',
};

function StatusChip({ status }) {
  return <Chip label={status} color={statusColors[status]} variant="outlined" />;
}

function App() {
  const [filter, setFilter] = useState('All');

  const filteredCustomers = filter === 'All'
    ? customersData
    : customersData.filter(c => c.status === filter);

  return (
    <Box sx={{ p: 4, background: '#f5f6fa', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
      <Stack direction="row" spacing={2} alignItems="center" mb={2}>
        <FormControl size="small">
          <InputLabel>Status</InputLabel>
          <Select
            value={filter}
            label="Status"
            onChange={e => setFilter(e.target.value)}
            sx={{ minWidth: 140 }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Done">Done</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Red Flag">Red Flag</MenuItem>
          </Select>
        </FormControl>
        <Typography variant="body2" color="text.secondary">
          Showing {filteredCustomers.length} of {customersData.length} customers
        </Typography>
      </Stack>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last Update</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.name}</TableCell>
                <TableCell><StatusChip status={customer.status} /></TableCell>
                <TableCell>{customer.lastUpdate}</TableCell>
                <TableCell align="right">
                  <Button size="small" variant="outlined">View</Button>
                  {customer.status !== 'Done' && (
                    <Button size="small" variant="contained" color="success" sx={{ ml: 1 }}>
                      Mark as Done
                    </Button>
                  )}
                  {customer.status === 'Red Flag' && (
                    <Button size="small" variant="contained" color="error" sx={{ ml: 1 }}>
                      Escalate
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default App;
