/**
 * Copyright 2026 igasparraj16
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./slide-indicator.js";
import "./slide-arrow.js";

/**
 * `insta-app`
 * 
 * @demo index.html
 * @element insta-app
 */
export class PlayListSlide extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "play-list-slide";

  }

  constructor() {
    super();
    this.title ="ooOOOOosfhfiwuh";
    this["channel-name"] = "default channel name";
    this["username"] = "default second heading";
    this.currentIndex = 0;
    this.caption = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      "channel-name": { type: String }, 
      "username": { type: String },
      slides: { type: Array },
      currentIndex: { type: Number }, 
      caption: { type: String }
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        width: 850px;
        font-family: var(--ddd-font-navigation);
        padding: var(--ddd-spacing-2);
      }
    `];
  }

  // Lit render the HTML
  render() {

    return html`
      <div class="wrapper">
        <slot></slot>
      </div>
    `;
  }
}

globalThis.customElements.define(PlayListSlide.tag, PlayListSlide);