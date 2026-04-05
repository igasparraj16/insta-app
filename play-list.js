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
    this.profilePhoto = "https://static.vecteezy.com/system/resources/thumbnails/032/176/191/small/business-avatar-profile-black-icon-man-of-user-symbol-in-trendy-flat-style-isolated-on-male-profile-people-diverse-face-for-social-network-or-web-vector.jpg";
    this.profilePhotoAlt = "User profile photo";
    this.username = "";
    this.handle = "";
    this.memberSince = "";
    this.caption = "";
    this.datePosted = "";
    this.photo = "https://freesvg.org/img/Placeholder.png";    
    this.photoAlt = "Slide photo";
    this.shareLink = globalThis.location?.href || "";
    this.copied = false;
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
      photo: { type: String },
      photoAlt: { type: String },
      profilePhotoAlt: { type: String },
      copied: { type: Boolean, state: true }
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        --insta-surface-color: light-dark(var(--ddd-theme-default-roarMaxlight), var(--ddd-theme-default-black));
        --insta-text-color: light-dark(var(--ddd-theme-default-coalyGray), var(--ddd-theme-default-white));
        
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
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        background-color: var(--insta-surface-color);
        padding: var(--ddd-spacing-8);
        border-radius: var(--ddd-radius-sm);
        border-color: var(--ddd-theme-default-limestoneMaxLight);
        border-width: var(--ddd-border-size-sm);
        border-style: solid;
        box-shadow: var(--ddd-boxShadow-sm);
      }
      @media (max-width: calc(var(--ddd-breakpoint-sm))) {
        :host {
          width: 96%;
          padding: var(--ddd-spacing-2);
        }
        .wrapper {
          margin: var(--ddd-spacing-0);
          padding: var(--ddd-spacing-0);
        }
        .single-slide {
          padding: var(--ddd-spacing-2);
        }
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
        border-radius: var(--ddd-theme-header-border-treatment-50p);
        width: 40px;
        height: 40px;
        object-fit: cover;
        display: block;
      }
      .username {
        color: var(--insta-text-color);
        font-size: var(--ddd-font-size-xs);
        font-weight: var(--ddd-font-weight-bold);
        margin: var(--ddd-spacing-0);
        line-height: var(--ddd-lh-120);
      }
      .user-meta {
        display: flex;
        flex-direction: column;
        gap: var(--ddd-spacing-1);
      }
      .handle,
      .member-since {
        margin: var(--ddd-spacing-0);
        color: var(--insta-text-color);
        font-size: var(--ddd-font-size-5xs);
        line-height: var(--ddd-lh-120);
      }
      .caption {
        font-weight: var(--ddd-font-weight-base);
        font-size: var(--ddd-font-size-xxs);
        overflow: visible;
        max-width: 100%;
        color: var(--insta-text-color);
        margin: var(--ddd-spacing-1) 0;
      }
      .like-button {
        border: none;
        background: transparent;
        padding: var(--ddd-spacing-0);
        cursor: pointer;
        font-size: var(--ddd-font-size-m);
        line-height: var(--ddd-lh-120);
        margin: var(--ddd-spacing-2) 0;
      }
      .action-row {
        display: flex;
        align-items: center;
        gap: var(--ddd-spacing-3);
        margin: var(--ddd-spacing-2) 0;
      }
      .share-wrapper {
        position: relative;
        display: inline-flex;
        align-items: center;
        margin-left: auto;
        z-index: 1000;
      }
      .share-button {
        border: var(--ddd-border-size-xs) solid var(--ddd-theme-default-link);
        border-radius: var(--ddd-radius-rounded);
        background: transparent;
        padding: var(--ddd-spacing-1) var(--ddd-spacing-3);
        cursor: pointer;
        font-size: var(--ddd-font-size-xxs);
        color: var(--ddd-theme-default-link);
        line-height: var(--ddd-lh-120);
      }
      .popup {
        position: absolute;
        top: -40px;
        left: var(--ddd-spacing-10);
        background: black;
        color: var(--ddd-theme-default-white);
        padding: 5px 10px;
        border-radius: var(--ddd-radius-rounded);
        font-size: var(--ddd-font-size-xxs);
        z-index: 1001;
      }
      .copied-note {
        margin: var(--ddd-spacing-0);
        font-size: var(--ddd-font-size-4xs);
        color: var(--insta-text-color);
      }
      .date-posted {
        margin: var(--ddd-spacing-0);
        color: var(--insta-text-color);
        font-size: var(--ddd-font-size-5xs);
      }
      .arrow-wrapper {
        position: absolute;
        top: 50%;
        left: var(--ddd-spacing-0);
        right: var(--ddd-spacing-0);
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
        flex: 0 0 auto;
        height: auto;
        min-height: 0;
        overflow: hidden;
      }
      @media (min-width: var(--ddd-breakpoint-md)) {
        .username {
          font-size: var(--ddd-font-size-s);
        }
        .handle,
        .member-since {
          font-size: var(--ddd-font-size-4xs);
        }
        .caption {
          font-size: var(--ddd-font-size-xs);
        }
        .share-button {
          font-size: var(--ddd-font-size-xs);
        }
        .date-posted {
          font-size: var(--ddd-font-size-4xs);
        }
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
            <img src="${this.profilePhoto}" alt="${this.profilePhotoAlt}" class="profile-photo">
            <div class="user-meta">
              <h3 class="username">${this.username}</h3>
              <p class="handle">${this.handle}</p>
              <p class="member-since">${this.memberSince}</p>
            </div>
          </div>
          <div class="photo-wrapper">
            <img src="${this.photo}" alt="${this.photoAlt}" class="slide-photo">
          </div>
          <slide-indicator
            .total=${this.slides.length}
            .currIndex=${this.currIndex}
            .thumbnails=${this.slides.map((slide) => slide.photo)}
            .thumbnailAlts=${this.slides.map((slide) => slide.photoAlt)}
            @play-list-index-changed="${this._handleIndexChange}">
          </slide-indicator>
          <div class="action-row">
            <button class="like-button" @click="${this._toggleLike}" aria-label="Like post">
              ${isLiked ? "❤️" : "🤍"}
            </button>
            <div class="share-wrapper">
              <button class="share-button" @click="${this._copyLink}" aria-label="Share post">
                Share
              </button>
              ${this.copied
              ? html`<div class="popup">Copied!</div>`
              : ""}
            </div>
          </div>
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
    const params = new URLSearchParams(globalThis.location.search);
    const activeIndex = Number(params.get("activeIndex"));

    if (!Number.isNaN(activeIndex) && activeIndex >= 0) {
      this.index = activeIndex;
    }

    if (this.index !== undefined) {
      this.currIndex = this.index;
    }

    await this._loadSlidesFromJson();

    this._updateSlides();
  }

  updated(changedProperties) {
    if (changedProperties.has('currIndex')) {
      this._updateSlides();
      this._syncActiveIndexInUrl();
    }
  }

  _syncActiveIndexInUrl() {
    const url = new URL(globalThis.location.href);
    url.searchParams.set("activeIndex", String(this.currIndex));
    globalThis.history.replaceState({}, "", url);
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
      this.photoAlt = curSlide.photoAlt;
      this.profilePhoto = curSlide.profilePhoto;
      this.profilePhotoAlt = curSlide.profilePhotoAlt;
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
        photoAlt: item.photoAlt || `${item.username || "User"} post photo`,
        profilePhotoAlt: item.profilePhotoAlt || `${item.username || "User"} profile photo`,
        liked: Boolean(item.liked),
      }));

      // Load liked state from localStorage
      this._loadLikedState();
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

    this._handleLikeToggle(this.currIndex, updatedSlides[this.currIndex].liked);
  }

  async _copyLink() {
    try {
      this.shareLink = globalThis.location?.href || this.shareLink;
      await navigator.clipboard.writeText(this.shareLink);
      this.copied = true;

      if (this._copyTimeout) clearTimeout(this._copyTimeout);

      this._copyTimeout = setTimeout(() => {
        this.copied = false;
      }, 1500);
    } catch (e) {
      console.error("copy failed");
    }
  }

  _handleLikeToggle(imageId, liked) {
    const likedImages = JSON.parse(localStorage.getItem("likedImages") || "{}");
    likedImages[imageId] = liked;
    localStorage.setItem("likedImages", JSON.stringify(likedImages));
  }

  _loadLikedState() {
    const likedImages = JSON.parse(localStorage.getItem("likedImages") || "{}");
    const updatedSlides = this.slides.map((slide, index) => ({
      ...slide,
      liked: likedImages[index] !== undefined ? likedImages[index] : slide.liked,
    }));
    this.slides = updatedSlides;
  }
}

globalThis.customElements.define(PlayList.tag, PlayList);