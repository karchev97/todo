<template>
  <div id="app">
    <!-- Шапка -->
    <header class="main-header-container">
      <div class="main-header">
        <h1>TodoApp</h1>
        <button @click="isShow = !isShow">Добавить заметку <span>+</span></button>
      </div>
    </header>

    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
    <Add :is-show="isShow" @close-modal="closeModal($event)"></Add>
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
      closeModal: function(bool) {
        this.isShow = bool
      }
    }
    
  }
</script>
