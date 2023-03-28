export interface IBlockchainService {
  getFirstTransactionTimestamp(address: string): Promise<number>;
  getBalance(address: string): Promise<number>;
}

export const ETHERSCAN_API = 'EtherscanAPI'
