<template>
  <div class="todo-container">
    <Note 
      v-for="todo in todos"  
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
import Note from '../components/note'

export default {
  components: {
    Note
  },
  data() {
    return {
      accept: false,
      itemId: undefined,
      todos: [
        {
          id: 0,
          title: 'Мой план на текущий день',
          items: [
            {id:0, ready: true, text: 'Заниматься спортом 1.5 часа'},
            {id:1, ready: true, text: 'Прочитать 10 страниц книги'},
            {id:2, ready: false, text: 'Питаться только полезной пищей'},
            {id:3, ready: true, text: 'Играть на гитаре 5 часов в день'}
          ]
        },
        {
          id: 1,
          title: 'Мой план 16/03/2020',
          items: [
            {id:0, ready: true, text: 'Заниматься спортом 1.5 часа'},
            {id:1, ready: true, text: 'Прочитать 10 страниц книги'},
            {id:2, ready: false, text: 'Питаться только полезной пищей'},
          ]
        },
        {
          id: 2,
          title: 'Мой план 26/03/202',
          items: [
            {id:0, ready: true, text: 'Заниматься спортом 1.5 часа'},
            {id:2, ready: false, text: 'Питаться только полезной пищей'},
            {id:3, ready: true, text: 'Играть на гитаре 5 часов в день'}
          ]
        }
      ],
    }
  },
  methods: {
    // Удаление заметки
    deleteItem: function(id) {
      if(this.accept) {
        for(let i = 0; i < this.todos.length; i++){
          if(this.todos[i].id === id) this.todos.splice(i, 1);
          this.itemId = undefined;
          this.accept = false;
        }
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

<style lang="scss">
.todo-container {
  display: flex;
  flex-direction: row;
  justify-content: start;
  margin: 0 auto;
  flex-wrap: wrap;
}
</style>
