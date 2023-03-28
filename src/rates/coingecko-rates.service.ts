import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { IRatesService, Rate } from './rates.service.interface';

@Injectable()
export class CoinGeckoRatesService implements IRatesService {
  constructor(private readonly httpService: HttpService) {}

  async getRates(): Promise<Rate> {
    const baseUrl = process.env.COINGECKO_URL ?? ''
    if (!baseUrl)
      return undefined
    const response = await firstValueFrom(this.httpService.get(`${baseUrl}/simple/price?ids=ethereum&vs_currencies=USD,EUR`))
    return response.data;
  }
}