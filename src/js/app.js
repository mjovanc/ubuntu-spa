/**
 * Starting point of the application
 *
 * @author Marcus Cvjeticanin
 * @version 1.0
 */

import { Window } from './window/window.js'
import { Chat } from './chat/chat.js'
import { Clock } from './clock/clock.js'
import { Memory } from './memory/memory.js'
import { Settings } from './settings/settings.js'
import displayCurrentTime from './time/time.js'

let apps = document.querySelector('#apps')
let time = document.querySelector('#display-current-time')

displayCurrentTime(time)

apps.addEventListener('click', event => {
  if (event.target.alt === 'chat') {
    let chat = document.createElement('chat-form')
    chat.setAttribute('title', 'Chat X')
    document.querySelector('#surface').appendChild(chat)
  } else if (event.target.alt === 'clock') {
    let clock = document.createElement('clock-form')
    clock.setAttribute('title', 'Clock')
    document.querySelector('#surface').appendChild(clock)
  } else if (event.target.alt === 'memory-game') {
    let memory = document.createElement('memory-form')
    memory.setAttribute('title', 'Memory Game')
    document.querySelector('#surface').appendChild(memory)
  } else if (event.target.alt === 'settings') {
    let settings = document.createElement('settings-form')
    settings.setAttribute('title', 'Settings')
    document.querySelector('#surface').appendChild(settings)
  }
})
