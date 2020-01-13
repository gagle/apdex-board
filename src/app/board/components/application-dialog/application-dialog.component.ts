import styles from '!!raw-loader!sass-loader!./application-dialog.component.scss';
import { Component, ShadowDOMComponent } from '@core/shadow-dom';
import { App } from '@board/models/app.interface';
import { TextListFieldComponent } from '../text-list-field/text-list-field.component';

export interface ApplicationDialogData {
  app: App;
}

@Component({
  selector: 'app-application-dialog',
  styles: [styles]
})
export class ApplicationDialogComponent extends ShadowDOMComponent {
  private _data!: ApplicationDialogData;

  get data(): ApplicationDialogData {
    return this._data;
  }

  set data(value: ApplicationDialogData) {
    this._data = value;
    this.render();
  }

  onRender(): string {
    return this.data
      ? `
        <div class="header">Application</div>
        <app-text-field class="field" label="Name" value="${this.data.app.name}"></app-text-field>
        <app-text-field class="field" label="Version" value="${this.data.app.version}"></app-text-field>
        <app-text-field class="field" label="Apdex" value="${this.data.app.apdex}"></app-text-field>
        <app-text-list-field class="field contributors" label="Contributors"></app-text-list-field>
        <app-text-list-field class="field hosts" label="Hosts"></app-text-list-field>
      `
      : '';
  }

  afterRendered(): void {
    if (this.data) {
      this.root.querySelector<TextListFieldComponent>('.contributors')!.values = this.data.app.contributors;
      this.root.querySelector<TextListFieldComponent>('.hosts')!.values = this.data.app.host;
    }
  }
}
