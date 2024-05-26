import { Response } from 'express';

/**
 * Receives a body and returns an HTTP response with the given body and status code 200.
 */
export function ok<T extends object>(res: Response, body: T): Response {
  return res.status(200).json(body);
}

/**
 * Receives a body and returns an HTTP response with the given body and status code 400.
 */
export function badRequest<T extends object>(res: Response, body: T): Response {
  return res.status(400).json(body);
}

/**
 * Receives a body and returns an HTTP response with the given body and status code 401.
 */
export function unauthorized<T extends object>(res: Response, body: T): Response {
  return res.status(401).json(body);
}
