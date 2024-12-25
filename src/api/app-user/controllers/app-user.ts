/**
 * app-user controller
 */

import { factories } from '@strapi/strapi';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export default factories.createCoreController('api::app-user.app-user', ({ strapi }) => ({
  async login(ctx) {
    const { username, password } = ctx.request.body;

    // Validate input
    if (!username || !password) {
      return ctx.badRequest('Username and password are required.');
    }

    try {
      // Find the user by username
      const [user] = await strapi.entityService.findMany('api::app-user.app-user', {
        filters: { username },
        limit: 1,
      });

      if (!user) {
        return ctx.badRequest('Invalid username or password.');
      }

      // Validate password
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return ctx.badRequest('Invalid username or password.');
      }

      // Generate JWT
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          email: user.email,
        },
        strapi.config.get('plugin.users-permissions.jwtSecret'),
        { expiresIn: '7d' } // Adjust expiration as needed
      );

      // Respond with token and user data
      return ctx.send({
        jwt: token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      ctx.internalServerError('An error occurred during login.');
    }
  },
}));
