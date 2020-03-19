<template>
  <div id="app">
    <!-- Шапка -->
    <header class="main-header-container">
      <div class="main-header">
        <h1><router-link to="/">TodoApp</router-link></h1>
        <button @click="isShow = !isShow">Добавить заметку <span>+</span></button>
      </div>
    </header>
    <router-view/>
    <Add :is-show="isShow" @change-is="isShow = false" @close-modal="closeModal($event)"></Add>
  </div>
</template>

<script>
import Add from './components/Add'

  export default {
    name: 'app',
    components: {
      Add
    },
    data() {
      return {
        isShow: false,
      }
    },
    methods: {
      // метод закрытия модального окна
      closeModal: function (bool) {
        this.isShow = bool
      }
    },
  }
  
</script>
