// @ts-nocheck
/*
 *
 * HomePage
 *
 */

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
        data: formData
      });
      if (response.status === 200) {
        setSuccessMessage('Formulario enviado con éxito.');
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      setErrorMessage('Hubo un error al enviar el formulario. Inténtelo de nuevo.');
    }
  };

  const handleDownload = async () => {
    try {
      const response = await axios.post('http://localhost:1337/exporter/export-data', {
        format
      }, {
        responseType: 'blob' // Para manejar archivos (CSV o JSON)
      });

      // Crear un enlace para descargar el archivo
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `data.${format === 'csv' ? 'csv' : 'json'}`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      setErrorMessage('Hubo un error al descargar los datos.');
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
            type="message"
            name="message"
            label="Message"
            value={formData.message}
            onChange={handleInputChange}
            required
          />
          <Button type="submit" fullWidth>
            Enviar
          </Button>

          <SingleSelect
            label="Seleccione el formato"
            placeholder="Seleccionar formato"
            value={format}
            onChange={handleFormatChange}
            required
          >
            <SingleSelectOption value="csv">CSV</SingleSelectOption>
            <SingleSelectOption value="json">JSON</SingleSelectOption>
          </SingleSelect>
          <Button type="button" onClick={handleDownload} fullWidth>
            Download
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default HomePage;
