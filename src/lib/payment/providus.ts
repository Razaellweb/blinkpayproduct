import { BaseClient } from "@/lib/web3/base";
import {
  InitGetNIPAccount,
  GetNIPAccountResponse,
  NIPFundTransferRequest,
  NIPFundTransferResponse,
  GetNIPTransactionStatusRequest,
  GetNIPTransactionStatusResponse,
  ProvidusBankListResponse,
  FundTransferRequest,
  FundTransferResponse,
  GetProvidusTransactionStatusRequest,
  GetProvidusTransactionStatusResponse,
  GetProvidusAccountRequest,
  GetProvidusAccountResponse,
  NIPFundTransferMultipleDebitAccountsRequest,
  NIPFundTransferMultipleDebitAccountsResponse,
} from "./interface";
export class Providus extends BaseClient {
  constructor() {
    super({
      debug: process.env.NODE_ENV === "development",
      baseURL: process.env.PROVIDUS_BASE_URL || "",
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async getNIPAccount(payload: InitGetNIPAccount) {
    const response = await this.request<GetNIPAccountResponse>(
      "POST",
      `/GetNIPAccount`,
      { payload }
    );
    return response;
  }

  async nIPFundTransfer(payload: NIPFundTransferRequest) {
    const response = await this.request<NIPFundTransferResponse>(
      "POST",
      `/NIPFundTransfer`,
      { payload }
    );
    return response;
  }

  async getNIPTransactionStatus(payload: GetNIPTransactionStatusRequest) {
    const response = await this.request<GetNIPTransactionStatusResponse>(
      "POST",
      `/GetNIPTransactionStatus`,
      { payload }
    );
    return response;
  }

  async getNIPBanks() {
    const response = await this.request<ProvidusBankListResponse>(
      "GET",
      `/GetNIPBanks`
    );
    return response;
  }

  async providusFundTransfers(payload: FundTransferRequest) {
    const response = await this.request<FundTransferResponse>(
      "POST",
      `/GetNIPTransactionStatus`,
      { payload }
    );
    return response;
  }

  async getProvidusTransactionStatus(
    payload: GetProvidusTransactionStatusRequest
  ) {
    const response = await this.request<GetProvidusTransactionStatusResponse>(
      "POST",
      `/GetProvidusTransactionStatus`,
      { payload }
    );
    return response;
  }

  async getProvidusAccount(payload: GetProvidusAccountRequest) {
    const response = await this.request<GetProvidusAccountResponse>(
      "POST",
      `/GetProvidusAccount`,
      { payload }
    );
    return response;
  }

  async NIPFundTransferMultipleDebitAccounts(
    payload: NIPFundTransferMultipleDebitAccountsRequest
  ) {
    const response =
      await this.request<NIPFundTransferMultipleDebitAccountsResponse>(
        "POST",
        `/NIPFundTransferMultipleDebitAccounts`,
        { payload }
      );
    return response;
  }
}
