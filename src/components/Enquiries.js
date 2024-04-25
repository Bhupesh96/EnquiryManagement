import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Box from "@mui/material/Box";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import axios from 'axios';
import Sidenav from './Sidenav';
import Swal from 'sweetalert2';

const columns = [
  { id: 'firstName', label: 'First Name', minWidth: 170 },
  { id: 'lastName', label: 'Last Name', minWidth: 100 },
  { id: 'email', label: 'Email', minWidth: 170 },
  { id: 'description', label: 'Description', minWidth: 170 },
  { id: 'date', label: 'Date', minWidth: 170 },
  { id: 'action', label: 'Action', minWidth: 200 } // Expanded minWidth for actions
];

export default function Enquiries() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    fetchEnquiries();
  }, []); // Fetch enquiries when the component mounts

  const fetchEnquiries = async () => {
    try {
      const response = await axios.get('https://rjtechx.fun/bhupesh/api/enquiries');
      setEnquiries(response.data);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
      // Handle error fetching enquiries
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDeleteEnquiry = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://rjtechx.fun/bhupesh/api/enquiries/${id}`);
          fetchEnquiries(); // Refetch enquiries after deletion
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        } catch (error) {
          console.error('Error deleting enquiry:', error);
          // Handle error deleting enquiry
          Swal.fire({
            title: "Error!",
            text: "An error occurred while deleting the enquiry.",
            icon: "error"
          });
        }
      }
    });
  };

  const handleEditEnquiry = async (enquiry) => {
    const { _id, firstName, lastName, email, description, date } = enquiry;
    const editedEnquiry = await Swal.fire({
      title: 'Edit Enquiry',
      html: `
        <input id="firstName" class="swal2-input" value="${firstName}">
        <input id="lastName" class="swal2-input" value="${lastName}">
        <input id="email" class="swal2-input" value="${email}">
        <input id="description" class="swal2-input" value="${description}">
      `,
      focusConfirm: false,
      preConfirm: () => {
        return {
          firstName: document.getElementById('firstName').value,
          lastName: document.getElementById('lastName').value,
          email: document.getElementById('email').value,
          description: document.getElementById('description').value,
          date: date // Keep the original date
        }
      }
    });
    
    if (editedEnquiry.isConfirmed) {
      try {
        await axios.put(`https://rjtechx.fun/bhupesh/api/enquiries/${_id}`, editedEnquiry.value);
        fetchEnquiries(); // Refetch enquiries after updating
        Swal.fire({
          title: "Updated!",
          text: "Enquiry data has been updated.",
          icon: "success"
        });
      } catch (error) {
        console.error('Error updating enquiry:', error);
        // Handle error updating enquiry
        Swal.fire({
          title: "Error!",
          text: "An error occurred while updating the enquiry.",
          icon: "error"
        });
      }
    }
  };
  
  

  return (
    <>
      <Box sx={{ display: "flex" }} >
      <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 5 }}>    
          <h1>Enquiry List</h1>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="left" // Align all columns to the left
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {enquiries
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((enquiry) => {
                return (
                  <TableRow hover key={enquiry._id}>
                    {columns.map((column) => {
                      const value = column.id === 'date' ? new Date(enquiry[column.id]).toLocaleString() : enquiry[column.id]; // Modified to include time
                      return (
                        <TableCell key={column.id} align="left">
                          {column.id === 'action' ? (
                            <>
                              <Button onClick={() => handleEditEnquiry(enquiry)}>Edit</Button>
                              <Button onClick={() => handleDeleteEnquiry(enquiry._id)}>Delete</Button>
                            </>
                          ) : (
                            value
                          )}
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
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={enquiries.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
        </Box>
      </Box>
    </>
  );
}
