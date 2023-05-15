export enum LogLevel {
  error = "error",
  info = "info",
  debug = "debug",
  warn = "warn",
}

export const format = (logLevel: LogLevel, line: string): Object | null => {
  try {
    const splittedData = line.split(" ");
    if (splittedData[2] === logLevel) {
      const result = JSON.parse(splittedData.slice(4).join(" "));

      result["timestamp"] = splittedData[0];
      result["loglevel"] = splittedData[2];

      return result;
    }
  } catch (e) {
    return null;
  }
};
