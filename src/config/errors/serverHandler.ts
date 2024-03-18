import http from 'http';
import Logger from 'bunyan';
import bunyanLogger from '@root/config/logger/bunyanLogger';

const log: Logger = bunyanLogger('server-error-handler');

export function handleUncaughtErrors(server: http.Server): void {
  process.on('uncaughtException', (error: Error) => {
    log.error('There was an uncaught error:', error);
    gracefulShutdown(server, 1);
  });

  process.on('unhandledRejection', (reason: Error) => {
    log.error('Unhandled rejection at promise:', reason);
    gracefulShutdown(server, 2);
  });
}

export function handleShutdownSignals(server: http.Server): void {
  process.on('SIGINT', () => {
    log.error('Received SIGINT.');
    gracefulShutdown(server);
  });

  process.on('SIGTERM', () => {
    log.error('Received SIGTERM.');
    gracefulShutdown(server);
  });
}

function gracefulShutdown(server: http.Server, exitCode = 0): void {
  log.error('Shutting down server gracefully.');
  server.close(() => {
    log.error('Server closed');
    process.exit(exitCode);
  });
}
