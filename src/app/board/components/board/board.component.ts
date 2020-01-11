import styles from '!!raw-loader!sass-loader!./board.component.scss';
import { Component, ShadowDOMComponent } from '@core/shadow-dom';

@Component({
  selector: 'app-board',
  styles
})
export class BoardComponent extends ShadowDOMComponent {
  onRender(): string {
    return `
      <app-header></app-header>
      <app-host-list></app-host-list>
    `;
  }
}
