import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Wallet } from './entities/wallet.entity';
import { MONGO_WALLETS_REPOSITORY, IWalletsRepository } from './wallets.repository.interface'
import { ETHERSCAN_API, IBlockchainService } from '../blockchain/blockchain.service.interface'
import { IRatesService } from 'src/rates/rates.service.interface';

@Injectable()
export class WalletsService {

  constructor(
    @Inject(MONGO_WALLETS_REPOSITORY) private readonly walletsRepository: IWalletsRepository,
    @Inject(ETHERSCAN_API) private readonly apiService: IBlockchainService,
    @Inject(ETHERSCAN_API) private readonly rateService: IRatesService,
  ) {}

  async add(createWalletDto: CreateWalletDto): Promise<Wallet> {
    try {
      const existingWallet = await this.walletsRepository.findOne(createWalletDto.address);
      if (existingWallet)
        throw new ConflictException("Wallet Already Exists!")
    } catch(error: any) {
      if (error.status !== 404)
        throw error
    }
    const wallet = await this.walletsRepository.add(createWalletDto);
    return this.completeInfo(wallet)
  }

  async findAll(): Promise<Wallet[]> {
    const wallets = await this.walletsRepository.findAll();
    return await Promise.all(wallets.map(async (wallet) => await this.completeInfo(wallet)))
  }

  async findOne(address: string): Promise<Wallet> {
    const wallet = await this.walletsRepository.findOne(address);
    return this.completeInfo(wallet)
    
  }

  async update(address: string, updateWalletDto: UpdateWalletDto): Promise<Wallet> {
    const wallet = await this.walletsRepository.update(address, updateWalletDto);
    return this.completeInfo(wallet)

  }

  async remove(address: string): Promise<void> {
    this.walletsRepository.remove(address);
  }

  private async completeInfo(wallet: Wallet): Promise<Wallet> {
    const completeWallet = new Wallet()
    completeWallet.address = wallet.address
    completeWallet.favourite = wallet.favourite
    
    completeWallet.ethEur = wallet.ethEur
    completeWallet.ethUsd = wallet.ethUsd
    
    const isOldPromise = this.getIsOld(wallet.address)
    const balancePromise = this.getBalance(wallet.address)
    const [isOld, balance] = await Promise.all([isOldPromise, balancePromise])
    completeWallet.isOld = isOld
    completeWallet.balance = balance

    return completeWallet
  }

  private async getIsOld(address: string): Promise<boolean> {
    const firstTransactionTimestamp = await this.apiService.getFirstTransactionTimestamp(address)
    const oneYearAgoTimestamp = (new Date()).getTime() - (365 * 24 * 60 * 60 * 1000)
    return (firstTransactionTimestamp ?? 0) * 1000 < oneYearAgoTimestamp
  }

  private async getBalance(address: string): Promise<number> {
    return this.apiService.getBalance(address)
  }
}
