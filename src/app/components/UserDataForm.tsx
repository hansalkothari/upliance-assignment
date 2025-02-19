"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

interface FormData {
  name: string;
  address: string;
  email: string;
  phone: string;
  userId?: string;
}

export default function UserDataForm() {
  const initialFormState: FormData = {
    name: "",
    address: "",
    email: "",
    phone: "",
  };

  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [isDirty, setIsDirty] = useState(false);

  // Warn the user if there are unsaved changes when trying to close or reload the browser.
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "Unsaved Changes, do you really want to reload the page?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setIsDirty(true);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUserId = uuidv4();
    const dataToSave = { ...formData, userId: newUserId };

    // Save data to localStorage
    localStorage.setItem("userData", JSON.stringify(dataToSave));

    // Reset form state and dirty flag
    setIsDirty(false);
    alert("User data saved successfully!");
    setFormData(initialFormState);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          User Data Form
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            variant="outlined"
            required
          />
          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            variant="outlined"
            multiline
            rows={3}
            required
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            type="email"
            required
          />
          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            variant="outlined"
            type="tel"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Save Data
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
