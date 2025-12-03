import { defineStore } from 'pinia';

export const useBannerStore = defineStore('banner', {
  state: () => ({
    isVisible: true, // Banner ist standardmäßig sichtbar
  }),
  actions: {
    hideBanner() {
      this.isVisible = false; // Banner ausblenden
    },
    showBanner() {
      this.isVisible = true; // Banner wieder anzeigen
    }
  }
});
