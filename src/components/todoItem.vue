<template>
  <div class="todo-item">
    <!-- v-model is very imp as it doesn't needs onchange and each time updating state /data -->
    <input type="checkbox" v-model="completed" @change="doneEditing()" />
    <div v-if="!editing" @dblclick="editTodo" :class="{ completedTodos: completed }">
      {{ title }}
    </div>
    <input
      v-else
      v-focus
      v-model="title"
      class="todo-item-edit"
      type="text"
      @blur="doneEditing(todo)"
      @keyup.enter="doneEditing(todo)"
      @keyup.esc="cancelEdit(todo)"
    />
    <div class="remove-item" @click="removeTodo(index)">&times;</div>
  </div>
</template>

<script>
export default {
  name: 'todo-irem',
  props: {
    todo: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    checkAll: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      id: this.todo.id,
      title: this.todo.title,
      completed: this.todo.completed,
      editing: this.todo.completed,
      beforeEditCache: '',
    };
  },
  watch: {
    checkAll() {
      // setting watcher on checkAll props
      if (this.checkAll) {
        this.completed = true;
      } else {
        this.completed = this.todo.completed;
      }
    },
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      },
    },
  },
  methods: {
    removeTodo(index) {
      this.$emit('removedTodo', index);
    },
    editTodo() {
      this.beforeEditCache = this.title;
      this.editing = true;
    },
    doneEditing() {
      if (this.title.trim() == '') {
        this.title = this.todoEditCache;
        return;
      }
      this.editing = false;
      this.$emit('finishedEdit', {
        index: this.index,
        todo: {
          id: this.id,
          title: this.title,
          completed: this.completed,
          editing: this.editing,
        },
      });
    },
    cancelEdit() {
      this.title = this.todoEditCache;
      this.editing = false;
    },
  },
};
</script>
