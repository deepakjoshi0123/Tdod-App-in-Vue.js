<template>
  <div class="todo-item">
    <div class="todo-item-left">
      <input type="checkbox" v-model="todo.completed" @change="doneEdit" />
      <!-- but why data is not sync with props  -->
      <div
        v-if="!editing"
        @dblclick="editTodo"
        class="todo-item-label"
        :class="{ completed: todo.completed }"
      >
        {{ title }}
      </div>
      <input
        v-else
        class="todo-item-edit"
        type="text"
        v-model="title"
        @blur="doneEdit"
        @keyup.enter="doneEdit"
        @keyup.esc="cancelEdit"
        v-focus
      />
    </div>
    <!-- end todo-item-left -->
    <div>
      <span class="remove-item" @click="removeTodo(todo.id)">
        &times;
      </span>
    </div>
  </div>
  <!-- end todo-item -->
</template>

<script>
export default {
  name: 'todo-item',
  props: {
    todo: {
      type: Object,
      required: true,
    },
    checkAll: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    console.log('checking data () of vue ', this.todo);
    return {
      id: this.todo.id,
      title: this.todo.title,
      completed: this.todo.completed,
      editing: this.todo.editing,
      beforeEditCache: '',
    };
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      },
    },
  },
  methods: {
    removeTodo(id) {
      this.$store.dispatch('deleteTodo', id);
    },
    editTodo() {
      this.beforeEditCache = this.title;
      this.editing = true;
    },
    doneEdit() {
      console.log('checking this value ');
      if (this.title.trim() == '') {
        this.title = this.beforeEditCache;
      }
      this.editing = false;
      this.$store.dispatch('updateTodo', {
        id: this.id,
        title: this.title,
        completed: this.todo.completed, // why it's not working like above statements
        editing: this.editing,
      });
    },
    cancelEdit() {
      this.title = this.beforeEditCache;
      this.editing = false;
    },
  },
};
</script>
