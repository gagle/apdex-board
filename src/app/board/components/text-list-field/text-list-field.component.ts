import styles from '!!raw-loader!sass-loader!./text-list-field.component.scss';
import { Component, ShadowDOMComponent } from '@core/shadow-dom';

@Component({
  selector: 'app-text-list-field',
  styles: [styles]
})
export class TextListFieldComponent extends ShadowDOMComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _values!: any[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get values(): any[] {
    return this._values;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  set values(values: any[]) {
    this._values = values;
    this.render();
  }

  onRender(): string {
    return this.values
      ? `
        <span class="label">${this.getAttribute('label')}</span>
        <ul>
          ${this.values.reduce((str, value) => `
            ${str}
            <li><span class="value">${value}</span></li>
          `, '')}
        </ul>
      `
      : ''
  }
}
