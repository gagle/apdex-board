export abstract class ShadowDOMComponent extends HTMLElement {
  private defaultStyleElement: HTMLStyleElement;
  private customStyleElement: HTMLStyleElement | undefined;

  constructor() {
    super();

    this.defaultStyleElement = document.createElement('style');
    // By default, custom elements have 'display: inline'
    this.defaultStyleElement.innerHTML = ':host { display: block; contain: content; }';

    this.attachShadow({ mode: 'open' });

    if (this.styles) {
      this.customStyleElement = document.createElement('style');
      this.customStyleElement.innerHTML = this.styles;
    }

    setTimeout(() => {
      // Allow subclasses to finalize constructor execution by delaying onInit
      // to the next tick
      this.onInit();
    }, 0);
  }

  get styles(): string {
    return '';
  }

  onRender(): string {
    return '';
  }

  onInit(): void {}

  render(): void {
    const html = this.onRender();

    const shadowRoot = this.shadowRoot!;

    if (html) {
      shadowRoot.innerHTML = html;
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
