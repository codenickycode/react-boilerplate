import { Output, ProcessRecord } from "./script-server.types";

export function runningMessage(
  script: string,
  processes: ProcessRecord,
  data?: Output
) {
  return JSON.stringify({
    script,
    status: "running",
    output: data,
    numberOfRunningProcesses: Object.values(processes).length,
  });
}

export function successMessage(script: string, processes: ProcessRecord) {
  return JSON.stringify({
    script,
    status: "success",
    message: "Success!",
    numberOfRunningProcesses: Object.values(processes).length,
  });
}

export function cancelledMessage(script: string, processes: ProcessRecord) {
  return JSON.stringify({
    script,
    status: "cancelled",
    message: "cancelled",
    numberOfRunningProcesses: Object.values(processes).length,
  });
}

export function failedMessage(
  script: string,
  processes: ProcessRecord,
  code: number
) {
  return JSON.stringify({
    script,
    status: "failed",
    message: "Code: " + code,
    numberOfRunningProcesses: Object.values(processes).length,
  });
}
