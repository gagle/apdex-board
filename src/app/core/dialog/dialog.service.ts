export interface DialogOptions {
  width: string;
  height: string;
}

export class DialogService {
  private readonly className = 'dialog-overlay-container';

  open(html: string, options: DialogOptions): void {
    // Remove previous dialog if any
    document.querySelector(`.${this.className}`)?.remove();

    // Create and append element into DOM
    const element = document.createElement('div');
    element.setAttribute('class', this.className);
    element.innerHTML = `
      <div class="dialog-overlay"
        style="height: ${options.height}; width: ${options.width}"
      >${html}</div>
    `;

    // Close on click background
    element.addEventListener('click', () => {
      this.close();
    });

    document.body.appendChild(element);

    // Attach Esc keypress detection for closing the dialog
    document.onkeydown = (event): void => {
      event = event || window.event;
      if (event.keyCode === 27) {
        this.close();
      }
    }
  }

  close(): void {
    document.onkeypress = null;
    document.querySelector(`.${this.className}`)?.remove();
  }
}
