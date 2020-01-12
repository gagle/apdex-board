export abstract class ShadowDOMComponent extends HTMLElement {
  private defaultStyleElement: HTMLStyleElement;
  private customStyleElement: HTMLStyleElement | undefined;

  constructor() {
    super();

    this.defaultStyleElement = document.createElement('style');
    // By default, custom elements have 'display: inline'
    this.defaultStyleElement.innerHTML = ':host { display: block; contain: content; }';

    this.attachShadow({ mode: 'open' });

    const styles = this.getStyles();

    if (styles) {
      this.customStyleElement = document.createElement('style');
      this.customStyleElement.innerHTML = styles;
    }

    setTimeout(() => {
      // Allow subclasses to finalize constructor execution by delaying onInit
      // to the next tick
      this.onInit();
    }, 0);
  }

  getStyles(): string {
    return '';
  }

  onRender(): string {
    return '';
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onInit(): void {}

  render(): void {
    const htmlToRender = this.onRender();

    const shadowRoot = this.shadowRoot!;

    if (htmlToRender) {
      shadowRoot.innerHTML = htmlToRender;
    }

    shadowRoot.appendChild(this.defaultStyleElement);

    if (this.customStyleElement) {
      shadowRoot.appendChild(this.customStyleElement);
    }
  }

  connectedCallback(): void {
    this.render();
  }
}
