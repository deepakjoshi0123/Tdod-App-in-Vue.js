<template>
  <div>
    <input
      type="text"
      class="todo-input"
      placeholder="What needs to be done"
      v-model="newTodo"
      @keyup.enter="addTodo"
    />

    <todo-item v-for="todo in todosFiltered" :key="todo.id" :todo="todo" :checkAll="!anyRemaining">
    </todo-item>

    <div class="extra-container">
      <todo-check-all></todo-check-all>
      <todo-items-remaining></todo-items-remaining>
    </div>
    <!-- end extra-container -->

    <div class="extra-container">
      <todo-filtered></todo-filtered>

      <div>
        <todo-clear-completed></todo-clear-completed>
      </div>
    </div>
    <!-- end extra-container -->
  </div>
</template>

<script>
import TodoItem from './TodoItem';
import TodoItemsRemaining from './TodoItemsRemaining';
import TodoCheckAll from './TodoCheckAll';
import TodoFiltered from './TodoFiltered';
import TodoClearCompleted from './TodoClearCompleted';

export default {
  name: 'todo-list',
  components: {
    TodoItem,
    TodoItemsRemaining,
    TodoCheckAll,
    TodoFiltered,
    TodoClearCompleted,
  },
  data() {
    return {
      newTodo: '',
      idForTodo: 3,
    };
  },
  computed: {
    anyRemaining() {
      return this.$store.getters.anyRemaining;
    },
    todosFiltered() {
      return this.$store.getters.todosFiltered;
    },
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim().length == 0) {
        return;
      }

      this.$store.dispatch('addTodo', {
        id: this.idForTodo,
        title: this.newTodo,
      });

      this.newTodo = '';
      this.idForTodo++;
    },
  },
};
</script>

<style>
.todo-input {
  width: 90%;
  padding: 10px 16px;
  font-size: 15px;
  margin-bottom: 20px;
  margin-left: 30px;
}

.todo-item {
  width: 90%;
  margin-left: 30px;
  font-size: 15px;
  font-style: italic;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.remove-item {
  cursor: pointer;
  margin-left: 14px;
}

.todo-item-left {
  display: flex;
  align-items: center;
}

.todo-item-label {
  padding: 10px;
  border: 1px solid white;
  margin-left: 12px;
}

.todo-item-edit {
  width: 90%;
  margin-left: 30px;
  font-size: 15px;
  color: #2c3e50;
  margin-left: 12px;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

.completed {
  text-decoration: line-through;
  color: grey;
}

.extra-container {
  width: 90%;
  margin-left: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  border-top: 1px solid lightgrey;
  padding-top: 14px;
  margin-bottom: 14px;
}

button {
  background-color: #1d1416;
  border: none;
  color: white;
  padding: 12px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px 20px;
  cursor: pointer;
  border-radius: 10px;
}

.active {
  background: rgb(13, 104, 241);
}
</style>
