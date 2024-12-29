export default {
  routes: [
    {
      method: 'POST',
      path: '/appusers/login',
      handler: 'app-user.login',
      config: {
        auth: false, // No authentication needed for login
      },
    },
    {
      method: 'POST',
      path: '/appusers/register',
      handler: 'app-user.register',
      config: {
        auth: false, // No authentication needed for registration
      },
    },
  ],
};
