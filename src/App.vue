<template>
  <div id="app">

    <div id="root">
      <div class="todo-container">
        <div class="todo-wrap">
          <vueHeader @receiveHtoboObj="receiveHtoboObj" />
          <vueList :todos="todos" />
          <vueFooter :todos="todos" @checkAll1="checkAll1" @clearAll="clearAll" />

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pubsub from 'pubsub-js'
import vueHeader from './components/vueHeader.vue'
import vueList from './components/vueLsit.vue'
import vueFooter from './components/vueFooter.vue'



export default {
  name: 'App',
  components: {
    vueHeader,
    vueList,
    vueFooter
  },
  data() {
    return {
      todos: JSON.parse(localStorage.getItem('todos')) || []
    }
  },
  methods: {
    receiveHtoboObj(HtodoObj) {
      this.todos.unshift(HtodoObj)
    },
    cheacTodo(id) {
      // console.log(1111)
      this.todos.forEach((todoObj) => {
        if (todoObj.id === id) todoObj.done = !todoObj.done
      })


    },
    deleteTodo(_, id) {
      this.todos = this.todos.filter(todoObj => todoObj.id !== id)

    },
    checkAll1(done) {
      this.todos.forEach((todoObj) => {
        todoObj.done = done
      })

    },
    clearAll() {
      this.todos = this.todos.filter((todoObj) => {
        return !todoObj.done
      })
    },
    updateTodo(id, title) {
      // console.log(1111)
      this.todos.forEach((todoObj) => {
        if (todoObj.id === id) todoObj.title = title
      })
    },
  },
  watch: {
    todos: {
      deep: true,
      handler(value) {
        localStorage.setItem('todos', JSON.stringify(value))
      }

    }

  },
  mounted() {
    this.$bus.$on('cheacTodo', this.cheacTodo)
    this.$bus.$on('updateTodo', this.updateTodo)
    // this.$bus.$on('deleteTodo',this.deleteTodo)
    this.pubId = pubsub.subscribe('deleteTodo', this.deleteTodo)



  },
  beforeDestroy() {
    this.$bus.$off('cheacTodo')
    this.$bus.$off('updateTodo')
    // this.$bus.$off('deleteTodo')
    pubsub.unsubscribe(this.pubId)
  }

}

</script>
<style>
/*base*/
body {
  background: #fff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-edit {
  color: #fff;
  background-color: #1b52ab;
  border: 1px solid #0b4aaf;
  margin-right: 10px;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn-edit:hover {
  color: #fff;
  background-color: #092a6e;
}

.btn:focus {
  outline: none;
}

.todo-container {
  width: 600px;
  margin: 0 auto;
}

.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

/*header*/


/*main*/

/*item*/


/*footer*/
</style>
