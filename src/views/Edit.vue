<template>
    <div class="edit-container">
        <div class="edit-block">
            <input class="input-edit" style="font-size: 32px; font-weight: 700;" type="text" v-model="note.title" @input="showButtons()">
            <ul class="list-items">
                <li v-for="item in note.items" :key="item.id">
                    <div 
                        :class="[{'ready-item-true': item.ready}, 'ready-item']"
                        @click="readyItem(item.id)"
                        ></div>
                    <input v-if="item.ready" class="input-edit" type="text" v-model="item.text" style="display:inline; font-size: 20px; width: auto; color: #6b6b6d;">
                    <input v-else class="input-edit" type="text" v-model="item.text" style="display:inline; font-size: 20px; width: auto;">
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
            <button type="button" class="button-modal yeah save-button" @click="saveChanges()">Сохранить изменения</button>
            <button type="button" class="button-modal none save-button" @click="cancelChange()" v-if="showCancel">Отменить изменения</button>
            <button type="button" class="button-modal none save-button" @click="repeatChange()" v-if="showRepeat">Повторить изменения</button>
        </div>
        <div class="blur" :style="isDisplay" @click="infoModal = !infoModal"></div>
        <div class="modal-close modal-close-ok" :style="topMargin">
            <img src="../assets/accept.svg" alt="ok" width="30px"><h3>Заметка сохранена</h3>
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
            showRepeat: false,
            infoModal: false
        }
    },
    methods: {
        readyItem: function(item) {
            for(let i = 0; i < this.note.items.length; i++) {
                if(this.note.items[i].id == item) {
                    this.note.items[i].ready = !this.note.items[i].ready;
                }
            }
            this.showButtons();
        },
        addNewItem: function() {
            let id = '_' + Math.random().toString(36).substr(2, 9);
            this.note.items.push({id: id, ready: false, text: this.item});
            this.item = '';
            this.showButtons();
        },
        deleteItem: function(id) {
            for(let i = 0; i < this.note.items.length; i++) {
                if(this.note.items[i].id == id) {
                    this.note.items.splice(i, 1);
                }
            }
            this.showButtons();
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
            this.showButtons();
        },
        showButtons: function() {
            this.showCancel = true;
            this.showRepeat = false;
        },
        saveChanges: function() {
            this.$store.commit('SAVE_CHANGES', this.note);
            this.infoModal = true;
            setTimeout(() => {
                this.infoModal = false
            }, 4000);
        }
    },
    created() {
        for(let i = 0; i < this.notes.length; i++) {
            if(this.notes[i].id == this.id) {
                this.note = this.notes[i];
            }
        }
    },
    computed: {
    isDisplay: function() {
      return {
        display: this.infoModal ? 'block' : 'none'
      }
    },
    topMargin: function() {
      return {
        top: this.infoModal ? '25px' : '-400px'
      }
    }
  },
}
</script>