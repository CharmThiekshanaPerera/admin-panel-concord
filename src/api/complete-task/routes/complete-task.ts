export default {
    routes: [
      {
        method: 'POST',
        path: '/complete-task',
        handler: 'complete-task.createCompleteTask',
        config: {
          auth: false, // Set to true if authentication is required
        },
      },
    ],
  };
  