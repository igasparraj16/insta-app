/**
 * Copyright 2026 igasparraj16
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `fox-data`
 * 
 * @demo index.html
 * @element fox-data
 */
export class FoxData extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "fox-data";
  }

  constructor() {
    super();
    this.index = 0;
    this.total = 0;
    this.foxImage = "";
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      index: { type: Number },
      total: { type: Number },
      foxImage: { type: String }
    };
  }

getFoxes() {
    fetch("https://randomfox.ca/floof/").then((resp) => {
    // headers indicating the request was good, then process it
    if (resp.ok) {
      // return the response as JSON. .text() is another valid response
      // though that's more useful for HTML / non data object responses
      return resp.json();
    }
    }).then((data) => {
        this.foxImage = data.image;
    });
}

  firstUpdated() {
    this.getFoxes();
  }

  updated(changedProperties) {
    if (changedProperties.has("index") && changedProperties.get("index") !== undefined) {
      this.getFoxes();
    }
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        width: 100%;
      }
      img {
        width: 100%;
        height: 250px;
        object-fit: cover;
        display: block;
      }
    `];
  }

  

  // Lit render the HTML
  render() {
    return html`
    <div class="wrapper">
        <img src="${this.foxImage}" alt="Random fox" />
     </div>
     <div class="wrapper">
    </div>

    `;
  }

  
}

globalThis.customElements.define(FoxData.tag, FoxData);