import { App } from './app.interface';

export interface Host {
  hostname: string;
  apps: App[];
}
