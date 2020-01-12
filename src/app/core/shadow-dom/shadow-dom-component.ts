import { AttributeChange } from './models/attribute-change.interface';

export abstract class ShadowDOMComponent extends HTMLElement {
  private defaultStyleElement: HTMLStyleElement;
  private customStyleElement: HTMLStyleElement | undefined;

  constructor() {
    super();

    this.defaultStyleElement = document.createElement('style');
    // By default, custom elements have 'display: inline'
    this.defaultStyleElement.innerHTML = ':host { display: block; }';

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

  get root(): ShadowRoot {
    return this.shadowRoot!;
  }

  getStyles(): string {
    return '';
  }

  onRender(): string {
    return '';
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onInit(): void { }

  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  onChange(change: AttributeChange): void { }

  render(): void {
    const htmlToRender = this.onRender();

    if (htmlToRender) {
      this.root.innerHTML = htmlToRender;
    }

    this.root.appendChild(this.defaultStyleElement);

    if (this.customStyleElement) {
      this.root.appendChild(this.customStyleElement);
    }
  }

  connectedCallback(): void {
    this.render();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attributeChangedCallback(name: string, previousValue: any, currentValue: any): void {
    const change: AttributeChange = {
      name,
      previousValue,
      currentValue
    }
    this.onChange(change);
  }
}
