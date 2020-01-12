import styles from '!!raw-loader!sass-loader!./host.component.scss';
import { Component, ShadowDOMComponent } from '@core/shadow-dom';
import { Host } from '@board/models/host.interface';

@Component({
  selector: 'app-host',
  styles: [styles]
})
export class HostComponent extends ShadowDOMComponent {
  private _host!: Host;

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
        <span class='host-id'>${this.host.id}</span>
        <div class='apps-list'>
          ${this.host.apps.reduce((str, app) => `
            ${str}
            <div class='app'>
              <div class='app-apdex'>${app.apdex}</div>
              <div class='app-name'>${app.name}</div>
            </div>
          `, '')}
        </div>
      `
      : '';
  }
}
