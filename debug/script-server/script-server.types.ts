import { ChildProcessWithoutNullStreams } from "child_process";
import { z } from "zod";

const CommandZ = z.union([z.literal("start"), z.literal("stop")]);
export type ScriptRunnerCommand = z.infer<typeof CommandZ>;

export const ScriptRunnerMessageZ = z.object({
  command: CommandZ,
  script: z.string(),
});

export const ArgvZ = z.object({
  serverPort: z.number().default(8000),
  clientPort: z.number().default(3000),
});

export interface Output {
  data?: number[];
}

export type ScriptStatusType =
  | "running"
  | "cancelled"
  | "cancelling"
  | "success"
  | "failed"
  | "unknown";

export interface ScriptStatus {
  /** The script this socket is running */
  script: string;
  /** The status of the script execution */
  status: ScriptStatusType;
  /** A message related to the status, on success or failure */
  message?: string;
  /** Console output during script execution */
  output?: Output;
  /** The number of processes running */
  numberOfRunningProcesses: number;
}

export type ProcessRecord = Record<
  string,
  {
    process: ChildProcessWithoutNullStreams;
    cancelling?: boolean;
  }
>;
