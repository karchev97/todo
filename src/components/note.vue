<template>
    <article class="note" @mouseenter="isHover=true" @mouseleave="isHover=false">
        <h2>{{title}}</h2>
        <ul>
            <li v-for="item in items.slice(0, 4)" :key="item.id">
                <div :class="[{'ready-item-true': item.ready}, 'ready-item']"></div>
                <strike v-if="item.ready">{{ item.text }}</strike>
                <span v-else>{{ item.text }}</span>
            </li>
        </ul>

        <router-link :to="'/edit/'+id" class="edit-todo" :style="rightMarg">
            <img src="../assets/edit.svg" alt="Редактировать" width="100%">
        </router-link>

        <div class="delete-todo" :style="rightMarg" @click="$emit('delete-item', id)">
            <img src="../assets/bin.svg" alt="Удалить" width="100%">
        </div>
    </article>
</template>

<script>
export default {
    props: {
        id: String,
        title: String,
        items: Array
    },
    data() {
        return {
            isHover: false
        }
    },
    computed: {
        // Различные методы, отвечающие за стили элементов
        rightMarg: function() {
            return {
                right: this.isHover ? '15px' : '-55px'
            }
        }
    }
}
</script>