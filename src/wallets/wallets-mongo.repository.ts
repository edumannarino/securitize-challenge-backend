import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateWalletDto } from "./dto/create-wallet.dto";
import { UpdateWalletDto } from "./dto/update-wallet.dto";
import { Wallet } from "./entities/wallet.entity";
import { WalletModel } from "./schemas/wallet.schema";
import { IWalletsRepository } from "./wallets.repository.interface";

@Injectable()
export class MongoWalletsRepository implements IWalletsRepository {
  constructor(@InjectModel(Wallet.name) private readonly walletModel: WalletModel) {}

  async add(createWalletDto: CreateWalletDto): Promise<Wallet> {
    const wallet = await new this.walletModel(createWalletDto).save()
    return wallet  
  }

  async findAll(): Promise<Wallet[]> {
    const wallets = await this.walletModel.find();
    return wallets
  }

  async findOne(address: string): Promise<Wallet> {
    const wallet = await this.walletModel.findOne({ address });
    if (!wallet)
      throw new NotFoundException(`Wallet #${address} not found`)
    return wallet
  }  

  async update(address: string, updateWalletDto: UpdateWalletDto): Promise<Wallet> {
    const wallet = await this.walletModel.findOneAndUpdate({ address }, updateWalletDto, {new: true})
    if (!wallet)
      throw new NotFoundException(`Wallet #${address} not found`)
    return wallet  
  }

  async remove(address: string): Promise<void> {
    await this.walletModel.findOneAndRemove({ address })
  }


}