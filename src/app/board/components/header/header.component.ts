import styles from '!!raw-loader!sass-loader!./header.component.scss';
import { Component, ShadowDOMComponent } from '@core/shadow-dom';

@Component({
  selector: 'app-header',
  styles: [styles],
  attributes: ['viewChange']
})
export class HeaderComponent extends ShadowDOMComponent {
  private email = 'averylongemailaddress@companyname.com';

  onInit(): void {
    const viewSwitcher = this.root.querySelector('app-view-switcher')!;
    viewSwitcher.addEventListener('viewChange', event => {
      this.dispatchEvent(new CustomEvent('viewChange', {
        detail: (event as CustomEvent).detail
      }));
    });
  }

  onRender(): string {
    return `
      <div class="title-wrapper">
        <span class="title">Apps by Host </span>
        <span class="subtitle">for user ${this.email}</span>
      </div>
      <app-view-switcher></app-view-switcher>
    `;
  }
}
