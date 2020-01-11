import styles from '!!raw-loader!sass-loader!./host-list.component.scss';
import { Component, ShadowDOMComponent } from '@core/shadow-dom';
import { AppsService } from '@board/services/apps.service';
import { Host } from '@board/models/host.interface';

@Component({
  selector: 'app-host-list',
  styles
})
export class HostListComponent extends ShadowDOMComponent {
  private hosts: Host[] = [];

  async onInit(): Promise<void> {
    const appsService = new AppsService();
    const apps = await appsService.getAllApps();
    console.log(apps);
  }

  onRender(): string {
    return this.hosts.reduce(
      (str, host) => `
      ${str}<app-host host="${host}"></app-host>
    `, '');
  }
}
