import styles from '!!raw-loader!sass-loader!./view-switcher.component.scss';
import { Component, ShadowDOMComponent } from '@core/shadow-dom';

@Component({
  selector: 'app-view-switcher',
  styles: [styles]
})
export class ViewSwitcherComponent extends ShadowDOMComponent {
  private asList = false;

  onInit(): void {
    this.attachEventListeners();
  }

  onRender(): string {
    return `
      <label class="label">
        ${this.asList ? 'Show as an awesome grid' : 'Show as list'}
        <input type="checkbox" ${this.asList ? 'checked' : ''} />
      </label>
    `;
  }

  private attachEventListeners(): void {
    this.root.querySelector('input')!.addEventListener('click', () => {
      this.asList = !this.asList;

      this.dispatchEvent(new CustomEvent('viewChange', {
        detail: {
          viewAsList: this.asList
        }
      }));

      this.render();
      this.attachEventListeners();
    });
  }
}
