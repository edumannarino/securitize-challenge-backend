import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { IBlockchainService } from './blockchain.service.interface';

@Injectable()
export class EtherscanBlockchainService implements IBlockchainService {
  constructor(private readonly httpService: HttpService) {}
  private baseUrl = process.env.ETHERSCAN_URL ?? ''
  private API_Key = process.env.ETHERSCAN_API_KEY ?? ''
  
  async getFirstTransactionTimestamp(address: string): Promise<number> {
    if (!this.baseUrl)
      return undefined

    // This is a Patch for using Etherscan Free API Key that allows up to 5 call per second.
    // So if any response returns "Max rate limit reached", wait for 1 seconds and retry
    // Obviously it's a degradation of performance, but it's the only solution under this circumstances.
    // Ideally get the plan that supports the current load, or implement another service without this limitations. 
    while (true) {
      const response = await firstValueFrom(
        this.httpService.get(
          `${this.baseUrl}/api?module=account&action=txlist&address=${address}&page=1&offset=1&sort=asc&apikey=${this.API_Key}`
        )
      )
      const result = response.data?.result
      if (result !== 'Max rate limit reached') 
        return result[0]?.timeStamp
      await this.delay(1000)
    }
  }

  async getBalance(address: string): Promise<number> {
    if (!this.baseUrl)
      return undefined

    // This is a Patch for using Etherscan Free API Key that allows up to 5 call per second.
    // So if any response returns "Max rate limit reached", wait for 1 seconds and retry
    // Obviously it's a degradation of performance, but it's the only solution under this circumstances.
    // Ideally get the plan that supports the current load, or implement another service without this limitations. 
    while (true) {
      const response = await firstValueFrom(
        this.httpService.get(
          `${this.baseUrl}/api?module=account&action=balance&address=${address}&tag=latest&apikey=${this.API_Key}`
        )
      )
      const result = response.data?.result
      if (result !== 'Max rate limit reached') 
        return result
      await this.delay(1000)      
    }
  }

  private delay(milliseconds: number) {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
}