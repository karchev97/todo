<template>
    <div class="edit-container">
        <div class="edit-block">
            <input class="input-edit" style="font-size: 32px; font-weight: 700;" 
            type="text" v-model="note.title" :class="{errorInput: !note.title}" 
            @input="showButtons(note.title)">
            <ul class="list-items">
                <li v-for="item in note.items" :key="item.id">
                    <div 
                        :class="[{'ready-item-true': item.ready}, 'ready-item']"
                        @click="readyItem(item.id)"
                        ></div>
                    <input 
                    v-if="item.ready" 
                    class="input-edit input-edit-small" type="text" 
                    v-model="item.text" 
                    style="display:inline; font-size: 20px; width: auto; color: #6b6b6d;"
                    @input="checkValue(item.text)"
                    :class="{errorInput: !item.text}">

                    <input 
                    v-else class="input-edit input-edit-small" type="text" 
                    v-model="item.text" style="display:inline; font-size: 20px; width: auto;"
                    @input="checkValue(item.text)"
                    :class="{errorInput: !item.text}">
                    <span class="cart-delete" @click="deleteItem(item.id)">Удалить</span>
                </li>
            </ul>
            <div class="delete-todo" style="right: 15px;" @click="delModal = !delModal">
                <img src="../assets/bin.svg" alt="Удалить" width="100%">
            </div>
            <form onsubmit="return false" class="add-todo-edit">
                <input 
                type="text" class="input-todo input-todo-add" 
                v-model="item" placeholder="Название пункта" 
                :class="{errorInput: isError}">
                <button type="submit" class="button-modal none add-button" @click="addNewItem()">+</button>
            </form>
            <button type="button" class="button-modal yeah save-button" @click="saveChanges()" :disabled="emptyField">Сохранить изменения</button>
            <button type="button" class="button-modal none save-button" @click="cancelChange()" v-if="showCancel">Отменить изменения</button>
            <button type="button" class="button-modal none save-button" @click="repeatChange()" v-if="showRepeat">Повторить изменения</button>
        </div>

        <!-- Модальные окна -->
        <div class="blur" :style="isDisplay" @click="infoModal = !infoModal"></div>
        <div class="modal-close modal-close-ok" :style="topMargin">
            <img src="../assets/accept.svg" alt="ok" width="30px"><h3>Заметка сохранена</h3>
        </div>

        <div class="blur" :style="isDisplayDel" @click="delModal = !delModal"></div>
        <div class="modal-close" :style="topMarginDel">
            <h3>Хотите удалить данную заметку?</h3>
            <button class="button-modal yeah" @click="deleteNote()">Да</button>
            <button class="button-modal none" @click="delModal = !delModal">Нет</button>
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
            notes: [],
            item: '',
            showCancel: false,
            showRepeat: false,
            infoModal: false,
            isError: false,
            delModal: false,
            accept: false,
            emptyField: false
        }
    },
    methods: {
        // Метод отслеживающий переключатель 'чекбокса' определенного пункта
        readyItem: function (item) {
            for (let i = 0; i < this.note.items.length; i++) {
                if (this.note.items[i].id == item) {
                    this.note.items[i].ready = !this.note.items[i].ready;
                }
            }
            this.showButtons();
        },
        // Метод добавления нового пункта к заметке
        addNewItem: function () {
            if (this.item) {
                let id = '_' + Math.random().toString(36).substr(2, 9);
                this.note.items.push({id: id, ready: false, text: this.item});
                this.item = '';
                this.showButtons();
                this.isError = false;
            } else {
                this.isError = true;
                return false;
            }
        },
        // Метод удаления пункта заметки
        deleteItem: function (id) {
            for (let i = 0; i < this.note.items.length; i++) {
                if (this.note.items[i].id == id) {
                    this.note.items.splice(i, 1);
                }
            }
            this.showButtons();
        },
        // Метод регулирующий отмену внесенных изменений
        cancelChange: function () {
            const parse = JSON.stringify(this.note);
            localStorage.setItem('note', parse);

            this.note = {};
            this.notes = JSON.parse(localStorage.getItem('notes'));
            for (let i = 0; i < this.notes.length; i++) {
                if (this.notes[i].id == this.id) {
                    this.note = this.notes[i];
                }
            }
            this.showCancel = false;
            this.showRepeat = true;
        },
        // Метод регулирущий повтор изменений
        repeatChange: function () {
            this.note = JSON.parse(localStorage.getItem('note'));
            this.showButtons();
        },
        // Метод отображеия кнопок "Отменить изменения" и "Повторить изменения"
        showButtons: function (title) {
            this.showCancel = true;
            this.showRepeat = false;
            this.checkValue(title);
        },
        // Метод сохранения изменений в заметке
        saveChanges: function () {
            this.$store.commit('SAVE_CHANGES', this.note);
            this.infoModal = true;
            setTimeout(() => {
                this.infoModal = false
            }, 4000);
            this.showCancel = false;
            this.showRepeat = false;
        },
        // Метод проверки на пустые поля
        checkValue: function (text) {
            if (text == '') {
                this.emptyField = true;
            } else {
                this.emptyField = false;
            }
        },
        // Метод удаления заметки
        deleteNote: function () {
            this.$store.commit('DELETE_TODO', this.id);
            this.delModal = false;
            this.accept = false;
            this.$router.push('/');
        }
    },
    created() {
        this.notes = JSON.parse(localStorage.getItem('notes'));
        for (let i = 0; i < this.notes.length; i++) {
            if (this.notes[i].id == this.id) {
                this.note = this.notes[i];
            }
        }
    },
    computed: {
        // Различные методы, отвечающие за стили элементов
        isDisplay: function () {
            return {
                display: this.infoModal ? 'block' : 'none'
            }
        },
        topMargin: function () {
            return {
                top: this.infoModal ? '25px' : '-400px'
            }
        },
        isDisplayDel: function () {
            return {
                display: this.delModal ? 'block' : 'none'
            }
        },
        topMarginDel: function () {
            return {
                top: this.delModal ? '25px' : '-400px'
            }
        },
        
    },
}
</script>