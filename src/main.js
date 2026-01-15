import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import { createAuth0 } from '@auth0/auth0-vue'

import './assets/style.css'

const app = createApp(App)

const auth0 = createAuth0({
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,

  cacheLocation: 'localstorage',

  authorizationParams: {
    audience: import.meta.env.VITE_AUTH0_AUDIENCE,
    redirect_uri: import.meta.env.VITE_AUTH0_REDIRECT_URI
  },

  onRedirectCallback: (appState) => {
    if (!appState || !appState.returnTo) return

    router.isReady().then(() => {
      router.push(appState.returnTo)
    })
  }
})

app.use(createPinia())
app.use(router)
app.use(auth0)

app.mount('#app')
