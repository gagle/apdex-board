import styles from '!!raw-loader!sass-loader!./host.component.scss';
import { Component, ShadowDOMComponent } from '@core/shadow-dom';
import { Host } from '@board/models/host.interface';
import { ApplicationComponent } from '../application/application.component';

@Component({
  selector: 'app-host',
  styles: [styles]
})
export class HostComponent extends ShadowDOMComponent {
  private _host!: Host;
  private readonly maxApps = 5;

  get host(): Host {
    return this._host;
  }

  set host(value: Host) {
    this._host = value;
    this.render();
  }

  onRender(): string {
    return this.host
      ? `
        <span class="host-id">${this.host.hostname}</span>
        <div class="apps-list">
          ${this.host.apps.slice(0, this.maxApps).reduce(str => `${str}<app-application></app-application>`, '')}
        </div>
      `
      : '';
  }

  afterRendered(): void {
    this.initializeAppComponents();
  }

  private initializeAppComponents(): void {
    const applications = this.root.querySelectorAll<ApplicationComponent>('app-application');
    applications.forEach((application, index) => {
      application.app = this.host.apps[index];
    });
  }
}
