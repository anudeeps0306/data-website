import { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Container, TablePagination,
  Button, Menu, MenuItem
} from '@mui/material';
import data from '../../public/ap-phase-1';

const rowsPerPageOptions = [10, 25, 100];

const CollegeTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [dataToShow, setDataToShow] = useState(data);
  const [sortBy, setSortBy] = useState(null); // 'Min_Score' or 'Max_Score'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (sortKey) => {
    let order = 'asc';
    if (sortBy === sortKey && sortOrder === 'asc') {
      order = 'desc';
    }
    const sorted = [...dataToShow].sort((a, b) => {
      const valueA = parseFloat(a[sortKey]);
      const valueB = parseFloat(b[sortKey]);
      if (order === 'asc') {
        return valueA - valueB;
      } else {
        return valueB - valueA;
      }
    });
    setDataToShow(sorted);
    setSortBy(sortKey);
    setSortOrder(order);
  };

  const handleCategoryFilter = (category) => {
    setCategoryFilter(category);
    setAnchorEl(null);
    const filtered = category ? data.filter((row) => row.Category === category) : data;
    setDataToShow(filtered);
  };

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S.no</TableCell>
              <TableCell>College</TableCell>
              <TableCell>
                Category
                <Button onClick={(e) => setAnchorEl(e.currentTarget)} variant="text" sx={{ ml: 1 }}>{categoryFilter || 'All'}</Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                >
                  {["OC", "SC", "ST", "BC-A", "BC-B", "BC-C", "BC-D", "BC-E", null].map((category, index) => (
                    <MenuItem key={index} onClick={() => handleCategoryFilter(category)}>{category || 'All'}</MenuItem>
                  ))}
                </Menu>
              </TableCell>
              <TableCell>Local Area</TableCell>
              <TableCell>Allotment Details</TableCell>
              <TableCell>
                Min Cutoff
                <Button onClick={() => handleSort('Min_Score')} variant="text">{sortBy === 'Min_Score' && sortOrder === 'asc' ? '↑' : '↓'}</Button>
              </TableCell>
              <TableCell>
                Max Cutoff
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataToShow
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{index + page * rowsPerPage + 1}</TableCell>
                  <TableCell>{row.College}</TableCell>
                  <TableCell>{row.Category}</TableCell>
                  <TableCell>{row.Local_Area}</TableCell>
                  <TableCell>{row.Allotment_Details}</TableCell>
                  <TableCell>{row.Min_Score}</TableCell>
                  <TableCell>{row.Max_Score}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={dataToShow.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
};

export default CollegeTable;
