module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/complaints',
        handler: 'complaint.find',
        config: {
          auth: false,
        },
      },
      {
        method: 'POST',
        path: '/complaints',
        handler: 'complaint.create',
        config: {
          auth: false,
        },
      },
    ],
  };
  