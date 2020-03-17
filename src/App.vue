<template>
  <div id="app">
    <!-- Шапка -->
    <header class="main-header-container">
      <div class="main-header">
        <h1>TodoApp</h1>
        <button>Добавить заметку <span>+</span></button>
      </div>
    </header>

    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="scss">

@import url(./scss/main.scss);

.main-header-container {
  background-color: #343436;
}

.main-header {
  padding: 15px 0;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > h1 {
    font-family: 'Roboto Condensed', sans-serif;
    color: #f3f3f3;
  }

  & > button {
    font-family: 'Roboto Condensed', sans-serif;
    color: #fff;
    background-color: #343436;
    border: 2px solid ;
    padding: 8px 22px;
    border-radius: 18px;
    outline: none;
    transition: 0.7s all;

    & > span {
      font-weight: 900;
    }

    &:hover {
      cursor: pointer;
      background: #3b3b3d;
      color: #fff;
    }
  }
}
</style>
