class SiteCategories extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.editMode = false;
  }

  async connectedCallback() {
    this.categories = {
      social: {
        title: "Social",
        links: [
          { name: "Twitter", url: "https://twitter.com" },
          { name: "Discord", url: "https://discord.com" },
          { name: "Reddit", url: "https://reddit.com" }
        ]
      },
      development: {
        title: "Development",
        links: [
          { name: "GitHub", url: "https://github.com" },
          { name: "Stack Overflow", url: "https://stackoverflow.com" },
          { name: "CodePen", url: "https://codepen.io" }
        ]
      },
      entertainment: {
        title: "Entertainment",
        links: [
          { name: "YouTube", url: "https://youtube.com" },
          { name: "Twitch", url: "https://twitch.tv" },
          { name: "Netflix", url: "https://netflix.com" }
        ]
      },
      tools: {
        title: "Tools",
        links: [
          { name: "Gmail", url: "https://gmail.com" },
          { name: "Drive", url: "https://drive.google.com" },
          { name: "Calendar", url: "https://calendar.google.com" }
        ]
      }
    };

    // Load saved categories if they exist
    const savedCategories = localStorage.getItem('categories');
    if (savedCategories) {
      this.categories = JSON.parse(savedCategories);
    }

    this.render();
    this.setupEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
            display: block;
            margin: 0;
        }
        
        .links-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
            max-width: 1200px;
            margin: 0;
            padding: 0;
        }

        .category {
            background-color: rgb(255, 255, 255);
            padding: 20px;
            margin: 0;
            min-width: 200px;
            position: relative;
        }

        .category h2 {
          margin-top: 0;
          margin-bottom: 15px;
          font-size: 1.3em;
          font-family: "Courier New", monospace;
          user-select: none;
          cursor: pointer;
        }

        .quick-links {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        a {
          text-decoration: none;
          color: inherit;
          font-size: 1.1em;
          transition: color 0.2s;
          font-family: "Courier New", monospace;
        }

        a:hover {
          color: #666;
        }

        .edit-button {
          position: absolute;
          top: 5px;
          right: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 5px;
          text-decoration: none;
          color: inherit;
          font-size: 0.8em;
          transition: opacity 0.2s, color 0.2s;
          font-family: "Courier New", monospace;
          opacity: 0;
          pointer-events: none;
        }

        .edit-mode .edit-button {
          opacity: 1;
          pointer-events: auto;
        }

        .edit-button:hover {
          color: #666;
        }

        .modal {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 110vh;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 1004;
        }

        .modal-content {
          background-color: white;
          padding: 20px;
          border-radius: 5px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          min-width: 300px;
          font-family: "Courier New", monospace;
        }

        .modal textarea {
          width: 100%;
          height: 200px;
          margin: 10px 0;
          font-family: monospace;
        }

        .modal-buttons {
          display: flex;
          gap: 10px;
          margin-top: 10px;
        }

        .modal button {
          padding: 5px 15px;
          cursor: pointer;
          font-family: "Courier New", monospace;
          background: white;
          border: 1px solid #ccc;
          border-radius: 4px;
          transition: background-color 0.2s;
        }

        .modal button:hover {
          background-color: #f0f0f0;
        }

        .button-group {
          display: flex;
          gap: 10px;
        }

        .button-group:last-child {
          margin-left: auto;
        }

        #fileInput {
          display: none;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .modal-header h2 {
          margin: 0;
        }
      </style>

      <div class="links-container ${this.editMode ? 'edit-mode' : ''}">
        ${Object.keys(this.categories).map(key => `
          <div class="category">
            <button class="edit-button" data-category="${key}">[e]</button>
            <h2>${this.categories[key].title}</h2>
            <div class="quick-links">
              ${this.categories[key].links.map(link => `
                <a href="${link.url}" target="_blank">${link.name}</a>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>

      <div class="modal">
        <div class="modal-content">
          <div class="modal-header">
            <h2>Edit Category</h2>
          </div>
          <textarea id="categoryEditor"></textarea>
          <div class="modal-buttons">
            <div class="button-group">
              <input type="file" id="fileInput" accept=".json">
              <button id="importButton">Import All</button>
              <button id="exportButton">Export All</button>
            </div>
            <div class="button-group">
              <button id="saveButton">Save</button>
              <button id="cancelButton">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  setupEventListeners() {
    const modal = this.shadowRoot.querySelector('.modal');
    const editor = this.shadowRoot.querySelector('#categoryEditor');
    const saveButton = this.shadowRoot.querySelector('#saveButton');
    const cancelButton = this.shadowRoot.querySelector('#cancelButton');
    const container = this.shadowRoot.querySelector('.links-container');
    const fileInput = this.shadowRoot.querySelector('#fileInput');
    const importButton = this.shadowRoot.querySelector('#importButton');
    const exportButton = this.shadowRoot.querySelector('#exportButton');

    // Double-click handler for titles
    container.addEventListener('dblclick', (e) => {
      if (e.target.tagName === 'H2') {
        this.editMode = !this.editMode;
        container.classList.toggle('edit-mode');
      }
    });

    // Edit buttons
    this.shadowRoot.querySelectorAll('.edit-button').forEach(button => {
      button.addEventListener('click', (e) => {
        const categoryKey = e.target.dataset.category;
        this.currentEditingCategory = categoryKey;
        editor.value = JSON.stringify(this.categories[categoryKey], null, 2);
        modal.style.display = 'block';
      });
    });

    // Save button
    saveButton.addEventListener('click', () => {
      try {
        const updatedCategory = JSON.parse(editor.value);
        this.categories[this.currentEditingCategory] = updatedCategory;
        localStorage.setItem('categories', JSON.stringify(this.categories));
        this.render();
        this.setupEventListeners();
        modal.style.display = 'none';
      } catch (e) {
        alert('Invalid JSON format. Please check your input.');
      }
    });

    // Cancel button
    cancelButton.addEventListener('click', () => {
      modal.style.display = 'none';
      this.currentEditingCategory = null;
    });

    // Import button
    importButton.addEventListener('click', () => {
      fileInput.click();
    });

    // File input change handler
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const importedCategories = JSON.parse(event.target.result);
            this.categories = importedCategories;
            localStorage.setItem('categories', JSON.stringify(this.categories));
            this.render();
            this.setupEventListeners();
            modal.style.display = 'none';
            alert('Categories imported successfully!');
          } catch (error) {
            alert('Error importing categories. Please check the JSON format.');
          }
        };
        reader.readAsText(file);
      }
    });

    // Export button
    exportButton.addEventListener('click', () => {
      const categoriesJson = JSON.stringify(this.categories, null, 2);
      const blob = new Blob([categoriesJson], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'categories.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }
}

customElements.define('site-categories', SiteCategories);