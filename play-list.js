/**
 * Copyright 2026 igasparraj16
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./play-list-slide.js";
import "./slide-arrow.js";

/**
 * `play-list`
 * 
 * @demo index.html
 * @element play-list
 */
export class PlayList extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "play-list";
  }

  constructor() {
    super();
    this.currIndex = 0;
    this.channelName = "";
    this.profilePhoto = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";
    this.username = "";
    this.caption = "";
    this.photo = "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d";    
    this.slides = Array.from(this.querySelectorAll("play-list-slide"));
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      currIndex: { type: Number , reflect: true},
      channelName: { type: String },
      profilePhoto: { type: String },
      username: { type: String },
      caption: { type: String },
      slides: { type: String },
      index: { type: Number },
      photo: { type: String }
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        
        width: 90%;
        max-width: 500px;
        font-family: var(--ddd-font-navigation);
        padding: var(--ddd-spacing-10);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      .single-slide {
        background-color: var(--ddd-theme-default-slateMaxLight);
        padding: var(--ddd-spacing-8);
        border-radius: 4px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      .channel-name {
        color: black;
        font-size: var(--ddd-font-size-s);
      }
      .user-info {
        display: flex;
        gap: var(--ddd-spacing-2);
        align-items: center;
      }
      .profile-photo {
        border-radius: 50%;
        width: 40px;
        height: 40px;
      }
      .username {
        color: darkolivegreen;
        font-size: var(--ddd-font-size-m);
        font-weight: var(--ddd-font-weight-bold);
      }
      .caption {
        font-weight: var(--ddd-font-weight-base);
        font-size: var(--ddd-font-size-xs);
        max-height: 150px;
        overflow-y: auto;
        max-width: 600px;
        color: black;
      }
      .arrow-wrapper {
        position: relative;
        top: -190px;
      }
      .slide-photo {
        width: 100%;
        height: auto;      
    }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
      <div class="wrapper">
        <h3><span>${this.t.title}</span> ${this.title}</h3>
        <div class="single-slide">
          <h4 class="channel-name">${this.channelName}</h4>
          <div class="user-info">
            <img src="${this.profilePhoto}" alt="profile photo" class="profile-photo">
            <h3 class="username">${this.username}</h3>
          </div>
          <img src="${this.photo}" alt="Slide photo" class="slide-photo">
          <slide-indicator 
            .total=${this.slides.length}
            .currIndex="${this.currIndex}"
            @play-list-index-changed="${this._handleIndexChange}">
          </slide-indicator>
          <h5 class="caption">${this.caption || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}</h5>
          <div class="arrow-wrapper">
            <slide-arrow
              .index=${this.currIndex}
              .total=${this.slides.length}
              @prev-clicked="${this.back}"
              @next-clicked="${this.next}">
            </slide-arrow>
          </div>
        </div>
      </div>
    `;
  }

    firstUpdated() {  
    if (this.index !== undefined) {
      this.currIndex = this.index;
    }
    this._updateSlides();
  }

  updated(changedProperties) {
    if (changedProperties.has('currIndex')) {
      this._updateSlides();
    }
  }

  _updateSlides() {
    this.slides.forEach((slide, i) => {
      slide.active = (i === this.currIndex)
    });

    const curSlide = this.slides[this.currIndex];
    if (curSlide) {
      this.channelName = curSlide.getAttribute("channel-name");
      this.username = curSlide.getAttribute("username");
      this.caption = curSlide.getAttribute("caption");
      this.photo = curSlide.getAttribute("photo");
      this.profilePhoto = curSlide.getAttribute("profilePhoto");
    } 
  }

  next() {
    if (this.currIndex < this.slides.length - 1) {
      this.currIndex++;
    }
  }

  back() {
    if (this.currIndex > 0) {
      this.currIndex--;
    }
  }

  _handleIndexChange(e) {
    const newIndex = e.detail.index;
    
    if (newIndex >= 0 && newIndex < this.slides.length) {
      this.currIndex = newIndex;
    }
  }
}

globalThis.customElements.define(PlayList.tag, PlayList);