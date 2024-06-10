import { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Container, CircularProgress
} from '@mui/material';
import data from '../../public/ap-phase-1';

const CollegeTable = () => {
  return (
    <Container>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>College</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Local Area</TableCell>
                <TableCell>Allotment Details</TableCell>
                <TableCell>Min Cutoff</TableCell>
                <TableCell>Max Cutoff</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
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
    </Container>
  );
};

export default CollegeTable;
