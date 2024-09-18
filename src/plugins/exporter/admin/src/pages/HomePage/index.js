// @ts-nocheck
import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Stack,
  Button,
  TextInput,
  Typography,
  SingleSelect,
  SingleSelectOption,
} from '@strapi/design-system';

const HomePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [format, setFormat] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFormatChange = (value) => {
    setFormat(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:1337/exporter/create', {
        data: formData,
        format: format
      }, {
        responseType: 'blob'
      });

      if (response.status === 200) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `data.${format === 'csv' ? 'csv' : 'json'}`);
        document.body.appendChild(link);
        link.click();

        setSuccessMessage('Form submitted and file downloaded successfully.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setErrorMessage('The request could not be processed.');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || 'There was an error submitting the form.');
      } else {
        setErrorMessage('There was an error submitting the form.');
      }
    }
  };

  return (
    <Box padding={8}>
      <Typography variant="alpha" as="h1" marginBottom={4}>
        Contact Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <TextInput
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <TextInput
            type="email"
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <TextInput
            name="message"
            label="Message"
            value={formData.message}
            onChange={handleInputChange}
            required
          />
          <SingleSelect
            label="Seleccione el formato"
            placeholder="Seleccionar formato"
            value={format}
            onChange={handleFormatChange} // Directamente pasando la función sin evento
            required
          >
            <SingleSelectOption value="csv">CSV</SingleSelectOption>
            <SingleSelectOption value="json">JSON</SingleSelectOption>
          </SingleSelect>
          <Button type="submit" fullWidth>
            Enviar
          </Button>
        </Stack>
      </form>

      {successMessage && <Typography variant="beta" color="success">{successMessage}</Typography>}
      {errorMessage && <Typography variant="beta" color="danger">{errorMessage}</Typography>}
    </Box>
  );
};

export default HomePage;
