export interface Output {
  data?: number[];
}

export type ScriptStatusType = "running" | "stopped" | "success" | "failed";

export interface ScriptStatus {
  /** The script this socket is running */
  script: string;
  /** The status of the script execution */
  status: ScriptStatusType;
  /** A message related to the status, on success or failure */
  message?: string;
  /** Console output during script execution */
  output?: Output;
}
