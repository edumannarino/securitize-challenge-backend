import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { RatesController } from './rates.controller';
import { COINGECKO_API } from './rates.service.interface';
import { CoinGeckoRatesService } from './coingecko-rates.service';

@Module({
  imports: [HttpModule],  
  controllers: [RatesController],
  providers: [
    {
      provide: COINGECKO_API,
      useClass: CoinGeckoRatesService
    }
  ]
})
export class RatesModule {}