
import { IPayload } from "../web3/types";


// payment-provider.interface.ts
export interface PaymentProvider {
  /**
   * Initialize a transaction
   */
  initializePayment(payload: InitPayment): Promise<{
    paymentUrl: string;
    reference: string;
  }>;

  /**
   * Verify a transaction
   */
  verifyPayment(reference: string): Promise<{
    status?: string; //"success" | "failed" | "pending";
    amount?: number;
    currency?: string;
    provider?: string;
    metadata?: Record<string, unknown>;
  }>;

  /**
   * Refund a transaction
   */
  refundPayment(paystack: InitRefund): Promise<{
    status: string; // "success" | "failed";
    refundId: string;
  }>;
}

// init payment argument
export interface InitPayment {
  name?: string;
  description?: string;
  email: string;
  reference: string;
  amount: number;
  callback_url?: string;
  cancel_url?: string;
  plan?: string;
  currency?: "NGN" | "USD";
  metadata?: Record<string, unknown>;
}

export interface InitRefund {
  transaction: string;
  amount?: number;
  currency?: "NGN" | "USD" | "GHS" | "ZAR" | "KES";
  customer_note?: string;
  merchant_note?: string;
}


export interface InitGetNIPAccount extends IPayload {
  accountNumber: string;
  beneficiaryBank: string;
  userName: string;
  password: string;
}


export interface GetNIPAccountResponse {
  bankCode: string;
  accountName: string;
  transactionReference: string;
  bvn: string;
  responseMessage: string;
  accountNumber: string;
  responseCode: string;
}


export interface NIPFundTransferRequest extends IPayload {
  beneficiaryAccountName: string;
  transactionAmount: string;
  currencyCode: string;
  narration: string;
  sourceAccountName: string;
  beneficiaryAccountNumber: string;
  beneficiaryBank: string;
  transactionReference: string;
  userName: string;
  password: string;
}

export interface NIPFundTransferResponse {
  transactionReference: string;
  sessionId: string;
  responseMessage: string;
  responseCode: string;
}


export interface GetNIPTransactionStatusRequest extends IPayload {
  transactionReference: string;
  userName: string;
  password: string;
}

export interface GetNIPTransactionStatusResponse {
  amount: string;
  recipientBankCode: string;
  recipientAccountNumber: string;
  transactionReference: string;
  transactionDateTime: string;
  currency: string;
  responseMessage: string;
  responseCode: string;
}


interface Bank {
  bankCode: string;
  bankName: string;
}

export interface ProvidusBankListResponse {
  banks: Bank[];
  responseMessage: string;
  responseCode: string;
}


export interface FundTransferRequest extends IPayload {
  creditAccount: string;
  debitAccount: string;
  transactionAmount: string;
  currencyCode: string;
  narration: string;
  transactionReference: string;
  userName: string;
  password: string;
}

export interface FundTransferResponse {
  amount: string;
  transactionReference: string;
  currency: string;
  responseMessage: string;
  responseCode: string;
}


export interface GetProvidusTransactionStatusRequest extends IPayload {
  transactionReference: string;
  userName: string;
  password: string;
}

export interface GetProvidusTransactionStatusResponse {
  amount: string;
  creditAccount: string;
  debitAccount: string;
  transactionReference: string;
  transactionDateTime: string;
  currency: string;
  responseMessage: string;
  responseCode: string;
}


export interface GetProvidusAccountRequest extends IPayload {
  accountNumber: string;
  userName: string;
  password: string;
}

export interface GetProvidusAccountResponse {
  accountStatus: string;
  emailAddress: string;
  phoneNumber: string;
  accountName: string;
  bvn: string;
  accountNumber: string;
  cbaCustomerID: string;
  responseMessage: string;
  availableBalance: string;
  responseCode: string;
}


export interface NIPFundTransferMultipleDebitAccountsRequest extends IPayload {
  beneficiaryAccountName: string;
  transactionAmount: string;
  currencyCode: string;
  narration: string;
  debitAccount: string;
  sourceAccountName: string;
  beneficiaryAccountNumber: string;
  beneficiaryBank: string;
  transactionReference: string;
  userName: string;
  password: string;
}

export interface NIPFundTransferMultipleDebitAccountsResponse {
  transactionReference: string;
  responseMessage: string;
  responseCode: string;
}
