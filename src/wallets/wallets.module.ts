import { Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Wallet } from './entities/wallet.entity';
import { WalletSchema } from './schemas/wallet.schema';
import { MongoWalletsRepository } from './wallets-mongo.repository';
import { MONGO_WALLETS_REPOSITORY, MEMORY_WALLETS_REPOSITORY } from './wallets.repository.interface';
import { MemoryWalletsRepository } from './wallets-memory.repository';
import { BlockchainModule } from 'src/blockchain/blockchain.module';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Wallet.name, schema: WalletSchema
    }]),
    BlockchainModule
  ],
  controllers: [WalletsController],
  providers: [
    WalletsService,
    {
      provide: MONGO_WALLETS_REPOSITORY,
      useClass: MongoWalletsRepository
    },    
    {
      provide: MEMORY_WALLETS_REPOSITORY,
      useClass: MemoryWalletsRepository
    }    
  ]
})
export class WalletsModule {}
