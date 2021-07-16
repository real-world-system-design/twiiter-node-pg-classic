import { HttpException, HttpStatus, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { decode } from '../utils/jwt.util';

export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.header('authorization').split(' ');
    if (!authHeader)
      throw new HttpException(
        { message: 'authorization failed' },
        HttpStatus.UNAUTHORIZED,
      );
    if (authHeader[0] !== 'Token')
      throw new HttpException(
        { message: 'Token missing' },
        HttpStatus.UNAUTHORIZED,
      );

    try {
      const token = authHeader[1];
      const user = await decode(token);
      if (!user)
        if (authHeader[0] !== 'Token')
          throw new HttpException(
            { message: 'Token missing' },
            HttpStatus.UNAUTHORIZED,
          );
      (req as any).user = user;
      return next();
    } catch (error) {
      throw error;
    }
  }
}
