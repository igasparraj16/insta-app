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
    this.thumbnails = [];
    this.thumbnailFallbacks = [];
    this.thumbnailAlts = [];
    this.visibleIndices = [];
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      color: { type: String }, 
      total: { type: Number },
      currIndex: { type: Number },
      thumbnails: { type: Array },
      thumbnailFallbacks: { type: Array },
      thumbnailAlts: { type: Array },
      visibleIndices: { type: Array, state: true }
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
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex: 0 0 32px;
        width: 32px;
        height: 32px;
        cursor: pointer;
        opacity: 0.5;
        overflow: hidden;
        padding: var(--ddd-spacing-0);
      }
      .dot.active {
        opacity: 1;
        border-color: var(--ddd-theme-default-beaverBlue);
      }
      .dot img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
      .thumb-placeholder {
        width: 100%;
        height: 100%;
        display: block;
        background-color: var(--ddd-theme-default-limestoneLight);
      }
      .dots {
        width: 100%;
        overflow-x: auto;
        overflow-y: hidden;
        scrollbar-width: none;
        -ms-overflow-style: none;
        padding: var(--ddd-spacing-2) 0;
      }
      .dots::-webkit-scrollbar {
        display: none;
      }
      .track {
        display: flex;
        gap: var(--ddd-spacing-3);
        align-items: center;
        width: max-content;
      }

    `];
  }

  // Lit render the HTML
  render() {
    const visibleSet = new Set(this.visibleIndices);
    let dots = [];
    for (let i = 0; i < this.total; i++) {
      const thumbnailSrc = this.thumbnails?.[i] || "";
      const thumbnailFallback = this.thumbnailFallbacks?.[i] || thumbnailSrc;
      const thumbnailAlt = this.thumbnailAlts?.[i] || `Slide ${i + 1} thumbnail`;
      const shouldLoad = visibleSet.has(i) || i === this.currIndex;
      dots.push(html`
        <button @click="${(e) => this._handleDotClick(e)}" data-index="${i}" class="dot ${i === this.currIndex ? 'active' : ''}" aria-label="Go to slide ${i + 1}">
          ${thumbnailSrc && shouldLoad
            ? html`<img src="${thumbnailSrc}" alt="${thumbnailAlt}" loading="lazy" decoding="async" data-index="${i}" data-fallback="${thumbnailFallback}" @error="${this._handleThumbnailError}">`
            : html`<span class="thumb-placeholder" data-index="${i}"></span>`}
        </button>
      `);
    }

    return html`
      <div class="dots" @scroll="${this._handleDotsScroll}">
        <div class="track">
          ${dots}
        </div>
      </div>
      `;
  }

  firstUpdated() {
    this._syncCarousel("auto");
    this._updateVisibleThumbnails();
    this._boundResizeHandler = () => this._updateVisibleThumbnails();
    globalThis.addEventListener("resize", this._boundResizeHandler);
  }

  updated(changedProperties) {
    if (
      changedProperties.has("currIndex") ||
      changedProperties.has("thumbnails") ||
      changedProperties.has("total")
    ) {
      this._syncCarousel();
      this._updateVisibleThumbnails();
    }
  }

  disconnectedCallback() {
    if (this._boundResizeHandler) {
      globalThis.removeEventListener("resize", this._boundResizeHandler);
    }
    super.disconnectedCallback();
  }

  _syncCarousel(behavior = "smooth") {
    const container = this.renderRoot?.querySelector(".dots");
    const activeDot = this.renderRoot?.querySelector(".dot.active");

    if (!container || !activeDot) {
      return;
    }

    const targetLeft = activeDot.offsetLeft - (container.clientWidth - activeDot.clientWidth) / 2;
    const maxLeft = Math.max(0, container.scrollWidth - container.clientWidth);
    const left = Math.max(0, Math.min(targetLeft, maxLeft));

    container.scrollTo({ left, behavior });
  }

  _handleDotsScroll() {
    this._updateVisibleThumbnails();
  }

  _handleThumbnailError(e) {
    const image = e.target;
    const fallback = image?.dataset?.fallback;

    if (!image || !fallback || image.src === fallback) {
      return;
    }

    image.src = fallback;
  }

  _updateVisibleThumbnails() {
    const container = this.renderRoot?.querySelector(".dots");
    const firstDot = this.renderRoot?.querySelector(".dot");

    if (!container || !firstDot || this.total <= 0) {
      this.visibleIndices = [];
      return;
    }

    const track = this.renderRoot?.querySelector(".track");
    const trackStyle = track ? globalThis.getComputedStyle(track) : null;
    const gap = trackStyle ? parseFloat(trackStyle.columnGap || trackStyle.gap || "0") : 0;
    const thumbWidth = firstDot.getBoundingClientRect().width + gap;

    if (!thumbWidth) {
      return;
    }

    const scrollLeft = container.scrollLeft;
    const containerWidth = container.clientWidth;
    const visibleStart = Math.floor(scrollLeft / thumbWidth);
    const visibleEnd = Math.ceil((scrollLeft + containerWidth) / thumbWidth);

    const buffer = 2;
    const newVisible = [];
    for (
      let i = Math.max(0, visibleStart - buffer);
      i < Math.min(this.total, visibleEnd + buffer);
      i++
    ) {
      newVisible.push(i);
    }

    if (!newVisible.includes(this.currIndex)) {
      newVisible.push(this.currIndex);
    }

    this.visibleIndices = newVisible;
  }

  _handleDotClick(e) {
    const index = parseInt(e.currentTarget.dataset.index);

    const indexChange = new CustomEvent("play-list-index-changed", {
      composed: true,
      bubbles: true,
      detail: {
        index
      },
    });
    this.dispatchEvent(indexChange);
  }


}

globalThis.customElements.define(SlideIndicator.tag, SlideIndicator);