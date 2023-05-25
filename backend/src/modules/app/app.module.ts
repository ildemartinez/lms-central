import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from '../../services/app.service';
import { CoursesController } from '../courses/courses.controller';
import { NetworkService } from '../../services/network.service';
import { CoursesService } from 'src/services/courses.service';
import { HttpModule } from '@nestjs/axios';
import { CourseController } from '../course/course.controller';

@Module({
  imports: [HttpModule],
  controllers: [AppController, CoursesController, CourseController],
  providers: [AppService, NetworkService, CoursesService],
})
export class AppModule {}
