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
    this.profilePhoto = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";
    this.username = "";
    this.handle = "";
    this.memberSince = "";
    this.caption = "";
    this.datePosted = "";
    this.photo = "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d";    
    this.slides = [];
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      currIndex: { type: Number , reflect: true},
      profilePhoto: { type: String },
      username: { type: String },
      handle: { type: String },
      memberSince: { type: String },
      caption: { type: String },
      datePosted: { type: String },
      slides: { type: Array },
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
        position: relative;
        background-color: var(--ddd-theme-default-potential0);
        padding: var(--ddd-spacing-8);
        border-radius: 8px;
        border-color: var(--ddd-theme-default-limestoneMaxLight);
        border-width: var(--ddd-border-size-sm);
        border-style: solid;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      slide-indicator {
        right: var(--ddd-spacing-4);
        z-index: 1;
      }
      .user-info {
        display: flex;
        gap: var(--ddd-spacing-2);
        align-items: center;
        padding: var(--ddd-spacing-4) 0;
      }
      .profile-photo {
        border-radius: 50%;
        width: 40px;
        height: 40px;
        object-fit: cover;
        display: block;
      }
      .username {
        color: var(--ddd-theme-default-coalyGray);  
        font-size: var(--ddd-font-size-s);
        font-weight: var(--ddd-font-weight-bold);
        margin: 0;
        line-height: 1;
      }
      .user-meta {
        display: flex;
        flex-direction: column;
        gap: var(--ddd-spacing-1);
      }
      .handle,
      .member-since {
        margin: 0;
        color: var(--ddd-theme-default-coalyGray);
        font-size: var(--ddd-font-size-4xs);
        line-height: 1.2;
      }
      .caption {
        font-weight: var(--ddd-font-weight-base);
        font-size: var(--ddd-font-size-xs);
        max-height: 150px;
        overflow-y: auto;
        max-width: 600px;
        color: black;
        margin: var(--ddd-spacing-1);
      }
      .like-button {
        border: none;
        background: transparent;
        padding: 0;
        cursor: pointer;
        font-size: var(--ddd-font-size-m);
        line-height: 1;
        margin: var(--ddd-spacing-2) 0;
      }
      .date-posted {
        margin: 0;
        color: var(--ddd-theme-default-coalyGray);
        font-size: var(--ddd-font-size-4xs);
      }
      .arrow-wrapper {
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        transform: translateY(-50%);
      }
      .slide-photo {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
      .photo-wrapper {
        width: 100%;
        aspect-ratio: 1 / 1;
        overflow: hidden;
      }
    `];
  }

  // Lit render the HTML
  render() {
    const isLiked = this.slides[this.currIndex]?.liked || false;

    return html`
      <div class="wrapper">
        <h3><span>${this.t.title}</span> ${this.title}</h3>
        <div class="single-slide">
          <div class="user-info">
            <img src="${this.profilePhoto}" alt="profile photo" class="profile-photo">
            <div class="user-meta">
              <h3 class="username">${this.username}</h3>
              <p class="handle">${this.handle}</p>
              <p class="member-since">${this.memberSince}</p>
            </div>
          </div>
          <div class="photo-wrapper">
            <img src="${this.photo}" alt="Slide photo" class="slide-photo">
          </div>
          <slide-indicator
            .total=${this.slides.length}
            .currIndex=${this.currIndex}
            .thumbnails=${this.slides.map((slide) => slide.photo)}
            @play-list-index-changed="${this._handleIndexChange}">
          </slide-indicator>
          <button class="like-button" @click="${this._toggleLike}" aria-label="Like post">
            ${isLiked ? "❤️" : "🤍"}
          </button>
          <h5 class="caption">${this.caption || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}</h5>
          <p class="date-posted">${this.datePosted}</p>
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

  async firstUpdated() {
    if (this.index !== undefined) {
      this.currIndex = this.index;
    }

    await this._loadSlidesFromJson();

    this._updateSlides();
  }

  updated(changedProperties) {
    if (changedProperties.has('currIndex')) {
      this._updateSlides();
    }
  }

  _updateSlides() {
    if (!this.slides.length) {
      return;
    }

    if (this.currIndex < 0) {
      this.currIndex = 0;
    }
    if (this.currIndex > this.slides.length - 1) {
      this.currIndex = this.slides.length - 1;
    }

    const curSlide = this.slides[this.currIndex];
    if (curSlide) {
      this.username = curSlide.username;
      this.handle = curSlide.handle;
      this.memberSince = curSlide.memberSince;
      this.caption = curSlide.caption;
      this.datePosted = curSlide.datePosted;
      this.photo = curSlide.photo;
      this.profilePhoto = curSlide.profilePhoto;
    } 
  }

  async _loadSlidesFromJson() {
    try {
      const response = await fetch(new URL("./data.json", import.meta.url));
      if (!response.ok) {
        return;
      }

      const data = await response.json();
      if (!Array.isArray(data?.images) || data.images.length === 0) {
        return;
      }

      this.slides = data.images.map((item) => ({
        username: item.username || "",
        handle: item.handle || "",
        memberSince: item.memberSince || "",
        caption: item.caption || "",
        datePosted: item.datePosted || "",
        photo: item.photo || "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d",
        profilePhoto: item.profilePhoto || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
        liked: Boolean(item.liked),
      }));
    }
    catch (error) {
      this.slides = [];
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

  _toggleLike() {
    if (this.currIndex < 0 || this.currIndex >= this.slides.length) {
      return;
    }

    const updatedSlides = [...this.slides];
    updatedSlides[this.currIndex] = {
      ...updatedSlides[this.currIndex],
      liked: !updatedSlides[this.currIndex].liked,
    };
    this.slides = updatedSlides;
  }
}

globalThis.customElements.define(PlayList.tag, PlayList);