module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: 'exporter.index',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/find',
    handler: 'exporter.find',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'POST',
    path: '/create',
    handler: 'exporter.create',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'POST',
    path: '/export-data',
    handler: 'exporter.exportData',
    config: {
      policies: [],
      auth: false,
    },
  },
];
