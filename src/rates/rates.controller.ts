import { Controller, Get, Inject } from '@nestjs/common';
import { IRatesService, COINGECKO_API } from './rates.service.interface';

@Controller('rates')
export class RatesController {
  constructor(@Inject(COINGECKO_API) private readonly ratesService: IRatesService) {}

  @Get()
  getRates() {
    return this.ratesService.getRates();
  }
}

