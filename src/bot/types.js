// @flow
import { BigNumber } from "bignumber.js";
import type Transport from "@ledgerhq/hw-transport";
import type {
  Account,
  AccountBridge,
  Transaction,
  TransactionStatus,
  SignedOperation,
  Operation,
  CryptoCurrency,
  SignOperationEvent,
} from "../types";
import type { DeviceModelId } from "@ledgerhq/devices";
import type { AppCandidate } from "../load/speculos";

export type { AppCandidate };

type DeviceActionEvent = { text: string, x: number, y: number };

export type TransactionTestInput<T> = {
  account: Account,
  accountBeforeTransaction: Account,
  transaction: T,
  status: TransactionStatus,
  optimisticOperation: Operation,
  operation: Operation,
};

export type DeviceActionArg<T, S> = {
  appCandidate: AppCandidate,
  account: Account,
  transaction: T,
  status: TransactionStatus,
  transport: Transport<*> & { button: (string) => void },
  event: DeviceActionEvent,
  state: S,
};

export type DeviceAction<T, S> = (DeviceActionArg<T, S>) => ?S;

export type TransactionArg<T> = {
  appCandidate: AppCandidate,
  account: Account,
  siblings: Account[],
  bridge: AccountBridge<T>,
  maxSpendable: BigNumber,
  createTransaction: (Account) => T,
  // if called, it will "record" intermediary txs to simulate user filling up the form incrementally
  updateTransaction: (tx: T, patch?: $Shape<T>) => T,
};

export type MutationSpec<T: Transaction> = {
  // Name what this mutation is doing
  name: string,
  // The maximum number of times to execute this mutation for a given test run
  maxRun?: number,
  // Express the transaction to be done
  transaction: (arg: TransactionArg<T>) => ?T,
  // if there is a status errors/warnings of the defined transaction, this function, if define, can try to recover from it
  recoverBadTransactionStatus?: ({
    transaction: T,
    status: TransactionStatus,
    account: Account,
    bridge: AccountBridge<T>,
  }) => ?T,
  // Express the device actions to do (buttons,..) and validate the device screen
  deviceAction?: DeviceAction<T, any>,
  // how much time to wait in maximum to reach the final state
  testTimeout?: number,
  // Implement a test that runs after the operation is applied to the account
  test?: (TransactionTestInput<T>) => void,
};

export type AppSpec<T: Transaction> = {
  name: string,
  currency: CryptoCurrency,
  dependency?: string,
  testTimeout?: number,
  appQuery: {
    model?: DeviceModelId,
    appName?: string,
    firmware?: string,
    appVersion?: string,
  },
  mutations: MutationSpec<T>[],
  // can implement generic invariants for a mutation transaction to be possible
  transactionCheck?: (arg: TransactionArg<T>) => void,
  // Implement a test that also runs on each mutation after the operation is applied to the account
  test?: (TransactionTestInput<T>) => void,
};

export type SpecReport<T: Transaction> = {
  spec: AppSpec<T>,
  scanTime?: number,
  accountsBefore?: Account[],
  accountsAfter?: Account[],
  mutations?: MutationReport<T>[],
  fatalError?: Error,
};

export type MutationReport<T: Transaction> = {
  syncAllAccountsTime: number,
  spec: AppSpec<T>,
  appCandidate: AppCandidate,
  account?: Account,
  maxSpendable?: BigNumber,
  unavailableMutationReasons?: Array<{
    error: Error,
    mutation: MutationSpec<T>,
  }>,
  mutation?: MutationSpec<T>,
  destination?: Account,
  transaction?: T,
  transactionTime?: number,
  status?: TransactionStatus,
  statusTime?: number,
  recoveredFromTransactionStatus?: {
    transaction: T,
    status: TransactionStatus,
  },
  latestSignOperationEvent?: SignOperationEvent,
  signedOperation?: SignedOperation,
  signedTime?: number,
  optimisticOperation?: Operation,
  broadcastedTime?: number,
  operation?: Operation,
  confirmedTime?: number,
  finalAccount?: Account,
  testDuration?: number,
  error?: Error,
};
