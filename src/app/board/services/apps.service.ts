import { App } from '../models/app.interface';

export class AppsService {
  async getTopAppsByHost(host: string): Promise<App[]> {
    return [];
  }
}
