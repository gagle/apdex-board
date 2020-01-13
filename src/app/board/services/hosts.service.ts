import { App } from '../models/app.interface';
import { Host } from '@board/models/host.interface';

export class HostsService {
  indexAppsByHost(apps: App[]): Host[] {
      /*apps = [{
        name: 'name',
        contributors: ['contributor1', 'contributor2'],
        version: 2,
        apdex: 5,
        host: ['host1', 'host2']
      }, {
        name: 'name',
        contributors: ['contributor1', 'contributor2'],
        version: 2,
        apdex: 10,
        host: ['host1', 'host2']
      },
      {
        name: 'name',
        contributors: ['contributor1', 'contributor2'],
        version: 2,
        apdex: 15,
        host: ['host1', 'host2']
      }, {
        name: 'name',
        contributors: ['contributor1', 'contributor2'],
        version: 2,
        apdex: 20,
        host: ['host1', 'host2']
      }, {
        name: 'name',
        contributors: ['contributor1', 'contributor2'],
        version: 2,
        apdex: 25,
        host: ['host1', 'host2']
      }, {
        name: 'name',
        contributors: ['contributor1', 'contributor2'],
        version: 2,
        apdex: 30,
        host: ['host1', 'host2']
      }]*/
    // Index hosts by id
    const hosts = apps.reduce<Record<string, Host>>((hosts, app) => {
      app.host.forEach(hostId => this.pushAppIntoHost(hosts, hostId, app));
      return hosts;
    }, {});

    // Sort apps based on apdex for each host
    return Object.values(hosts).map(host => ({
      ...host,
      apps: host.apps.sort((a, b) => b.apdex - a.apdex)
    }));
  }

  private pushAppIntoHost(hosts: Record<string, Host>, hostId: string, app: App): void {
    hosts[hostId] = hosts[hostId] || {
      id: hostId,
      apps: []
    } as Host;
    hosts[hostId].apps.push(app);
  }
}
