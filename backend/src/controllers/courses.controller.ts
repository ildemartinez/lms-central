import { Controller, Param, Get } from '@nestjs/common';
import { CoursesService } from 'src/services/courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get(':id')
  async getLMSCourses(@Param('id') id: number) {
    return this.coursesService.getCourses(id);
  }
}
