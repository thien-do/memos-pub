import type { ConnectCheckCleanReason } from "./clean";
import type { ConnectCheckEnsureReason } from "./ensure";

export interface ConnectCheckResultRecord {
  type: string;
  name: string;
  value: string | null;
}

export type ConnectCheckResult =
  | { type: "clean"; reason: ConnectCheckCleanReason }
  | { type: "ensure"; reason: ConnectCheckEnsureReason }
  | { type: "setup"; records: ConnectCheckResultRecord[] }
  | { type: "success"; path: string };
