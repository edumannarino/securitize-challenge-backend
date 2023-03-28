import { Prop, Schema, SchemaFactory} from "@nestjs/mongoose"
import { Document, Model} from 'mongoose'

@Schema()
class Wallet {
  @Prop({ required: true, unique: true })
  address: string

  @Prop()
  favourite: boolean

  @Prop({ default: Date.now() })
  createdAt: Date

  @Prop({ default: Date.now() })
  updatedAt: Date

  @Prop()
  ethEur: number
  
  @Prop()
  ethUsd: number
}

export const WalletSchema = SchemaFactory.createForClass(Wallet)
export type WalletDocument = Document<Wallet>
export type WalletModel = Model<Wallet>