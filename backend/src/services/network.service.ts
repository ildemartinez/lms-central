import { Injectable } from '@nestjs/common';
import { LMS } from '../dto/class_lms';
import { LMSDto, CourseDto, LMSBasicDto } from '../dto/lms.dto';
import { HttpService } from '@nestjs/axios/dist';
import { EMPTY, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs/operators';

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
  ) {
    let aLMS = new LMS(id, name, url, user, password, service);
    this.fLMSS.push(aLMS);
  }

  connectLMSNetwork() {
    this.fLMSS.forEach(function (aLMS) {
      if (!aLMS.connected) {
        aLMS.connect();
      }
    });
  }

  getLMSS(): LMSBasicDto[] {
    return this.fLMSS.map((res) => {
      return {
        connected: res.connected,
        id: res.id,
        name: res.name,
        url: res.url,
      };
    });
  }

  getCourses(uid: number): Observable<CourseDto[]> {
    if (uid < this.fLMSS.length && this.fLMSS[uid].connected == true) {
      const myFetch = `${this.fLMSS[uid].url}/webservice/rest/server.php?wstoken=${this.fLMSS[uid].token}&moodlewsrestformat=json&wsfunction=core_course_get_courses`;

      let result = this.httpService.get(myFetch).pipe(map((res) => res.data));

      return result;
    } else return EMPTY;
  }
}
