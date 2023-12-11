import { Output, ProcessRecord, ScriptStatus } from "./script-server.types";

export function runningMessage(
  script: string,
  processes: ProcessRecord,
  data?: Output
) {
  const scriptStatus: ScriptStatus = {
    script,
    status: processes[script]?.cancelling ? "cancelling" : "running",
    output: data,
    numberOfRunningProcesses: Object.values(processes).length,
  };
  return JSON.stringify(scriptStatus);
}

export function successMessage(script: string, processes: ProcessRecord) {
  const scriptStatus: ScriptStatus = {
    script,
    status: "success",
    message: "Success!",
    numberOfRunningProcesses: Object.values(processes).length,
  };
  return JSON.stringify(scriptStatus);
}

export function cancelledMessage(script: string, processes: ProcessRecord) {
  const scriptStatus: ScriptStatus = {
    script,
    status: "cancelled",
    message: "cancelled",
    numberOfRunningProcesses: Object.values(processes).length,
  };
  return JSON.stringify(scriptStatus);
}

export function failedMessage(
  script: string,
  processes: ProcessRecord,
  code: number
) {
  const scriptStatus: ScriptStatus = {
    script,
    status: "failed",
    message: "Code: " + code,
    numberOfRunningProcesses: Object.values(processes).length,
  };
  return JSON.stringify(scriptStatus);
}
