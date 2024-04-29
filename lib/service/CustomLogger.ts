import { ConsoleLogger, LogLevel } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export class CustomLogger extends ConsoleLogger {
  private logStreams: { [level: string]: fs.WriteStream };

  constructor(context?: string, options?: { logDir?: string }) {
    super(context);

    const logDir = options?.logDir ?? 'logs';
    this.logStreams = {};

    // Ensure log directory exists
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    // Initialize log files for each level
    ['log', 'error', 'warn', 'debug', 'verbose'].forEach((level) => {
      this.logStreams[level] = fs.createWriteStream(
        path.join(logDir, `${level}.log`),
        { flags: 'a' },
      );
    });
  }

  log(message: any, context?: string) {
    super.log(message, context);
    this.writeToFile('log', message, context);
  }

  error(message: any, trace?: string, context?: string) {
    super.error(message, trace, context);
    this.writeToFile('error', message, context, trace);
  }

  warn(message: any, context?: string) {
    super.warn(message, context);
    this.writeToFile('warn', message, context);
  }

  debug(message: any, context?: string) {
    super.debug(message, context);
    this.writeToFile('debug', message, context);
  }

  verbose(message: any, context?: string) {
    super.verbose(message, context);
    this.writeToFile('verbose', message, context);
  }

  private writeToFile(
    level: string,
    message: any,
    context?: string,
    trace: string = '',
  ) {
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp} [${level.toUpperCase()}] ${context || ''} ${message} ${trace}\n`;
    this.logStreams[level].write(logEntry);
  }
}
