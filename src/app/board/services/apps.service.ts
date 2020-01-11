import { App } from '../models/app.interface';

export class AppsService {
  private readonly apiUrl = 'http://localhost:3100';

  async getTopAppsByHost(host: string): Promise<App[]> {
    return [];
  }

  async getAllApps(): Promise<App[]> {
    const response = await fetch(this.apiUrl);
    return await response.json();
  }
}
