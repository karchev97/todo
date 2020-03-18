import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notes: JSON.parse(localStorage.getItem('notes')),
  },
  getters: {
    NOTES: state => {
      return state.notes
    },
  },
  mutations: {
    DELETE_TODO: (state, id) => {
      for(let i = 0; i < state.notes.length; i++){
        if(state.notes[i].id === id) {
          state.notes.splice(i, 1);
          const parse = JSON.stringify(state.notes);
          localStorage.setItem('notes', parse);
        }
      }
    },
    ADD_TODO: (state, obj) => {
      state.notes.push(obj);
      const parse = JSON.stringify(state.notes);
      localStorage.setItem('notes', parse);
    },
    // READY_ITEM: (state, obj) => {
    //   for(let i = 0; i < state.notes.length; i++) {
    //     if(state.notes[i].id === obj.id) {
    //       for(let x = 0; x < state.notes[i].items.length; x++) {
    //         if(state.notes[i].items[x].id == obj.item) {
    //           state.notes[i].items[x].ready = !state.notes[i].items[x].ready;
    //         }
    //       }
    //     }
    //   }
    //   const parse = JSON.stringify(state.notes);
    //   localStorage.setItem('notes', parse);
    // }
  },
  actions: {

  },
  modules: {
  }
})
