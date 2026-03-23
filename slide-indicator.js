/**
 * Copyright 2026 igasparraj16
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `insta-app`
 * 
 * @demo index.html
 * @element insta-app
 */
export class SlideIndicator extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "slide-indicator";
  }

  constructor() {
    super();
    this.title = "Title";
    this.color = "var(--ddd-theme-default-skyBlue)";
    this.total = 4;
    this.currIndex = 0;
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      color: { type: String }, 
      total: { type: Number },
      currIndex: { type: Number }
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
      .tray {
        display: flex;
        gap: var(--ddd-spacing-4);
      }
      h3 span {
        font-size: var(--insta-app-label-font-size, var(--ddd-font-size-s));
      }
      .wrapper {
        margin-top: var(--ddd-spacing-8);
        margin-bottom: var(--ddd-spacing-2);
      }
      .dot {
        width: 12px;
        height: 12px;
        background-color: var(--ddd-theme-default-skyBlue);
        border-radius: 50%;
        cursor: pointer;
        opacity: 0.5;
        margin: var(--ddd-spacing-2);
      }
      .dot.active {
        opacity: 1;
        background-color: var(--ddd-theme-default-beaverBlue);
      }
      .dots {
        display: flex;
        gap: var(--ddd-spacing-3);
        align-items: center;
      }

    `];
  }

  // Lit render the HTML
  render() {
    let dots = [];
    for (let i = 0; i < this.total; i++) {
      dots.push(html`
        <span @click="${(e) => this._handleDotClick(e)}" data-index="${i}" class="dot ${i === this.currIndex ? 'active' : ''}"></span>
      `);
    }

    return html`
      <div class="dots">
        ${dots}
      </div>
      `;
  }

  _handleDotClick(e) {
    const indexChange = new CustomEvent("play-list-index-changed", {
      composed: true,
      bubbles: true,
      detail: {
        index: parseInt(e.target.dataset.index)
      },
    });
    this.dispatchEvent(indexChange);
  }


}

globalThis.customElements.define(SlideIndicator.tag, SlideIndicator);