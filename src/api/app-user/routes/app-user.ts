export default {
    routes: [
      {
        method: 'POST',
        path: '/appusers/login',
        handler: 'app-user.login',
        config: {
          auth: false, // No authentication needed to access this route
        },
      },
    ],
  };
  