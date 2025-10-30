import { NextMiddleware } from 'next/server';

export type MiddlewareFactory = (
  nextMiddleware: NextMiddleware
) => NextMiddleware;
