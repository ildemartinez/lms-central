import { Controller, Param, Get } from '@nestjs/common';
import { CoursesService } from 'src/services/courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get(':uid')
  async getLMSCourses(@Param('uid') uid) {
    return this.coursesService.getCourses(uid);
  }
}
