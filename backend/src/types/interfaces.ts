export interface ILMS {
  connected: boolean;
  id: string;
  user: string;
  password: string;

  connect(): boolean;
}
