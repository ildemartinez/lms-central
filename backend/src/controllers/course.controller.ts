import { Controller, Param, Get } from '@nestjs/common';
import { CoursesService } from 'src/services/courses.service';

@Controller('courses/:id/course')
export class CourseController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get(':id')
  getLMSCourses(@Param('id') id: number) {}
}
