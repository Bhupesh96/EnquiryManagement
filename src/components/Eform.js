import React, { useState } from "react";
import Box from "@mui/material/Box";
import Sidenav from "./Sidenav";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import axios from 'axios';
import BASE_URL from process.env.BASE_URL;

function Eform() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/bhupesh/api/enquiries`, formData);
      alert('Enquiry submitted successfully');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        description: ''
      });
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      alert('Error submitting enquiry');
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidenav />
      <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
        <Container maxWidth="sm">
          <h1>Enquiry Form</h1>
          <form>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1 },
              }}
              noValidate
              autoComplete="off"
            >
              <h4>Customer Name</h4>
              <FormControl>
                <InputLabel htmlFor="component-outlined">First</InputLabel>
                <OutlinedInput
                  id="component-outlined"
                  label="Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="component-outlined">Last</InputLabel>
                <OutlinedInput
                  id="component-outlined"
                  label="Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </FormControl>
              <h4>Customer Email Address</h4>
              <FormControl sx={{ m: 1, width: "52ch" }}>
                <InputLabel htmlFor="email-address">Email</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  label="Amount"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </FormControl>
              <h4>Issue Description</h4>
              <TextField
                label="Description"
                multiline
                sx={{ m: 1, width: "52ch" }}
                rows={4}
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
              <Stack direction="row" spacing={2}>
                <Button variant="contained" type="submit" onClick={handleSubmit}>Submit</Button>
                <Button variant="contained" type="reset">
                  Reset
                </Button>
              </Stack>
            </Box>
          </form>
        </Container>
      </Box>
    </Box>
  );
}

export default Eform;
