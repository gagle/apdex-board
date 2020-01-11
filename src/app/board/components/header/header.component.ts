import styles from '!!raw-loader!sass-loader!./header.component.scss';
import { Component, ShadowDOMComponent } from '@core/shadow-dom';

@Component({
  selector: 'app-header',
  styles
})
export class HeaderComponent extends ShadowDOMComponent {
  private email!: string;

  onInit(): void {
    this.email = 'foo@bar';
  }

  onRender(): string {
    return `
      <div class='title-wrapper'>
        <span class='title'>Apps by Host </span>
        <span class='subtitle'>for user ${this.email}</span>
      </div>
      <app-theme-switcher></app-theme-switcher>
    `;
  }
}
