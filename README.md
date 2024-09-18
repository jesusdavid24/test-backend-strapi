# 🚀 Strapi Export Plugin

## Badges

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)

## Index

* [Title](#title)
* [Badges](#badges)
* [Index](#index)
* [Description](#Description)
* [Features](#Features)
* [Project Structure](#Project-Structure)
* [API Reference](#API-Reference)
* [Project Acces](#Project-Acces)
* [Tech Stack](#Tech-Stack)
* [Authors](#Authors)
* [License](#license)
* [Conclusion](#conclusion)

## Description

This project is an export plugin developed for an application built with Strapi. It allows users to submit a form with personal data and download the submitted data in either CSV or JSON format. The plugin integrates seamlessly with Strapi’s back-end, handling data creation and exportation automatically upon submission.

## Features

* Contact form with fields for name, email, and message.
* Data validation on the server-side (e.g., required fields).
* Exporting data in CSV or JSON after successful form submission.
* Automatic file download in the selected format.

## Project Structure

The project consists of two main components:

1. Frontend (React-based): A form that allows users to input data and select the export format.
2. Backend (Strapi): A custom plugin that manages data storage and export functionality.

## API Reference

#### Find Users

```http
  GET /exporter/find
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `N/A`     | `N/A`    | No authentication required.|

#### Post User and dowload archive

```http
  POST /exporter/create
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `N/A`     | `N/A`    | No authentication required.|

## Project Access

### `develop`

1. Clone the Repository

```
https://github.com/jesusdavid24/test-backend-strapi.git
```

2. Navigate to the project directory

```
cd backend-data-exporter
```

3. Install dependicies

```
npm install
```

4. Run app

```
npm run develop
```

## Tech Stack

1. Node 20
2. Stapi
3. React.js
4. SQLite

## Authors

- [@jesusdavid24](https://github.com/jesusdavid24)


## License

[MIT](https://choosealicense.com/licenses/mit/)

## Conclusion

This project provides a streamlined solution for managing form submissions and exporting data in different formats (CSV or JSON) using Strapi. By leveraging Strapi's plugin architecture, it ensures a modular and scalable approach for handling data exports, while maintaining flexibility for future enhancements. The backend efficiently handles data validation, storage, and export processes, while the frontend delivers an intuitive user experience for submitting forms and downloading data. This structure adheres to best practices, ensuring both maintainability and extendability, making it suitable for a wide range of applications.
