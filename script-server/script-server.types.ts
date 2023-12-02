export interface Output {
  data?: number[];
}

export interface ScriptStatus {
  /** The script this socket is running */
  script: string;
  /** The status of the script execution */
  status: "running" | "success" | "failed";
  /** A message related to the status, on success or failure */
  message?: string;
  /** Console output during script execution */
  output?: Output;
}
