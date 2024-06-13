import { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Container, TablePagination,
  Button, Menu, MenuItem, TextField
} from '@mui/material';
import data from '../../public/ap-phase-1';

const rowsPerPageOptions = [10, 25, 100];
const collegeList = [
  "Siddhartha Medical College, Vijayawada",
  "Andhra Medical College, Visakhapatnam",
  "Guntur Medical College, Guntur",
  "Rangaraya Medical College, Kakinada",
  "Government Medical College,Srikakulam",
  "Government Medical College, Ongole",
  "Government Medical College, Vizianagaram",
  "Government Medical College, Rajamahendravaram",
  "Government Medical College, Eluru",
  "Government Medical College, Machilipatnam",
  "NRI Medical College, Chinnakakani",
  "Katuri Medical College and Hospital, Guntur",
  "Alluri Seetharama Raju Academy of Medical Sciences, Eluru",
  "Konaseema Institute of Medical Sciences and Research Foundation , Amalapuram",
  "Maharaja Institute of Medical Sciences, Vizianagaram",
  "GSL Medical College, Rajamahendravaram",
  "NRI Institute of Medical Sciences, Visakhapatnam",
  "Great Eastern Medical School and Hospital , Srikakulam",
  "Nimra Institute of Medical Sciences, Vijayawada",
  "Sri Venkateswara Medical College, Tirupati",
  "Kurnool Medical College, Kurnool",
  "Government Medical College, Kadapa",
  "Government Medical College, Anantapur",
  "ACSR Government Medical College, Nellore",
  "Government Medical College, Nandyal",
  "Sri Padmavathi Medical College for Women, Tirupati (under SVIMS)",
  "Narayana Medical College, Nellore",
  "Santhiram Medical College, Nandyal",
  "Viswabharathi Medical College, Kurnool",
  "Apollo Institute of Medical Sciences and Research, Chittoor",
  "Sri Balaji Medical College Hospital and Research Institute , Renigunta, Tirupati",
  "Fathima Institute of Medical Sciences, Kadapa"
];

const CollegeTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [dataToShow, setDataToShow] = useState(data);
  const [sortBy, setSortBy] = useState(null); // 'Min_NEET_Rank' or 'Max_NEET_Rank'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [localAreaFilter, setLocalAreaFilter] = useState(null);
  const [collegeFilter, setCollegeFilter] = useState(null);
  const [anchorElCategory, setAnchorElCategory] = useState(null);
  const [anchorElLocalArea, setAnchorElLocalArea] = useState(null);
  const [anchorElCollege, setAnchorElCollege] = useState(null);
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
  

  const applyFilters = () => {
    let filteredData = data;

    if (searchQuery) {
      filteredData = filteredData.filter((row) =>
        row.College.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (localAreaFilter) {
      filteredData = filteredData.filter((row) => row.Local_Area === localAreaFilter);
    }

    if (categoryFilter) {
      filteredData = filteredData.filter((row) => row.Category === categoryFilter);
    }

    if (collegeFilter) {
      filteredData = filteredData.filter((row) => row.College === collegeFilter);
    }

    setDataToShow(filteredData);
  };

  const handleCategoryFilter = (category) => {
    setCategoryFilter(category);
    setAnchorElCategory(null);
  };

  const handleLocalAreaFilter = (localArea) => {
    setLocalAreaFilter(localArea);
    setAnchorElLocalArea(null);
  };

  const handleCollegeFilter = (college) => {
    setCollegeFilter(college);
    setAnchorElCollege(null);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleClearFilters = () => {
    setCategoryFilter(null);
    setLocalAreaFilter(null);
    setCollegeFilter(null);
    setSearchQuery("");
    setDataToShow(data);
  };

  useEffect(() => {
    applyFilters();
  }, [categoryFilter, localAreaFilter, collegeFilter, searchQuery, applyFilters]);

  return (
    <div className='mt-6 mb-6'>
    <Container>
      <TextField
        label="Search by College"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={handleSearch}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={(e) => setAnchorElCategory(e.currentTarget)} variant="text" sx={{ ml: 1 }}>
          {categoryFilter || 'Category: All'}
        </Button>
        <Menu
          anchorEl={anchorElCategory}
          open={Boolean(anchorElCategory)}
          onClose={() => setAnchorElCategory(null)}
        >
          {["OC", "SC", "ST", "BC-A", "BC-B", "BC-C", "BC-D", "BC-E", null].map((category, index) => (
            <MenuItem key={index} onClick={() => handleCategoryFilter(category)}>
              {category || 'All'}
            </MenuItem>
          ))}
        </Menu>

        <Button onClick={(e) => setAnchorElLocalArea(e.currentTarget)} variant="text" sx={{ ml: 1 }}>
          {localAreaFilter || 'Local Area: All'}
        </Button>
        <Menu
          anchorEl={anchorElLocalArea}
          open={Boolean(anchorElLocalArea)}
          onClose={() => setAnchorElLocalArea(null)}
        >
          {["AU", "SVU", "APNL", "NL", "OU", "OUAPNL", null].map((area, index) => (
            <MenuItem key={index} onClick={() => handleLocalAreaFilter(area)}>
              {area || 'All'}
            </MenuItem>
          ))}
        </Menu>

        <Button onClick={(e) => setAnchorElCollege(e.currentTarget)} variant="text" sx={{ ml: 1 }}>
          {collegeFilter || 'College: All'}
        </Button>
        <Menu
          anchorEl={anchorElCollege}
          open={Boolean(anchorElCollege)}
          onClose={() => setAnchorElCollege(null)}
        >
          {collegeList.map((college, index) => (
            <MenuItem key={index} onClick={() => handleCollegeFilter(college)}>
              {college || 'All'}
            </MenuItem>
          ))}
        </Menu>

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
                <TableCell>College</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Local Area</TableCell>
                <TableCell>Allotment Details</TableCell>
                <TableCell>
                  Min Cutoff
                  {/* <Button onClick={() => handleSort('Min_NEET_Rank')} variant="text">
                    {sortBy === 'Min_NEET_Rank' && sortOrder === 'asc' ? '↑' : '↓'}
                  </Button> */}
                </TableCell>
                <TableCell>
                  Max Cutoff {/* Changed from 'Max Cutoff' */}
                  <Button onClick={() => handleSort('Max_NEET_Rank')} variant="text">
                    {sortBy === 'Max_NEET_Rank' && sortOrder === 'asc' ? '↑' : '↓'}
                  </Button>
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
    </div>
  );
};

export default CollegeTable;
