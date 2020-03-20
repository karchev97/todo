<template>
    <div class="create-todo">
        <div class="blur-add " v-if="showModal" @click="$emit('close-modal', false)"></div>
        <div class="modal-close" :style="topOffset">
        <h3>Добавление новой заметки</h3>
        <form onsubmit="return false">
            <h4 class="title-form">Название заметки</h4>
            <input type="text" class="input-todo" @input="checkFrom()" v-model="todoTitle" placeholder="Название заметки" required>
            <h4 class="title-form">Пункты</h4>
            <div class="container-items" v-for="(item, index) in items" :key="index">
                <input type="text" class="input-todo input-todo-item" 
                v-model="item.title" :style="widthInput" placeholder="Название пункта" 
                @input="checkFrom(item.title)" required>
                <button type="button" v-if="items.length > 1" class="delete-item" @click="deleteItem(index)">Удалить</button>
            </div>   
            <div class="container-center">
                <button type="button" class="add-item" @click="addItem()">+ Добавить пункт</button>
            </div>
            <button type="submit" class="button-modal yeah" @click="addTodo()" :disabled="activeButton">Готово</button>
            <button type="button" class="button-modal none" @click="$emit('close-modal', false)">Отмена</button>
        </form>
        
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isShow: Boolean
    },
    data() {
        return {
            todoTitle: '',
            items: [
                {title: ''}
            ],
            notes: this.$store.getters.NOTES,
            showModal: this.isShow,
            activeButton: true
        }
    },
    methods: {
        // Метод удаления пункта
        deleteItem: function (index) {
            this.items.splice(index, 1);
            this.checkFrom();
        },
        // Метод добавления пункта
        addItem: function () {
            this.items.push({title: ''});
            this.activeButton = true;
        },
        // Метод добавления заметки
        addTodo: function () {
            // генерируем id
            if (this.todoTitle && this.items[0].title != '') {
                let id = `f${(+new Date).toString(16)}`;
                let items = [];
                
                for (let i = 0; i < this.items.length; i++) {
                    let id = '_' + Math.random().toString(36).substr(2, 9);
                    let ready = false;
                    let text = this.items[i].title; 

                    items.push({id: id, ready: ready, text: text});
                }
                let todoObj = { id: id, title: this.todoTitle, items: items };
                this.$store.commit('ADD_TODO', todoObj);
                this.saveTodo();
                this.$emit('change-is');
            }
        },
        // Метод сохранения заметки 
        saveTodo: function () {
            this.clearTodos();
            this.showModal = false;
        },
        // Метод, очищающий необходимые служебные переменные
        clearTodos: function () {
            this.todoTitle = '';
            this.items = [{title: ''}];
        },
        chackAllItems: function () {
            for (let i = 0; i < this.items.length; i++) {
                if (this.items[i].title == '') {
                    this.activeButton = true;
                    return false;
                } else {
                    this.activeButton = false;
                }
            }
        },
        checkFrom: function (titleItem) {
            if (titleItem == '') {
                this.activeButton = true;
                return false;
            }
            if (titleItem) {
                if (this.todoTitle == '') {
                    this.activeButton = true;
                } else {
                    this.chackAllItems();
                }
            } else {
                if (this.todoTitle == '') {
                    this.activeButton = true;
                } else {
                    this.chackAllItems();
                }
            }
        }
    },
    computed: {
        // Различные методы, отвечающие за стили элементов
        widthInput: function () {
            return {
                width: this.items.length > 1 ? 'auto' : '100%'
            }
        },
        topOffset: function () {
            return {
                top: this.showModal ? '25px' : '-900px'
            }
        },
    },
    watch: {
        isShow: function () {
            this.showModal = this.isShow
        },
    }
}
</script>