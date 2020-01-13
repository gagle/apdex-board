import { HostsService } from './hosts.service';
import { App } from '@board/models/app.interface';
import { HostsIndex } from '@board/models/hosts-index.interface';

describe('HostsService', () => {
  let hostsService: HostsService;

  beforeEach(() => {
    hostsService = new HostsService();
  });

  describe('createHostsIndex', () => {
    it('should return an object indexed by hostname, apps sorted by descending apdex', () => {
      const app1: App = {
        name: 'name1',
        contributors: ['contributor1', 'contributor2'],
        version: 2,
        apdex: 1,
        host: ['host1', 'host3']
      };
      const app2: App = {
        name: 'name2',
        contributors: ['contributor1', 'contributor2'],
        version: 2,
        apdex: 2,
        host: ['host2', 'host1']
      };
      const apps: App[] = [app1, app2];

      const hostsIndex = hostsService.createHostsIndex(apps);

      const expectedHostsIndex: HostsIndex = {
        host1: {
          hostname: 'host1',
          apps: [app2, app1]
        },
        host2: {
          hostname: 'host2',
          apps: [app2]
        },
        host3: {
          hostname: 'host3',
          apps: [app1]
        }
      };

      expect(hostsIndex).toEqual(expectedHostsIndex);
    });
  });

  describe('addAppToHosts', () => {
    it('should add an app (sorted)', () => {
      const app1: App = {
        name: 'name1',
        contributors: ['contributor1', 'contributor2'],
        version: 2,
        apdex: 1,
        host: ['host1']
      };
      const app2: App = {
        name: 'name2',
        contributors: ['contributor1', 'contributor2'],
        version: 2,
        apdex: 2,
        host: ['host1']
      };
      const hostsIndex: HostsIndex = {
        host1: {
          hostname: 'host1',
          apps: [app1]
        }
      };

      hostsService.addAppToHosts(app2, hostsIndex);

      const expectedHostsIndex: HostsIndex = {
        host1: {
          hostname: 'host1',
          apps: [app2, app1]
        }
      };

      expect(hostsIndex).toEqual(expectedHostsIndex);
    });
  });

  describe('removeAppFromHosts', () => {
    it('should remove an app', () => {
      const app1: App = {
        name: 'name1',
        contributors: ['contributor1', 'contributor2'],
        version: 2,
        apdex: 1,
        host: ['host1']
      };
      const app2: App = {
        name: 'name2',
        contributors: ['contributor1', 'contributor2'],
        version: 2,
        apdex: 2,
        host: ['host1']
      };
      const hostsIndex: HostsIndex = {
        host1: {
          hostname: 'host1',
          apps: [app1, app2]
        }
      };

      hostsService.removeAppFromHosts(app2, hostsIndex);

      const expectedHostsIndex: HostsIndex = {
        host1: {
          hostname: 'host1',
          apps: [app1]
        }
      };

      expect(hostsIndex).toEqual(expectedHostsIndex);
    });
  });

  describe('getTopAppsByHost', () => {
    it('should return top 25 apps', () => {
      const app: App = {
        name: 'name',
        contributors: ['contributor1', 'contributor2'],
        version: 2,
        apdex: 0,
        host: ['host1']
      };
      const givenApps = new Array(30).fill(undefined).map((_, index) => ({
        ...app,
        name: `${app.name}${29 - index}`,
        apdex: 29 - index
      }));
      const hostsIndex: HostsIndex = {
        host1: {
          hostname: 'host1',
          apps: givenApps
        }
      };

      const apps = hostsService.getTopAppsByHost('host1', hostsIndex);

      const expectedApps = givenApps.slice(0, 25);

      expect(apps).toEqual(expectedApps);
    });
  });
});
