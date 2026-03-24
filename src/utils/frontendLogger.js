// utils/frontendLogger.js - Client-side Logging Utility
class FrontendLogger {
  constructor() {
    this.logs = [];
    this.maxLogs = 100;
  }

  // Log to localStorage and console
  log(level, message, data = {}) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      data,
    };

    // Store in memory
    this.logs.push(logEntry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift(); // Remove oldest log
    }

    // Also log to localStorage (limited to 50KB)
    this.saveToLocalStorage(logEntry);

    // Log to console with styling
    this.logToConsole(level, message, data);
  }

  info(message, data = {}) {
    this.log('INFO', message, data);
  }

  warn(message, data = {}) {
    this.log('WARN', message, data);
  }

  error(message, data = {}) {
    this.log('ERROR', message, data);
  }

  debug(message, data = {}) {
    if (process.env.NODE_ENV === 'development') {
      this.log('DEBUG', message, data);
    }
  }

  // Log API calls
  logApiCall(method, endpoint, status, duration) {
    this.info(`API: ${method} ${endpoint}`, { status, duration: `${duration}ms` });
  }

  // Log user action
  logUserAction(action, details = {}) {
    this.info(`USER ACTION: ${action}`, details);
  }

  // Log auth event
  logAuthEvent(event, details = {}) {
    this.info(`AUTH: ${event}`, details);
  }

  // Log error
  logError(errorType, error, context = {}) {
    this.error(`${errorType}: ${error.message}`, {
      errorType,
      message: error.message,
      stack: error.stack,
      ...context,
    });
  }

  // Save to localStorage
  saveToLocalStorage(logEntry) {
    try {
      const logs = JSON.parse(localStorage.getItem('appLogs') || '[]');
      logs.push(logEntry);
      
      // Keep only last 50 logs in localStorage
      if (logs.length > 50) {
        logs.shift();
      }
      
      localStorage.setItem('appLogs', JSON.stringify(logs));
    } catch (e) {
      console.error('Failed to save logs to localStorage', e);
    }
  }

  // Log to console with colors
  logToConsole(level, message, data) {
    const timestamp = new Date().toLocaleTimeString();
    const styles = {
      INFO: 'color: #0066cc; font-weight: bold;',
      WARN: 'color: #ff9900; font-weight: bold;',
      ERROR: 'color: #cc0000; font-weight: bold;',
      DEBUG: 'color: #666666; font-weight: bold;',
    };

    console.log(
      `%c[${timestamp}] ${level}`,
      styles[level] || '',
      message,
      data
    );
  }

  // Get all logs
  getLogs() {
    return this.logs;
  }

  // Get logs from localStorage
  getStoredLogs() {
    try {
      return JSON.parse(localStorage.getItem('appLogs') || '[]');
    } catch (e) {
      return [];
    }
  }

  // Clear logs
  clearLogs() {
    this.logs = [];
    localStorage.removeItem('appLogs');
    this.info('Logs cleared');
  }

  // Export logs as file
  exportLogs() {
    const logs = this.getStoredLogs();
    const dataStr = JSON.stringify(logs, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `storyshare-logs-${new Date().toISOString()}.json`;
    link.click();
    this.info('Logs exported');
  }
}

// Create singleton instance
const logger = new FrontendLogger();

export default logger;
