import styles from '!!raw-loader!sass-loader!./host.component.scss';
import { Component, ShadowDOMComponent } from '@core/shadow-dom';

@Component({
  selector: 'app-host',
  styles,
  attributes: ['host']
})
export class HostComponent extends ShadowDOMComponent {
  onRender(): string {
    return `
      soy host
    `;
  }
}
