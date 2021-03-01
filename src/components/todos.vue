<template>
  <div>
    <input
      type="text"
      class="todo-input"
      placeholder="what needs to be done "
      @keyup.enter="addTodo"
      v-model="newTodo"
    />
    <!-- v-modal is used for two way bindings -->
    <todo-item
      v-for="(todo, index) in todosFiltered"
      :key="todo.id"
      :todo="todo"
      :index="index"
      :checkAll="!isRemaining"
      @removedTodo="removeTodo"
      @finishedEdit="finishedEdit"
    >
    </todo-item>
    <div class="extra-container">
      <div>
        <label
          ><input
            type="checkbox"
            :checked="!isRemaining"
            @change="(event) => checkAllTodo(event)"
          />
          Check All
        </label>
      </div>
      <div>{{ remaining }} items left</div>
    </div>
    <div class="extra-container">
      <div>
        <button :class="{ active: filter === 'all' }" @click="filter = 'all'">All</button>
        <button :class="{ active: filter === 'completed' }" @click="filter = 'completed'">
          Completed
        </button>
        <button :class="{ active: filter === 'active' }" @click="filter = 'active'">Active</button>
      </div>
      <div>
        <button v-if="showClearButton" @click="clearCompleted">clear completed</button>
      </div>
    </div>
  </div>
</template>

<script>
import todoItem from './todoItem';
export default {
  name: 'todo',
  props: {
    msg: String,
  },
  components: {
    todoItem,
  },
  data() {
    return {
      newTodo: '',
      todoId: 4,
      todoEditCache: '',
      filter: 'all',
      todoList: [
        {
          id: 1,
          title: 'Read Vue docs',
          completed: false,
          editing: false,
        },
        {
          id: 2,
          title: 'make a todo app in Vue',
          completed: false,
          editing: false,
        },
        {
          id: 3,
          title: 'generate sitemap for staredown',
          completed: false,
          editing: false,
        },
      ],
    };
  },
  computed: {
    remaining() {
      return this.todoList.filter((todo) => !todo.completed).length;
    },
    isRemaining() {
      return this.remaining != 0;
    },
    todosFiltered() {
      if (this.filter === 'all') {
        return this.todoList;
      } else if (this.filter === 'active') {
        return this.todoList.filter((todo) => !todo.completed);
      } else if (this.filter === 'completed') {
        return this.todoList.filter((todo) => todo.completed);
      }
      return this.todoList;
    },
    showClearButton() {
      return this.todoList.filter((todo) => todo.completed).length > 0;
    },
  },

  methods: {
    checkAllTodo(event) {
      this.todoList.forEach((todo) => (todo.completed = event.target.checked));
    },
    addTodo() {
      if (this.newTodo.trim().length == 0) {
        return;
      }
      this.todoList.push({
        id: this.todoId,
        title: this.newTodo,
        completed: false,
        editing: false,
      });
      this.newTodo = '';
      this.todoId++;
    },
    removeTodo(index) {
      this.todoList.splice(index, 1);
    },
    // editTodo(todo) {
    //   this.todoEditCache = todo.title;
    //   todo.editing = true;
    // },
    // doneEditing(todo) {
    //   if (todo.title.trim() == '') {
    //     todo.title = this.todoEditCache;
    //     return;
    //   }
    //   console.log('checking my state ', this.todoList);
    //   todo.editing = false;
    // },
    // cancelEdit(todo) {
    //   todo.title = this.todoEditCache;
    //   todo.editing = false;
    // },
    clearCompleted() {
      this.todoList = this.todoList.filter((todo) => !todo.completed);
    },
    finishedEdit(data) {
      this.todoList.splice(data.index, 1, data.todo);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.todo-input {
  width: 100%;
  padding: 10px 10px;
  font-size: 15px;
  margin-bottom: 16px;
}
.todo-item {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.remove-item {
  cursor: pointer;
  margin-left: 15px;
}
.todo-item-edit {
  font-size: 24px;
  color: black;
  margin-left: 12px;
  width: 50%;
  padding: 10px;
  border: 1px solid;
}
.completedTodos {
  text-decoration: line-through;
  color: grey;
}
.extra-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  margin-bottom: 14px;
  padding-top: 14px;
  border-top: 1px solid lightgrey;
}
.active {
  background-color: rgb(44, 126, 202);
}
</style>
