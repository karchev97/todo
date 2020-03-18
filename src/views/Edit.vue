<template>
    <div class="edit-container">
        <div class="edit-block">
            <h1 contenteditable="true" @input="updateValue($event.target.innerHTML)" v-html="note.title"></h1>
            <ul class="list-items">
                <li v-for="item in note.items" :key="item.id">
                    <div 
                        :class="[{'ready-item-true': item.ready}, 'ready-item']"
                        @click="readyItem(note.id, item.id)"
                        ></div>
                    <strike v-if="item.ready" contenteditable="true">{{ item.text }}</strike>
                    <span v-else contenteditable="true">{{ item.text }}</span>
                    <span class="cart-delete" @click="deleteItem(item.id)">Удалить</span>
                </li>
            </ul>
            <div class="delete-todo" style="right: 15px;" >
                <img src="../assets/bin.svg" alt="Удалить" width="100%">
            </div>
            <form onsubmit="return false" class="add-todo-edit">
                <input type="text" class="input-todo input-todo-add" v-model="item" placeholder="Название пункта" required>
                <button type="submit" class="button-modal none add-button" @click="addNewItem()">+</button>
            </form>
            <button type="button" class="button-modal yeah save-button">Сохранить изменения</button>
            <button type="button" class="button-modal none save-button" @click="cancelChange()" v-if="showCancel">Отменить изменения</button>
            <button type="button" class="button-modal none save-button" @click="repeatChange()" v-if="showRepeat">Повторить изменения</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            id: this.$route.params.id,
            note: {},
            noteCopy: {},
            notes: this.$store.getters.NOTES,
            item: '',
            showCancel: false,
            showRepeat: false
        }
    },
    methods: {
        // readyItem: function(id, item) {
        //     const answ = {id: id, item: item};
        //     this.$store.commit('READY_ITEM', answ);
        // },
        updateValue: function(value) {
            this.$emit('input', value)
        },
        addNewItem: function() {
            let id = '_' + Math.random().toString(36).substr(2, 9);
            this.note.items.push({id: id, ready: false, text: this.item});
            this.item = '';
            this.showCancel = true;
            this.showRepeat = false;
        },
        deleteItem: function(id) {
            for(let i = 0; i < this.note.items.length; i++) {
                if(this.note.items[i].id == id) {
                    this.note.items.splice(i, 1);
                }
            }
            this.showCancel = true;
            this.showRepeat = false;
        },
        cancelChange: function() {
            const parse = JSON.stringify(this.note);
            localStorage.setItem('note', parse);
            this.note = {};
            this.notes = JSON.parse(localStorage.getItem('notes'));
            for(let i = 0; i < this.notes.length; i++) {
                if(this.notes[i].id == this.id) {
                    this.note = this.notes[i];
                }
            }
            this.showCancel = false;
            this.showRepeat = true;
        },
        repeatChange: function() {
            this.note = JSON.parse(localStorage.getItem('note'));
            this.showCancel = true;
            this.showRepeat = false;
        }
    },
    created() {
        for(let i = 0; i < this.notes.length; i++) {
            if(this.notes[i].id == this.id) {
                this.note = this.notes[i];
            }
        }
    }
}
</script>