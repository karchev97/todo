<template>
    <div class="create-todo">
        <div class="blur-add " v-if="isShow" @click="$emit('close-modal', false)"></div>
        <div class="modal-close" :style="topOffset">
        <h3>Добавление новой заметки</h3>
        <form onsubmit="return false">
            <h4 class="title-form">Название заметки</h4>
            <input type="text" class="input-todo" v-model="todoTitle" placeholder="Название заметки" required>
            <h4 class="title-form">Пункты</h4>
            <div class="container-items" v-for="(item, index) in items" :key="index">
                <input type="text" class="input-todo input-todo-item" v-model="item.title" :style="widthInput" placeholder="Название пункта" required>
                <button type="button" v-if="items.length > 1" class="delete-item" @click="deleteItem(index)">Удалить</button>
            </div>   
            <div class="container-center">
                <button type="button" class="add-item" @click="addItem()">+ Добавить пункт</button>
            </div>
            <button type="submit" class="button-modal yeah" @click="addTodo()">Готово</button>
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
        }
    },
    methods: {
        deleteItem: function(index) {
            this.items.splice(index, 1)
        },
        addItem: function() {
            this.items.push({title: ''})
        },
        addTodo: function() {
            // генерируем id
            if (this.todoTitle && this.items[0].title != '') {
                let id = `f${(+new Date).toString(16)}`;
                let items = [];
                
                for (let i = 0; i < this.items.length; i++) {
                    let id = i;
                    let ready = false;
                    let text = this.items[i].title; 

                    items.push({id: id, ready: ready, text: text});
                }
                let todoObj = { id: id, title: this.todoTitle, items: items };
                this.$store.commit('ADD_TODO', todoObj);
                this.saveTodo();
            }
        },
        saveTodo: function() {
            const parse = JSON.stringify(this.notes);
            localStorage.setItem('notes', parse);
            this.clearTodos();
            this.isShow = false;
        },
        clearTodos: function() {
            this.todoTitle = '';
            this.items = [{title: ''}];
        }
    },
    computed: {
        widthInput: function() {
            return {
                width: this.items.length > 1 ? 'auto' : '100%'
            }
        },
        topOffset: function() {
            return {
                top: this.isShow ? '25px' : '-400px'
            }
        }
    }
}
</script>