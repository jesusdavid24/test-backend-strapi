'use strict';

module.exports = {
  default: {
    exportFormat: 'csv',
    exportPath: './exports/',
    maxRecords: 1000,
  },
  validator(config) {
    // Validar que el formato sea csv o json
    if (!['csv', 'json'].includes(config.exportFormat)) {
      throw new Error('El formato de exportación debe ser "csv" o "json".');
    }

    // Validar que la ruta de exportación esté definida
    if (typeof config.exportPath !== 'string' || !config.exportPath) {
      throw new Error('Debes especificar una ruta válida para exportar los archivos.');
    }

    // Validar que maxRecords sea un número positivo
    if (typeof config.maxRecords !== 'number' || config.maxRecords <= 0) {
      throw new Error('maxRecords debe ser un número positivo.');
    }
  },
};
