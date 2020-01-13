import styles from '!!raw-loader!sass-loader!./application.component.scss';
import { Component, ShadowDOMComponent } from '@core/shadow-dom';
import { DialogService } from '@core/dialog';
import { App } from '@board/models/app.interface';
import { ApplicationDialogComponent } from '../application-dialog/application-dialog.component';

@Component({
  selector: 'app-application',
  styles: [styles]
})
export class ApplicationComponent extends ShadowDOMComponent {
  private _app!: App;
  private dialogService = new DialogService();

  get app(): App {
    return this._app;
  }

  set app(value: App) {
    this._app = value;
    this.render();
  }

  onInit(): void {
    this.root.addEventListener('click', () => {
      this.dialogService.open('<app-application-dialog></app-application-dialog>', {
        width: '500px',
        height: '400px'
      });

      const applicationDialog = document.querySelector<ApplicationDialogComponent>('app-application-dialog')!;
      applicationDialog.data = {
        app: this.app
      }
    });
  }

  onRender(): string {
    return this.app
      ? `
        <div class="apdex">${this.app.apdex}</div>
        <div class="name">${this.app.name}</div>
      `
      : '';
  }
}
