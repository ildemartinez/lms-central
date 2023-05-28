import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { NETWORK_CRUD } from '../consts';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { CoursesService } from 'src/services/courses.service';
import {
  EMPTY,
  map,
  mergeMap,
  switchMap,
  tap,
  Observable,
  of,
  concat,
  reduce,
} from 'rxjs';
import { LMSBasicDto, LMSDto } from 'src/dto/lms.dto';

@Controller()
export class AppController {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly appService: AppService,
  ) {}

  @Get()
  @ApiTags(NETWORK_CRUD)
  @ApiOperation({ summary: 'List of LMSS' })
  @ApiResponse({
    status: 200,
    description: 'Returns the LMSS list of the network',
  })
  async getLMSS(): Promise<LMSBasicDto[]> {
    return this.appService.getLMSS();
  }
}
