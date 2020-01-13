import { App } from '../models/app.interface';
import { Host } from '@board/models/host.interface';

export class HostsService {
  indexAppsByHost(apps: App[]): Host[] {
    // Index hosts by id
    const hosts = apps.reduce<Record<string, Host>>((hosts, app) => {
      app.host.forEach(hostname => this.pushAppIntoHost(hosts, hostname, app));
      return hosts;
    }, {});

    // Sort apps based on apdex for each host
    return Object.values(hosts).map(host => ({
      ...host,
      apps: host.apps.sort((a, b) => b.apdex - a.apdex)
    }));
  }

  private pushAppIntoHost(hosts: Record<string, Host>, hostname: string, app: App): void {
    hosts[hostname] = hosts[hostname] || {
      hostname: hostname,
      apps: []
    } as Host;
    hosts[hostname].apps.push(app);
  }
}
