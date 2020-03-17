<template>
    <article class="note" @mouseenter="isHover=true" @mouseleave="isHover=false">
        <h2>{{title}}</h2>
        <ul>
            <li v-for="item in items" :key="item.id">
                <div :class="[{'ready-item-true': item.ready}, 'ready-item']"></div>
                <strike v-if="item.ready">{{ item.text }}</strike>
                <span v-else>{{ item.text }}</span>
            </li>
        </ul>

        <div class="edit-todo" :style="rightMarg">
            <img src="../assets/edit.svg" alt="Удалить" width="100%">
        </div>

        <div class="delete-todo" :style="rightMarg" @click="$emit('delete-item', id)">
            <img src="../assets/bin.svg" alt="Удалить" width="100%">
        </div>
    </article>
</template>

<script>
export default {
    props: {
        id: Number,
        title: String,
        items: Array
    },
    data() {
        return {
            isHover: false
        }
    },
    methods: {
        deleteItem: function(id) {
            console.log(id)
        }
    },
    computed: {
        rightMarg: function() {
            return {
                right: this.isHover ? '15px' : '-55px'
            }
        }
    }
}
</script>

<style lang="scss">
.note {
    width: 27.5%;
    background-color: #333335;
    padding: 18px 18px 18px 25px;
    border-radius: 16px;
    position: relative;
    overflow: hidden;
    margin: 0 0.6% 18px;
    min-height: 177px;

    font-family: 'Roboto Condensed', sans-serif;
    color: #f3f3f3;

    & > h2 {
        margin-top: 10px;
        font-size: 20px;
    }

    & > ul {
        list-style: none;
        padding-left: 0;

        & > li {
            padding-bottom: 5px;
            color: #5e5e5f;
            display: flex;

            & .ready-item {
                width: 14px;
                height: 14px;
                border: 2px solid #3b3b3d;
                border-radius: 50%;
                margin-right: 7px;
            }

            & .ready-item-true {
                border: 2px solid #426520;
            }
        }
    }
}

.edit-todo,
.delete-todo {
    position: absolute;
    width: 16px;
    height: 16px;
    background: #fff;
    border-radius: 50%;
    padding: 12px;
    top: 15px;
    transition: all 0.7s;
    box-shadow: 3px 3px 10px #232323;

    &:hover {
        cursor: pointer;
    }
}

.edit-todo {
    top: 70px;
}
</style>