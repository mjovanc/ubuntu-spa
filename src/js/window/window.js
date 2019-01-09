import template from './template.js'

export class Window extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.titleText = 'Window Object'
    this.container = this.shadowRoot.querySelector('#container')
    this.app = this.shadowRoot.querySelector('#app')
    this.appContent = this.shadowRoot.querySelector('.app-container')
    this.appHeader = this.shadowRoot.querySelector('.app-header')
    this.appTitle = this.shadowRoot.querySelector('.app-title')
    this.appBody = this.shadowRoot.querySelector('.app-body')
    this.appHeaderCloseBtn = this.shadowRoot.querySelector('.close')
    this.appFooterCloseBtn = this.shadowRoot.querySelector('.app-close-btn')
    this.appIcon = this.shadowRoot.querySelector('.app-icon')

    // let lastCustomElement = document.querySelector('#surface').lastElementChild
    // lastCustomElement.app.style.transform = 'translate3d(10px, 10px, 0)'

    // console.log(appDiv)

    this.active = false
    this.currentX = undefined
    this.currentY = undefined
    this.initialX = undefined
    this.initialY = undefined
    this.offsetX = 0
    this.offsetY = 0
  }

  static get observedAttributes () {
    return ['title']
  }

  connectedCallback () {
    this.appTitle.textContent = this.titleText

    this.appFooterCloseBtn.addEventListener('click', event => {
      this.setAttribute('hidden', '')
    })

    this.appHeaderCloseBtn.addEventListener('click', event => {
      this.setAttribute('hidden', '')
    })

    this.app.addEventListener('mousedown', event => {
      if (event.type === 'touchstart') {
        this.initialX = event.touches[0].clientX - this.offsetX
        this.initialY = event.touches[0].clientY - this.offsetY
      } else {
        this.initialX = event.clientX - this.offsetX
        this.initialY = event.clientY - this.offsetY
      }

      if (event.target === this.appHeader) {
        this.active = true
      }
    })

    this.app.addEventListener('mouseup', event => {
      this.app.classList.remove('app-focused')

      this.initialX = this.currentX
      this.initialY = this.currentY
      this.active = false
    })

    this.app.addEventListener('mousemove', event => {
      if (this.active) {
        event.preventDefault()
        this.app.classList.add('app-focused')

        if (event.type === 'touchmove') {
          this.initialX = event.touches[0].clientX - this.offsetX
          this.initialY = event.touches[0].clientY - this.offsetY
        } else {
          this.currentX = event.clientX - this.initialX
          this.currentY = event.clientY - this.initialY
        }

        if (this.currentX > 0 && this.currentY > 0) {
          let style2 = 'transform: translate3d(' + this.currentX + 'px, ' + this.currentY + 'px, 0)'
          this.app.setAttribute('style', style2)
        }
      }
    })
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'title') {
      this.titleText = newValue
    }
  }

  clearWindow () {
    this.appBody.innerHTML = ''
  }
}

window.customElements.define('window-form', Window)
