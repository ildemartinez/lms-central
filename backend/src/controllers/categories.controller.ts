import { Controller, Get, Param } from '@nestjs/common';
import { CoursesService } from 'src/services/courses.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get(':id')
  getLMSCourses(@Param('id') id: number) {
    return this.coursesService.getCategories(id);
  }
}
