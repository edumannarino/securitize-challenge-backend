import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ETHERSCAN_API } from './blockchain.service.interface'
import { EtherscanBlockchainService } from './blockchain-etherscan.service';

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: ETHERSCAN_API,
      useClass: EtherscanBlockchainService
    }
  ],
  exports: [
    {
      provide: ETHERSCAN_API,
      useClass: EtherscanBlockchainService
    }
  ]
})
export class BlockchainModule {}
