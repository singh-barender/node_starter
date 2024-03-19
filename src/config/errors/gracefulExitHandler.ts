import Logger from 'bunyan';

function gracefulExitHandler(log: Logger): void {
  process.on('uncaughtException', (error: Error) => {
    log.error('There was an uncaught error: ', error);
    shutDownProperly(log, 1);
  });

  process.on('unhandledRejection', (reason: Error) => {
    log.error('Unhandled rejection at promise: ', reason);
    shutDownProperly(log, 2);
  });

  process.on('SIGTERM', () => {
    log.error('Caught SIGTERM');
    shutDownProperly(log, 2);
  });

  process.on('SIGINT', () => {
    log.error('Caught SIGINT');
    shutDownProperly(log, 2);
  });

  process.on('exit', () => {
    log.error('Exiting');
  });
}

function shutDownProperly(log: Logger, exitCode: number): void {
  Promise.resolve()
    .then(() => {
      log.info('Shutdown complete');
      process.exit(exitCode);
    })
    .catch((error) => {
      log.error(`Error during shutdown: ${error}`);
      process.exit(1);
    });
}

export default gracefulExitHandler;
