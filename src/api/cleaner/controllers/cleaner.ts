import { factories } from '@strapi/strapi';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export default factories.createCoreController('api::cleaner.cleaner', ({ strapi }) => ({
  async login(ctx) {
    const { username, password } = ctx.request.body;

    if (!username || !password) {
      return ctx.badRequest('Username and password are required.');
    }

    try {
      const [user] = await strapi.entityService.findMany('api::cleaner.cleaner', {
        filters: { username },
        limit: 1,
      });

      if (!user) {
        return ctx.badRequest('Invalid username or password.');
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return ctx.badRequest('Invalid username or password.');
      }

      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          email: user.email,
        },
        strapi.config.get('plugin.users-permissions.jwtSecret'),
        { expiresIn: '7d' }
      );

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

    if (!username || !email || !password) {
      return ctx.badRequest('All fields (username, email, password) are required.');
    }

    try {
      const existingUser = await strapi.entityService.findMany('api::cleaner.cleaner', {
        filters: { email },
        limit: 1,
      });

      if (existingUser.length > 0) {
        return ctx.badRequest('Email is already registered.');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await strapi.entityService.create('api::cleaner.cleaner', {
        data: {
          username,
          email,
          password: hashedPassword,
          phone,
        },
      });

      return ctx.send({
        message: 'Cleaner registered successfully.',
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
