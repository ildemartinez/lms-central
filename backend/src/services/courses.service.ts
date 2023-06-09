import { Injectable } from '@nestjs/common';
import { NetworkService } from './network.service';

@Injectable()
export class CoursesService {
  constructor(private readonly networkService: NetworkService) {}

  getCourses(uid: number) {
    return this.networkService.getCourses(uid);
  }

  getCategories(uid: number) {
    return this.networkService.getCategories(uid);
  }

  getlms() {
    return this.networkService.getLMSS();
  }
}
