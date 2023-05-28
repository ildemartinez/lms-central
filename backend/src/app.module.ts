import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { CoursesController } from './controllers/courses.controller';
import { NetworkService } from './services/network.service';
import { CoursesService } from 'src/services/courses.service';
import { HttpModule } from '@nestjs/axios';
import { CourseController } from './controllers/course.controller';
import { CategoriesController } from './controllers/categories.controller';

@Module({
  imports: [HttpModule],
  controllers: [
    AppController,
    CoursesController,
    CourseController,
    CategoriesController,
  ],
  providers: [AppService, NetworkService, CoursesService],
})
export class AppModule {}
