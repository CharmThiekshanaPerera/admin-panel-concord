/**
 * task router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::task.task', {
  config: {
    find: {
      auth: false, // Public API for GET
    },
    create: {
      auth: false, // Public API for POST
    },
  },
});
