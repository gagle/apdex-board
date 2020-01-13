import { App } from '../models/app.interface';
import { Host } from '@board/models/host.interface';
import { HostsIndex } from '@board/models/hosts-index.interface';

export class HostsService {
  createHostsIndex(apps: App[]): HostsIndex {
    return apps.reduce<HostsIndex>((hostsIndex, app) => {
      this.addAppToHosts(app, hostsIndex);
      return hostsIndex;
    }, {});
  }

  // Ordered push
  addAppToHosts(app: App, hostsIndex: HostsIndex): void {
    app.host.forEach(hostname => {
      this.addAppByHostnameIntoHostsIndex(app, hostname, hostsIndex);
    });
  }

  /*removeAppFromHosts(app: App, hostsIndex: HostsIndex): void {

  }*/

  getTopAppsByHost(hostname: string, hostsIndex: HostsIndex): App[] {
    const host = Object.values(hostsIndex).find(host => host.hostname === hostname);
    return host ? host.apps.slice(0, 25) : [];
  }

  private addAppByHostnameIntoHostsIndex(app: App, hostname: string, hostsIndex: HostsIndex): void {
    hostsIndex[hostname] = hostsIndex[hostname] || {
      hostname: hostname,
      apps: []
    } as Host;
    const host = hostsIndex[hostname];
    host.apps.push(app);
    host.apps.sort((a, b) => b.apdex - a.apdex);
  }
}
