import styles from '!!raw-loader!sass-loader!./board.component.scss';
import { Component, ShadowDOMComponent } from '@core/shadow-dom';
import { HostListComponent } from '../host-list/host-list.component';

@Component({
  selector: 'app-board',
  styles: [styles]
})
export class BoardComponent extends ShadowDOMComponent {
  onInit(): void {
    const header = this.root.querySelector('app-header')!;
    const hostList = this.root.querySelector<HostListComponent>('app-host-list')!;

    header.addEventListener('viewChange', event => {
      hostList.asGrid = !(event as CustomEvent).detail.viewAsList;
    });
  }

  onRender(): string {
    return `
      <app-header></app-header>
      <app-host-list asGrid></app-host-list>
    `;
  }
}
