import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from '../../services/app.service';
import { NETWORK_CRUD } from '../../consts';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiTags(NETWORK_CRUD)
  @ApiOperation({ summary: 'List of LMSS' })
  @ApiResponse({
    status: 200,
    description: 'Returns the LMSS list of the network',
  })
  async getLMSS() {
    return await this.appService.getLMSS();
  }
}
