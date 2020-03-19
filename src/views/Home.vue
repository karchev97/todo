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
      notes:  this.$store.getters.NOTES,
      itemId: undefined
    }
  },
  methods: {
    // Удаление заметки
    deleteItem: function(id) {
      if(this.accept) {
        this.$store.commit('DELETE_TODO', id);
        this.itemId = undefined;
        this.accept = false;
      } else {
        this.accept = !this.accept;
        this.itemId = id;
      }
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
}
</script>

