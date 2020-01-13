import { App } from '../models/app.interface';
import { HostsService } from './hosts.service';

export class AppsService {
  private hostsService = new HostsService();

  getTopAppsByHost(hostname: string, apps: App[]): App[] {
    const hosts = this.hostsService.indexAppsByHost(apps);
    const host = hosts.find(host => host.hostname === hostname);
    return host ? host.apps.slice(0, 25) : [];
  }

  addAppsToHosts(hostname: string, apps: App[]): void {

  }

  removeAppsFromHosts(hostname: string, apps: App[]): void {

  }
}
