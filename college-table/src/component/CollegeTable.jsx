import React, { useEffect, useState, useCallback } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Container, TablePagination,
  Button, Menu, MenuItem, TextField, Select, FormControl, InputLabel
} from '@mui/material';
import configs from './config';

const loadData = (state, phase) => {
  return import(configs[state].phases[phase].dataSource).then(module => module.default);
};

const rowsPerPageOptions = [10, 25, 100];
const states = Object.keys(configs);

const CollegeTable = () => {
  const [selectedState, setSelectedState] = useState(states[0]);
  const [selectedPhase, setSelectedPhase] = useState(Object.keys(configs[states[0]].phases)[0]);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [dataToShow, setDataToShow] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterStates, setFilterStates] = useState({});
  const [menus, setMenus] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const currentConfig = configs[selectedState].phases[selectedPhase];

  const initializeFilters = useCallback(() => {
    const initialFilterStates = {};
    const initialMenus = {};
    for (const filter in currentConfig.filters.dropdown) {
      initialFilterStates[filter] = null;
      initialMenus[filter] = null;
    }
    setFilterStates(initialFilterStates);
    setMenus(initialMenus);
  }, [currentConfig]);

  useEffect(() => {
    loadData(selectedState, selectedPhase).then(data => {
      setData(data);
      setDataToShow(data);
      initializeFilters();
    });
  }, [selectedState, selectedPhase, initializeFilters]);

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

  const applyFilters = useCallback(() => {
    let filteredData = data;

    if (searchQuery) {
      filteredData = filteredData.filter((row) =>
        row.College?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    for (const filter in filterStates) {
      if (filterStates[filter] && filterStates[filter] !== 'All') {
        filteredData = filteredData.filter((row) => row[filter] === filterStates[filter]);
      }
    }

    setDataToShow(filteredData);
  }, [data, filterStates, searchQuery]);

  const handleFilterChange = (filter, value) => {
    setFilterStates((prev) => ({ ...prev, [filter]: value }));
    setMenus((prev) => ({ ...prev, [filter]: null }));
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleClearFilters = () => {
    initializeFilters();
    setSearchQuery("");
    setDataToShow(data);
  };

  useEffect(() => {
    applyFilters();
  }, [filterStates, searchQuery, applyFilters]);

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedPhase(Object.keys(configs[e.target.value].phases)[0]);
  };

  const handlePhaseChange = (e) => {
    setSelectedPhase(e.target.value);
  };

  return (
    <div className='mt-6 mb-6'>
      <Container>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>State</InputLabel>
          <Select
            value={selectedState}
            onChange={handleStateChange}
          >
            {states.map((state, index) => (
              <MenuItem key={index} value={state}>
                {state}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Phase</InputLabel>
          <Select
            value={selectedPhase}
            onChange={handlePhaseChange}
          >
            {Object.keys(configs[selectedState].phases).map((phase, index) => (
              <MenuItem key={index} value={phase}>
                {phase}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Search by College"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchQuery}
          onChange={handleSearch}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {Object.keys(currentConfig.filters.dropdown).map((filter, index) => (
            <div key={index}>
              <Button
                onClick={(e) => setMenus((prev) => ({ ...prev, [filter]: e.currentTarget }))}
                variant="text"
                sx={{ ml: 1 }}
              >
                {filterStates[filter] || `${filter}: All`}
              </Button>
              <Menu
                anchorEl={menus[filter]}
                open={Boolean(menus[filter])}
                onClose={() => setMenus((prev) => ({ ...prev, [filter]: null }))}
              >
                {currentConfig.filters.dropdown[filter].map((option, idx) => (
                  <MenuItem key={idx} onClick={() => handleFilterChange(filter, option)}>
                    {option || 'All'}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          ))}
          <Button onClick={handleClearFilters} variant="text" sx={{ ml: 1 }}>
            Clear Filters
          </Button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>S.no</TableCell>
                  {currentConfig.columns.map((col, index) => (
                    <TableCell key={index}>
                      {col.headerName}
                      {currentConfig.filters.order[col.field] && (
                        <Button onClick={() => handleSort(col.field)} variant="text">
                          {sortBy === col.field && sortOrder === 'asc' ? '↑' : '↓'}
                        </Button>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {dataToShow
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + page * rowsPerPage + 1}</TableCell>
                      {currentConfig.columns.map((col, colIndex) => (
                        <TableCell key={colIndex}>{row[col.field]}</TableCell>
                      ))}
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
    </div>
  );
};

export default CollegeTable;
