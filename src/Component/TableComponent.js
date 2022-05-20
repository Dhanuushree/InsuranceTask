import { Modal, Button, Paper, Table, TableBody, TableContainer, TableHead, TablePagination, TextField, InputBase } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react'
import { useContext } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import data from "../DB/DB.json"
import { UserContext } from './Navigationbar';
import { styled, alpha } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { useEffect } from 'react';


const columns = [
  { id: 'Policy_id', label: 'Policy id', align: 'center', minWidth: 170 },
  { id: 'Date of Purchase', label: 'Date of Purchase', align: 'center', minWidth: 100 },
  {
    id: 'Customer_id',
    label: 'Customer id',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'Premium',
    label: 'Premium',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'Customer_Region',
    label: 'Customer Region',
    minWidth: 170,
    align: 'center',
  }
];

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.primary.main, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.25),
  },
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function TableComponent({ Data,search }) {

  // const FilteredData = useContext(UserContext);
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [editdata, seteditdata] = useState()
  const [FilteredData, setFilteredData] = useState()
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    bargraphData()
  }, [Data])
  const bargraphData = () => {
    setFilteredData(Data)
  }
  const searchdata = (e) => {
    const matchedData = data.filter(data => {
      if (data.Policy_id.toString().startsWith(e.target.value)) return data
    })
    console.log(matchedData)
    setFilteredData(matchedData)
  }
  const handleOpen = (row) => {
    setOpen(true);
    seteditdata(data.find(rec => rec.Policy_id === row));
  }
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Paper sx={{ width: '90%', overflow: 'hidden', justifyContent: "center" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={2}>
                </TableCell>
                <TableCell align="center" colSpan={2}>
                </TableCell>
                <TableCell align="right" colSpan={3}>
                  {search && <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} onChange={searchdata} />
                  </Search>}
                </TableCell>
              </TableRow>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {FilteredData && FilteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" onClick={() => handleOpen(row.Policy_id)} tabIndex={-1} key={row.Policy_id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        const linkdata = row.Policy_id
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={!FilteredData ? data.length : FilteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 id="parent-modal-title">Edit Policy</h2>
        {  console.log(editdata)}
          {editdata ? Object.entries(editdata).map(([key, value], i) =>
            <TextField
              inputlabel={{ shrink: true }}
              key={i}
              sx={{ '& > :not(style)': { m: 1, ml: 8 } }}
              label={key}
              inputProps={key === "Premium" ? {  maxLength: 6 } :{  maxLength: 50 }}
              onChange={(e) => { seteditdata({ ...editdata, [key]: e.target.value }) }}
              disabled={key === "Date of Purchase" ? true : false}
              id="outlined-size-small "
              value={value}
              size="small"
            />
          ) : ""}
          <div style={{ paddingLeft: "45%" }}>

            <Button variant="contained" onClick={handleClose}>Cancel</Button>
          </div></Box>
      </Modal>

    </div>
  )
}
export default TableComponent