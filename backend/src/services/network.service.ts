import { Injectable, NotFoundException } from '@nestjs/common';
import { LMS } from '../dto/class_lms';
import { LMSDto, CourseDto, LMSBasicDto } from '../dto/lms.dto';
import { HttpService } from '@nestjs/axios/dist';
import { EMPTY, Observable, empty, forkJoin, throwError } from 'rxjs';
import axios, { AxiosResponse } from 'axios';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { EMPTY_OBSERVER } from 'rxjs/internal/Subscriber';

@Injectable()
export class NetworkService {
  private fLMSS: LMSDto[] = [];

  constructor(private readonly httpService: HttpService) {}

  addLMS(
    id: number,
    name: string,
    url: string,
    user: string,
    password: string,
    service: string,
    autoconnect: boolean,
  ) {
    let aLMS = new LMS(id, name, url, user, password, service, autoconnect);
    this.fLMSS.push(aLMS);
  }

  storeCategory(LMSid: number, category: any) {
    this.fLMSS[LMSid].name = 'dd';
    console.log(category.id);
  }

  storeCourse(LMSid: number, course: any) {
    console.log(course.id);
  }

  connectLMSNetwork() {
    this.fLMSS.forEach(function (aLMS) {
      if (!aLMS.connected) {
        aLMS.connect();
      }
    });
  }

  async getLMSS(): Promise<LMSBasicDto[]> {
    return this.fLMSS.map((res) => {
      return {
        connected: res.connected,
        id: res.id,
        name: res.name,
        url: res.url,
        autoconnect: res.autoconnect,
      };
    });
  }

  async getCourses(uid: number): Promise<any> {
    if (uid < this.fLMSS.length && this.fLMSS[uid].connected == true) {
      const myFetch = `${this.fLMSS[uid].url}/webservice/rest/server.php?wstoken=${this.fLMSS[uid].token}&moodlewsrestformat=json&wsfunction=core_course_get_courses`;

      return this.httpService.get(myFetch).pipe(map((res) => res.data));
    } else throw new NotFoundException(`LMS with ID ${uid} not found`);
  }

  async getCategories(uid: number): Promise<any> {
    if (uid < this.fLMSS.length && this.fLMSS[uid].connected == true) {
      const myFetch2 = `${this.fLMSS[uid].url}/webservice/rest/server.php?wstoken=${this.fLMSS[uid].token}&moodlewsrestformat=json&wsfunction=core_course_get_categories`;

      return this.httpService.get(myFetch2).pipe(map((res) => res.data));
    } else throw new NotFoundException(`LMS with ID ${uid} not found`);
  }
}
