import { AttributeChange } from './models/attribute-change.interface';

export abstract class ShadowDOMComponent extends HTMLElement {
  private defaultStyleElement: HTMLStyleElement;
  private customStyleElements: HTMLStyleElement[];

  constructor() {
    super();

    this.defaultStyleElement = document.createElement('style');
    // By default, custom elements have 'display: inline'
    this.defaultStyleElement.innerHTML = ':host { display: block; }';

    this.attachShadow({ mode: 'open' });

    const styles = this.getStyles();

    this.customStyleElements = styles.map(style => {
      const styleElement = document.createElement('style');
      styleElement.innerHTML = style;
      return styleElement;
    });

    setTimeout(() => {
      // Allow subclasses to finalize constructor execution by delaying onInit
      // to the next tick
      this.onInit();
    }, 0);
  }

  get root(): ShadowRoot {
    return this.shadowRoot!;
  }

  getStyles(): string[] {
    return [''];
  }

  onRender(): string {
    return '';
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  afterRendered(): void { }

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

    this.customStyleElements.forEach(styleElement => {
      this.root.appendChild(styleElement);
    });

    this.afterRendered();
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
