import styles from '!!raw-loader!sass-loader!./text-field.component.scss';
import { Component, ShadowDOMComponent } from '@core/shadow-dom';

@Component({
  selector: 'app-text-field',
  styles: [styles]
})
export class TextFieldComponent extends ShadowDOMComponent {
  onRender(): string {
    return `
      <span class="label">${this.getAttribute('label')}</span>
      <span class="value">${this.getAttribute('value')}</span>
    `
  }
}
