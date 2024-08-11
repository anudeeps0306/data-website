import { useEffect, useState, useCallback } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Container, TablePagination,
  Button, Menu, MenuItem, TextField, Select, FormControl, InputLabel,
  CircularProgress, Box, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import configs from './config';
import axios from 'axios';

const rowsPerPageOptions = [10, 25, 100];
const states = Object.keys(configs);

const CollegeTable = () => {
  const [selectedState, setSelectedState] = useState(states[0]);
  const [selectedPhase, setSelectedPhase] = useState(Object.keys(configs[states[0]].phases)[0]);
  const [open, setOpen] = useState(false);
  const [score, setScore] = useState('');
  const [predictedRank, setPredictedRank] = useState(null);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [dataToShow, setDataToShow] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterStates, setFilterStates] = useState({});
  const [menus, setMenus] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);  // New loading state

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
    const fetchData = async () => {
      setLoading(true); // Set loading to true before starting data fetch
      try {
        const response = await axios.post('https://data-backend-ra9x.onrender.com/get-data', {
          region: selectedState
        });
        setData(response.data);
        setDataToShow(response.data);
        initializeFilters();
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false once data fetch is complete
      }
    };

    fetchData();
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
        filteredData = filteredData.filter((row) =>
          row[filter] === filterStates[filter]
        );
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPredictedRank(null);
  };

  const handleSubmit = () => {
    setLoading(true);
    fetch('https://data-backend-ra9x.onrender.com/predict-rank', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ score: parseFloat(score) }),
    })
      .then((response) => response.json())
      .then((data) => {
        setPredictedRank(data.predicted_rank);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
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
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleClickOpen}
          sx={{ mb: 3 }}
        >
          Predict 2024 Rank
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Predict 2024 Rank</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Enter Your Score"
              type="number"
              fullWidth
              variant="outlined"
              value={score}
              onChange={(e) => setScore(e.target.value)}
            />
            {loading ? (
              <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
                <CircularProgress />
              </Box>
            ) : (
              predictedRank !== null && (
                <Box mt={2}>
                  <h3>Predicted Rank: {predictedRank}</h3>
                </Box>
              )
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
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
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
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
          </>
        )}
      </Container>
    </div>
  );
};

export default CollegeTable;
