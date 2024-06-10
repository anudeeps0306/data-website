import { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Container, TablePagination,
  Button, Menu, MenuItem, TextField
} from '@mui/material';
import data from '../../public/ap-phase-1';

const rowsPerPageOptions = [10, 25, 100];

const CollegeTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [dataToShow, setDataToShow] = useState(data);
  const [sortBy, setSortBy] = useState(null); // 'Min_NEET_Rank' or 'Max_NEET_Rank'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    const filteredData = data.filter((row) =>
      row.College.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setDataToShow(filteredData);
  };

  return (
    <Container>
      <TextField
        label="Search by College"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={handleSearch}
      />
      <div style={{ overflowX: 'auto' }}>
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
                  <Button onClick={() => handleSort('Min_NEET_Rank')} variant="text">{sortBy === 'Min_NEET_Rank' && sortOrder === 'asc' ? '↑' : '↓'}</Button>
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
                    <TableCell>{row.Min_NEET_Rank}</TableCell>
                    <TableCell>{row.Max_NEET_Rank}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
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
