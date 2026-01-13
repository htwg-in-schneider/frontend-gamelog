import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router';
import { createAuth0 } from '@auth0/auth0-vue';

import './assets/style.css'; // globales CSS

const app = createApp(App);
const pinia = createPinia();

const auth0 = createAuth0({
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
    authorizationParams: {
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        redirect_uri: window.location.origin
    }
})

app.use(pinia);
app.use(router);
app.use(auth0)
app.mount('#app');
