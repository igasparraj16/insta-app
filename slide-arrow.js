/**
 * Copyright 2026 igasparraj16
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `slide-arrow`
 * 
 * @demo index.html
 * @element slide-arrow
 */
export class SlideArrow extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "slide-arrow";
  }

  constructor() {
    super();
    this.index = 0;
    this.total = 0;
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      index: { type: Number },
      total: { type: Number }
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      .prev {
        margin-left: -56px;
      }
      .next {
        margin-right: -56px;
      }
      .prev, .next {
        width: 40px;
        height: 40px;
        background-color: var(--ddd-theme-default-slateMaxLight); 
        border-radius: 50%;
        border-color: var(--ddd-theme-default-potentialMidnight);
        border-width: var(--ddd-border-size-sm);
        border-style: solid;
        color: var(--ddd-theme-default-potentialMidnight);
        font-size: var(--ddd-font-size-s);
        cursor: pointer;
      }
      .wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--ddd-spacing-4);
        padding: var(--ddd-spacing-4) 0;
      }
      button:hover {
        opacity: 0.8;
      }
      button:disabled {
        opacity: 0.3;
        cursor: not-allowed;
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
    <div class="wrapper">
        <button class="prev" 
        ?disabled="${this.index === 0}"
        @click=${() => this.dispatchEvent(new CustomEvent('prev-clicked', {bubbles: true, composed: true }))}><</button>
        <button class="next" 
        ?disabled="${this.index === this.total - 1}"
        @click=${() => this.dispatchEvent(new CustomEvent('next-clicked', {bubbles: true, composed: true}))}>></button>
    </div>

    `;
  }
}

globalThis.customElements.define(SlideArrow.tag, SlideArrow);