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

  async register(ctx) {
    const { username, email, password, phone } = ctx.request.body;

    // Validate input
    if (!username || !email || !password) {
      return ctx.badRequest('All fields (username, email, password) are required.');
    }

    try {
      // Check if email is already registered
      const existingUser = await strapi.entityService.findMany('api::app-user.app-user', {
        filters: { email },
        limit: 1,
      });

      if (existingUser.length > 0) {
        return ctx.badRequest('Email is already registered.');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const newUser = await strapi.entityService.create('api::app-user.app-user', {
        data: {
          username,
          email,
          password: hashedPassword,
          phone,
        },
      });

      // Respond with created user data
      return ctx.send({
        message: 'User registered successfully.',
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
        },
      });
    } catch (error) {
      ctx.internalServerError('An error occurred during registration.');
    }
  },
}));
