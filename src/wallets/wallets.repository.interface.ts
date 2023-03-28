import { CreateWalletDto } from "./dto/create-wallet.dto";
import { UpdateWalletDto } from "./dto/update-wallet.dto";
import { Wallet } from "./entities/wallet.entity";

export interface IWalletsRepository {
  add(wallet: CreateWalletDto): Promise<Wallet>
  findAll(): Promise<Wallet[]>
  findOne(address: string): Promise<Wallet>
  update(address: string, wallet: UpdateWalletDto): Promise<Wallet>
  remove(address: string): Promise<void>
}

export const MONGO_WALLETS_REPOSITORY = 'MongoWalletsRepository'
export const MEMORY_WALLETS_REPOSITORY = 'MemoryWalletsRepository'