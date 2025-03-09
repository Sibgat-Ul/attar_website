import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { definePreset } from '@primevue/themes';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

import App from './App.vue'
import router from './router'
import './index.css'


const MyPreset = definePreset(Aura, {
    components: {
        carousel: {
            indicator: {
                borderRadius: '50%',
                height: '10px',
                width: '10px',
                backgroundColor: '#111',
            }
        },
        card: {
            shadow: "0px",
            padding: ".2 rem"
        }
    }
});


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: MyPreset
    }
})

app.mount('#app')
