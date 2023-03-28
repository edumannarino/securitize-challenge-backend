import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { WalletsModule } from './wallets/wallets.module';
import { BlockchainModule } from './blockchain/blockchain.module';
import { RatesModule } from './rates/rates.module';

@Module({
  imports: [
    WalletsModule,
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const mongoConfig = configService.get('MONGO_URI')
        return {
          uri: mongoConfig
        }
      },
    }),
    BlockchainModule,
    RatesModule
  ]
})
export class AppModule {}
