// site-header.js
class SiteHeader extends HTMLElement {
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
          }
  
          .header {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            padding: 1rem;
            box-sizing: border-box;
            z-index: 1003;
          }
  
          .header-content {
            display: flex;
            gap: 1rem;
            max-width: 100%;
            transition: all 0.3s ease-in-out;
          }
  
          .nav-buttons {
            display: flex;
            gap: 1rem;
            flex-shrink: 0;
            transition: all 0.3s ease-in-out;
          }
  
          .header a {
            text-decoration: none;
            color: inherit;
            font-size: 1.4em;
            font-weight: bold;
            background-color: white !important;
            padding: 0.2em 0.4em;
            white-space: nowrap;
            transition: all 0.3s ease-in-out;
            font-family: "Courier New", monospace;
            display: flex;
            justify-content: center;
            align-items: center;
          }
  
          #scrolling-banner {
            flex-grow: 1;
            min-width: 0;
            overflow: hidden;
            background-color: white;
            color: inherit;
            font-size: 1.4em;
            padding: 0.2em 0.4em;
            transition: all 0.3s ease-in-out;
            box-sizing: border-box;
            position: relative;
            font-family: "Courier New", monospace;
          }
  
          .banner-container {
            display: inline-block;
            white-space: nowrap;
            animation: scroll 20s linear infinite;
          }
  
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
  
          .banner-container::after {
            content: attr(data-content);
            display: inline-block;
            white-space: nowrap;
          }
  
          @media (max-width: 768px) {
            .header-content {
              flex-direction: column;
            }
  
            .nav-buttons {
              width: 100%;
              justify-content: space-between;
            }
  
            .nav-buttons a {
              flex: 1;
              text-align: center;
            }
  
            #scrolling-banner {
              width: 100%;
              margin-right: 0;
            }
          }
        </style>
  
        <div class="header">
          <div class="header-content">
            <div class="nav-buttons">
              <a href="./index.html">home</a>
              <a href="./home.html">landing</a>
              <a href="#projects">projects</a>
              <a href="#contact">contact</a>
            </div>
            <div id="scrolling-banner">
              <div class="banner-container" data-content="In the process of becoming 風呂… Stay tuned. ~ This space is a certified beana fan zone. ~ https://www.youtube.com/watch?v=ViXSzU8UjbI ~">
                In the process of becoming 風呂… Stay tuned. ~ This space is a certified beana fan zone. ~ https://www.youtube.com/watch?v=ViXSzU8UjbI ~
              </div>
            </div>
          </div>
        </div>
      `;
    }
  }
  
  customElements.define('site-header', SiteHeader);