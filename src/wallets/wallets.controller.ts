import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Post()
  add(@Body() createWalletDto: CreateWalletDto) {
    return this.walletsService.add(createWalletDto);
  }

  @Get()
  findAll() {
    return this.walletsService.findAll();
  }

  @Get(':address')
  findOne(@Param('address') address: string) {
    return this.walletsService.findOne(address);
  }

  @Patch(':address')
  update(@Param('address') address: string, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletsService.update(address, updateWalletDto);
  }

  @Delete(':address')
  remove(@Param('address') address: string) {
    return this.walletsService.remove(address);
  }
}
