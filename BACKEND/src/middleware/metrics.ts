import { Request, Response, NextFunction } from "express";
import promClient from "prom-client"

const register = new promClient.Registry();
promClient.collectDefaultMetrics({ register });

const httpRequestDurationMicroseconds = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10]
});
register.registerMetric(httpRequestDurationMicroseconds);

const metricsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const end = httpRequestDurationMicroseconds.startTimer();

  res.on('finish', () => {
    end({
      method: req.method,
      route: req.path,
      status_code: res.statusCode
    });
  });
  next();
};

const metricsRouteHandler = async (req: Request, res: Response): Promise<any> => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
};

export { metricsMiddleware, metricsRouteHandler, register };