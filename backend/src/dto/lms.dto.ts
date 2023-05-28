export interface LMSBasicDto {
  connected: boolean;
  id: number;
  name: string;
  url: string;
  autoconnect: boolean;
}

export interface LMSDto extends LMSBasicDto {
  user: string;
  service: string;
  password: string;
  token: string;

  connect(): boolean;
}

export interface CourseDto {
  id: number;
}
