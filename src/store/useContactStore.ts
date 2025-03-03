import { defineStore } from 'pinia'
import axios from 'axios';


interface State {
  contacts: User[];
  newContacts: User[];
  error: string;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number
}

export const useContactStore = defineStore("useContactStore", {
  state: (): State => {
    return {
      contacts: [],
      newContacts: [],
      error: ''
    };
  },
  actions: {
    async get() {
      try {
        const getData = await axios.get('https://dummyjson.com/users?limit=100&skip=0&select=firstName,lastName,age');
        this.contacts = getData.data.users;
      } catch (err) {
        this.error = 'Error fetching data';
      }
    },

    async add(val: User) {

      if (val) {
        if (this.newContacts && this.newContacts.length > 0) {
          const newId = this.newContacts.length ? Math.max(...this.newContacts.map(item => item.id)) + 1 : 1;
          this.newContacts.push({
            id: newId,
            firstName: val.firstName,
            lastName: val.lastName,
            age: val.age,
          });
        } else {
          const newId = this.contacts.length ? Math.max(...this.contacts.map(item => item.id)) + 1 : 1;
          this.contacts.push({
            id: newId,
            firstName: val.firstName,
            lastName: val.lastName,
            age: val.age,
          });
          this.newContacts = this.contacts;
        }
      }
    }
  },
});
