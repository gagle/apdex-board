export abstract class ShadowDOMComponent extends HTMLElement {
  private styleElement: HTMLStyleElement | undefined;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    const styles = this.withStyles();

    if (styles) {
      this.styleElement = document.createElement('style');
      this.styleElement.innerHTML = styles;
    }

    this.render();
  }

  withStyles(): string {
    return '';
  }

  onRender(): string {
    return '';
  }

  render(): void {
    const html = this.onRender();

    const shadowRoot = this.shadowRoot!;

    if (html) {
      shadowRoot.innerHTML = html;
    }

    if (this.styleElement) {
      shadowRoot.appendChild(this.styleElement);
    }
  }
}
