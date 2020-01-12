import stylesList from '!!raw-loader!sass-loader!./host-list.component.scss';
import stylesGrid from '!!raw-loader!sass-loader!./host-list-grid.component.scss';
import { Component, ShadowDOMComponent } from '@core/shadow-dom';
import { AppsService } from '@board/services/apps.service';
import { Host } from '@board/models/host.interface';
import { HostComponent } from '../host/host.component';

@Component({
  selector: 'app-host-list',
  styles: [stylesList, stylesGrid]
})
export class HostListComponent extends ShadowDOMComponent {
  private hosts: Host[] = [];
  private _asGrid = true;

  get asGrid(): boolean {
    return this._asGrid;
  }

  set asGrid(value: boolean) {
    this._asGrid = value;
    if (value) {
      this.setAttribute('asGrid', '');
    } else {
      this.removeAttribute('asGrid');
    }
  }

  async onInit(): Promise<void> {
    const appsService = new AppsService();
    const apps = await appsService.getAllApps();
    console.log(apps);

    this.hosts = [{
      id: 'host1',
      apps: [{
        name: 'name asd asd asd asd asd asd as das das das d asdasd as das d',
        contributors: ['contributor1', 'contributor2'],
        version: 2,
        apdex: 20,
        hostIds: ['host1', 'host2']
      }, {
        name: 'name asd asd asd asd asd asd as das das das d asdasd as das d',
        contributors: ['contributor1', 'contributor2'],
        version: 2,
        apdex: 20,
        hostIds: ['host1', 'host2']
      }]
    }, {
      id: 'host2',
      apps: [{
        name: 'name',
        contributors: ['contributor1', 'contributor2'],
        version: 2,
        apdex: 20,
        hostIds: ['host1', 'host2']
      }, {
        name: 'name',
        contributors: ['contributor1', 'contributor2'],
        version: 2,
        apdex: 20,
        hostIds: ['host1', 'host2']
      }]
    }, {
      id: 'host3',
      apps: [{
        name: 'name',
        contributors: ['contributor1', 'contributor2'],
        version: 2,
        apdex: 20,
        hostIds: ['host1', 'host2']
      }, {
        name: 'name',
        contributors: ['contributor1', 'contributor2'],
        version: 2,
        apdex: 20,
        hostIds: ['host1', 'host2']
      }]
    }, {
      id: 'host4',
      apps: [{
        name: 'name',
        contributors: ['contributor1', 'contributor2'],
        version: 2,
        apdex: 20,
        hostIds: ['host1', 'host2']
      }, {
        name: 'name',
        contributors: ['contributor1', 'contributor2'],
        version: 2,
        apdex: 20,
        hostIds: ['host1', 'host2']
      }]
    }];

    this.render();
  }

  afterRendered(): void {
    this.initializeHostComponents();
  }

  onRender(): string {
    return this.hosts.reduce(str => `${str}<app-host></app-host>`, '');
  }

  private initializeHostComponents(): void {
    const hosts = this.root.querySelectorAll<HostComponent>('app-host');
    hosts.forEach((host, index) => {
      host.host = this.hosts[index];
    });
  }
}
