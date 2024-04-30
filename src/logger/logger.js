const { createLogger, transports, format } = require('winston');

class Logger {
    constructor() {
        this.logger = createLogger({
            level: 'info',
            format: format.combine(
                format.colorize({ all: true }), // Enable colorization for all log levels
                format.printf(({ level, message }) => `${level}: ${message}`)
            ),
            transports: [
                new transports.Console()
            ]
        });

        // Define colors for different log levels
        this.colors = {
            info: '\x1b[32m', // Green for info
            warn: '\x1b[33m', // Yellow for warn
            error: '\x1b[31m', // Red for error
            debug: '\x1b[36m' // Cyan for debug
        };
    }

    info(message) {
        this.log('info', message);
    }

    warn(message) {
        this.log('warn', message);
    }

    error(message) {
        this.log('error', message);
    }

    debug(message) {
        this.log('debug', message);
    }

    log(level, message) {
        const color = this.colors[level] || '\x1b[0m';
        console.log(`${color}${level}: ${message}\x1b[0m`);
    }
}

module.exports = Logger;
