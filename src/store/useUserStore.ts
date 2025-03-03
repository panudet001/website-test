import { defineStore } from 'pinia'

interface State {
  name: string;
  image: string;
}

export const useUserStore = defineStore("useUserStore", {
  state: (): State => {
    return {
      name: 'Panudet Prommate',
      image: '/profile.png',
    };
  },
  actions: {
    async setImage(file: File) {
      if (file) {
        const reader = new FileReader()
        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target && typeof e.target.result === 'string') {
            this.image = e.target.result // แปลงเป็น Base64
          }

        }
        reader.readAsDataURL(file)
      }
    }
  },
});
