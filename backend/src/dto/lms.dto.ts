export interface LMSDto {
  connected: boolean;
  id: number;
  name: string;
  url: string;
  user: string;
  service: string;
  password: string;
  token: string;

  connect(): boolean;
}
