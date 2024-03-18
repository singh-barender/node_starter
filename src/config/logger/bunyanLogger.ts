import fs from 'fs';
import path from 'path';
import bunyan from 'bunyan';
import { format } from 'util';

function bunyanLogger(name: string): bunyan {
  const date = new Date();
  const logFileName = format('%s-%s-%s.log', date.getFullYear(), date.getMonth() + 1, date.getDate());
  const logFilePath = path.join('logs', logFileName);

  const logDir = path.dirname(logFilePath);
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  return bunyan.createLogger({
    name,
    streams: [
      {
        level: 'debug', // Logs DEBUG and above to a file
        path: logFilePath,
        type: 'file'
      },
      {
        level: 'info', // Logs INFO and above to stdout
        stream: process.stdout
      }
    ],
    src: true, // Include the source file and line number in log entries
    hostname: 'localhost', // Replace 'your-hostname' with your actual hostname
    pid: process.pid // Include the process ID in log entries
  });
}

export default bunyanLogger;
