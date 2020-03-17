<template>
  <div class="todo-container">
    <Note 
      v-for="todo in notes"  
      :key="todo.id"
      :id="todo.id"
      :title="todo.title"
      :items="todo.items"
      @delete-item="deleteItem($event)"
    />

    <div class="blur" :style="isDisplay" @click="accept = !accept"></div>
    <div class="modal-close" :style="topMargin">
      <h3>Хотите удалить данную заметку?</h3>
      <button class="button-modal yeah" @click="deleteItem(itemId)">Да</button>
      <button class="button-modal none" @click="accept = !accept">Нет</button>
    </div>
  </div>
</template>

<script>
import Note from '../components/Note'

export default {
  components: {
    Note
  },
  data() {
    return {
      accept: false,
      itemId: undefined,
      notes: [],
    }
  },
  methods: {
    // Удаление заметки
    deleteItem: function(id) {
      if(this.accept) {
        for(let i = 0; i < this.notes.length; i++){
          if(this.notes[i].id === id) {
            this.notes.splice(i, 1);
            this.saveTodo();
          }
          this.itemId = undefined;
          this.accept = false;
        }
      } else {
        this.accept = !this.accept;
        this.itemId = id;
      }
    },
    saveTodo: function() {
      const parse = JSON.stringify(this.notes);
      localStorage.setItem('notes', parse);
    }
  },
  computed: {
    isDisplay: function() {
      return {
        display: this.accept ? 'block' : 'none'
      }
    },
    topMargin: function() {
      return {
        top: this.accept ? '25px' : '-400px'
      }
    }
  },
  mounted() {
    if (localStorage.getItem('notes')) {
      try {
        this.notes = JSON.parse(localStorage.getItem('notes'))
      } catch (e) {
        localStorage.removeItem('notes')
      }
    }
  }
}
</script>

