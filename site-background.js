// site-background.js
class SiteBackground extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            width: 100%;
            height: 100%;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 1000;
          }
  
          .background {
            position: fixed;
            left: 0;
            bottom: 0;
            width: auto;
            height: 100vh;
            object-fit: cover;
            object-position: bottom left;
            transition: height 0.3s ease-in-out;
          }
        </style>
  
        <img
          src="./background/dotart_background.png"
          alt="8K Background"
          class="background"
          id="bgImage"
        />
      `;
  
      this.adjustBackground = this.adjustBackground.bind(this);
      window.addEventListener('load', this.adjustBackground);
      window.addEventListener('resize', this.adjustBackground);
    }
  
    disconnectedCallback() {
      // Clean up event listeners when component is removed
      window.removeEventListener('load', this.adjustBackground);
      window.removeEventListener('resize', this.adjustBackground);
    }
  
    adjustBackground() {
      const vh = window.innerHeight;
      const bgImage = this.shadowRoot.getElementById('bgImage');
      if (vh > 500) {
        bgImage.style.height = "100vh";
      } else {
        bgImage.style.height = "200vh";
      }
    }
  }
  
  customElements.define('site-background', SiteBackground);