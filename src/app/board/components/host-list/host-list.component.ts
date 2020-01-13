import stylesList from '!!raw-loader!sass-loader!./host-list.component.scss';
import stylesGrid from '!!raw-loader!sass-loader!./host-list-grid.component.scss';
import { Component, ShadowDOMComponent } from '@core/shadow-dom';
import { AppsApiService } from '@board/services/apps-api.service';
import { Host } from '@board/models/host.interface';
import { HostComponent } from '../host/host.component';
import { HostsService } from '@board/services/hosts.service';

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
    const appsApiService = new AppsApiService();
    const apps = await appsApiService.getAllApps();

    const hostsService = new HostsService();
    this.hosts = hostsService.indexAppsByHost(apps);

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
