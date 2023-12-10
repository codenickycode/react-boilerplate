import { Output } from "./script-server.types";

export function runningMessage(script: string, data?: Output) {
  return JSON.stringify({
    script,
    status: "running",
    output: data,
  });
}

export function successMessage(script: string) {
  return JSON.stringify({
    script,
    status: "success",
    message: "Success!",
  });
}

export function cancelledMessage(script: string) {
  return JSON.stringify({
    script,
    status: "cancelled",
    message: "cancelled",
  });
}

export function failedMessage(script: string, code: number) {
  return JSON.stringify({
    script,
    status: "failed",
    message: "Code: " + code,
  });
}
