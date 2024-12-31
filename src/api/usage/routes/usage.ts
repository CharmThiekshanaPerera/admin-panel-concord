module.exports = {
    routes: [
      {
        method: 'POST',
        path: '/usages',
        handler: 'usage.createUsage', // Custom handler
        config: {
          auth: false, // Adjust based on authentication needs
        },
      },
      {
        method: 'GET',
        path: '/usages',
        handler: 'usage.getAllUsages', // Custom handler
        config: {
          auth: false,
        },
      },
    ],
  };
  