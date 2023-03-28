import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateWalletDto } from "./dto/create-wallet.dto";
import { UpdateWalletDto } from "./dto/update-wallet.dto";
import { Wallet } from "./entities/wallet.entity";
import { IWalletsRepository } from "./wallets.repository.interface";

@Injectable()
export class MemoryWalletsRepository implements IWalletsRepository {

  wallets: Wallet[] = []

  async add(createWalletDto: CreateWalletDto): Promise<Wallet> {
    const wallet = new Wallet()
    wallet.address = createWalletDto.address
    wallet.favourite = createWalletDto.favourite
    this.wallets.push(wallet)
    return wallet  
  }

  async findAll(): Promise<Wallet[]> {
    return this.wallets
  }

  async findOne(address: string): Promise<Wallet> {
    const wallet = this.wallets.find((wallet: Wallet) => wallet.address === address)
    return wallet
  }  

  async update(address: string, updateWalletDto: UpdateWalletDto): Promise<Wallet> {
    const walletIndex = this.wallets.findIndex((wallet: Wallet) => wallet.address === address)
    this.wallets[walletIndex].favourite = updateWalletDto.favourite
    return this.wallets[walletIndex]
  }

  async remove(address: string): Promise<void> {
    const walletIndex = this.wallets.findIndex((wallet: Wallet) => wallet.address === address)
    if (walletIndex === -1)
      throw new NotFoundException(`Wallet #${address} not found`);
    this.wallets.splice(walletIndex, 1)
  }


}