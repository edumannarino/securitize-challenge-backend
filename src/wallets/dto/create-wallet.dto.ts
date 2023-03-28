import { IsEthereumAddress } from "class-validator"

export class CreateWalletDto {
  @IsEthereumAddress()
  address: string
  
  favourite: boolean

  ethEur: number
  
  ethUsd: number
}
