import { z } from "zod";

export const ScriptRunnerMessageZ = z.object({
  command: z.union([z.literal("start"), z.literal("stop")]),
  script: z.string(),
});
export type ScriptRunnerMessage = z.infer<typeof ScriptRunnerMessageZ>;

export interface Output {
  data?: number[];
}

export type ScriptStatusType = "running" | "cancelled" | "success" | "failed";

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
