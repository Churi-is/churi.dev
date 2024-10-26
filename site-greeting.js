class SiteGreating extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
           <style>
                .clock {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    background-color: rgb(255, 255, 255);
                    gap: 20px;
                    max-width: 1200px;
                    padding: 20px;
                    margin: 0; /* Remove any margin */
                }

                .time {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 5px;
                    font-family: "Courier New", monospace;
                }
                
                .time span, .time p {
                    font-family: "Courier New", monospace;
                    font-size: 1.6em;
                    margin: 0;
                    padding: 0;
                    line-height: 1;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 1.5em;
                    user-select: none;
                    cursor: default;
                }
                
                .ampm {
                    font-size: 1.5em !important;
                    font-weight: 200 !important;
                    margin-left: 5px !important;
                    margin-top: 5px !important;
                }

                .greeting-text {
                    font-family: "Courier New", monospace;
                    font-size: 1.5em;
                    font-weight: 200;
                    color: #000;
                    margin: 0;
                }

            </style>
            <div class="clock">
                <div class="time">
                    <p id="hours">11</p>
                    <span>:</span>
                    <p id="minutes">14</p>
                    <span class="small-colon">:</span>
                    <p id="seconds">11</p>
                    <p id="ampm" class="ampm">午前</p>
                </div>
                <h1 id="greeting-text" class="greeting-text">眠ってください、チュリ‼</h1>
            </div>
        `;

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100&display=swap';
        this.shadowRoot.appendChild(link);

        this.updateGreeting();
        this.updateClock();
        setInterval(() => this.updateClock(), 1000);
    }

    updateGreeting() {
        const greeting = this.shadowRoot.querySelector("#greeting-text");
        const hours = new Date().getHours();

        if (hours < 12) {
            greeting.textContent = "おはようございます、チュリさん";
        } else if (hours < 20) {
            greeting.textContent = "お帰りなさい、チュリ";
        } else {
            greeting.textContent = "眠ってください、チュリ‼";
        }
    }

    updateClock() {
        const date = new Date();
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        const ampm = hours >= 12 ? '午後' : '午前';

        hours = (hours % 12 || 12).toString().padStart(2, '0');

        this.shadowRoot.querySelector("#hours").textContent = hours;
        this.shadowRoot.querySelector("#minutes").textContent = minutes;
        this.shadowRoot.querySelector("#seconds").textContent = seconds;
        this.shadowRoot.querySelector("#ampm").textContent = ampm;
    }
}

customElements.define('site-greeting', SiteGreating);