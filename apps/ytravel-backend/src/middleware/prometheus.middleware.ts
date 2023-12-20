import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { NextFunction } from 'express';
import { Counter } from 'prom-client';

@Injectable()
export class PrometheusMiddleware implements NestMiddleware {
  private static httpRequestsTotal = new Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'code'],
  });

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      PrometheusMiddleware.httpRequestsTotal.inc({
        method: req.method,
        route: req.originalUrl,
        code: res.statusCode,
      });
    });

    next();
  }
}
