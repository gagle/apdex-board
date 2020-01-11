import { ShadowDOMComponent } from '@core/shadow-dom/shadow-dom-component';
import { Constructor } from '@core/interfaces';

export interface ComponentOptions {
  selector: string;
  styles?: string;
}

export function Component(options: ComponentOptions) {
  return function<T extends Constructor<ShadowDOMComponent>>(
    target: T
  ): Constructor {
    const Class = class extends target {
      withStyles(): string {
        return options.styles || '';
      }
    };

    customElements.define(options.selector, Class);

    return Class;
  };
}
