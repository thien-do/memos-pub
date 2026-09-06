"use server";

import {
  ConnectCheckInput as Input,
  ConnectCheckInputReason as InputReason,
  parseConnectCheckInput as parseInput,
} from "./input";
import {
  type ConnectCheckRecordReason as RecordReason,
  ensureConnectCheckRecord as ensureRecord,
} from "./record";
import {
  ConnectCheckSetupReason as SetupReason,
  getConnectCheckSetup as getSetup,
} from "./setup";

export type ConnectCheckResult =
  | { step: "input"; reason: InputReason }
  | { step: "record"; reason: RecordReason }
  | { step: "setup"; reason: SetupReason }
  // Input here actually means Output, after all verification and setup.
  | ({ step: "success" } & Input);

export async function checkConnectAction(
  _prev: ConnectCheckResult | undefined,
  data: FormData,
): Promise<ConnectCheckResult> {
  const input = parseInput(data);
  if (!input.ok) return { step: "input", reason: input.reason };

  // Register before checking DNS so we can return all required records at once.
  // This has an intentional cost of consuming the project real domain slot.
  const record = await ensureRecord(input.hostname);
  if (!record.ok) return { step: "record", reason: record.reason };

  const setup = await getSetup({ input, record: record.detail });
  if (!setup.ok) return { step: "setup", reason: setup.reason };

  const { hostname, path } = setup;
  return { step: "success", hostname, path };
}
