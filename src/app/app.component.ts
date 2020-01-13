import styles from '!!raw-loader!sass-loader!./app.component.scss';
import { Component, ShadowDOMComponent } from '@core/shadow-dom';

@Component({
  selector: 'app-root',
  styles: [styles]
})
export class AppComponent extends ShadowDOMComponent {
  onRender(): string {
    return '<app-board></app-board>';
  }
}
