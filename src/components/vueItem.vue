<template>
 <transition name="animate__animated animate__bounce" appear
 enter-active-class="animate__backInLeft"
 leave-active-class="animate__backOutRight">
  <li>
    <label>
      <input type="checkbox" :checked="todoObj.done" @click="handleCheck(todoObj.id)" />
      <span v-show="!todoObj.isEdit"> {{ todoObj.title }}</span>
      <input v-show="todoObj.isEdit" 
      type="text" :value="todoObj.title"
       @blur="handlerBlur(todoObj, $event)"
       ref="inuptTitle"
       >
    </label>
    <button class="btn btn-danger" @click="handlerDelete(todoObj.id)">删除</button>
    <button v-show="!todoObj.isEdit"
      class="btn btn-edit"
       @click="handleredit(todoObj)">编辑</button>
  </li>
 
 </transition>
</template>
 
<script>
import 'animate.css'
import PubSub from 'pubsub-js'
export default {
  name: 'vueItem',
  props: ['todoObj'],
  methods: {
    handleCheck(id) {
      // this.cheacTode(id)
      this.$bus.$emit('cheacTodo', id)

    },
    handlerDelete(id) {
      if (confirm('确定删除马')) {
        // this.deleteTodo(id)
        // console.log(id)
        // this.deleteTodo(id)
        // this.$bus.$emit('deleteTodo',id)
        PubSub.publish('deleteTodo', id)
      }

    },
    handleredit(todoObj) {
      // todoObj.isEdit=true
      // this.$set(todoObj,'isEdit',true)
      // console.log(111)
      if (todoObj.hasOwnProperty('isEdit')) {
        todoObj.isEdit = true
      } else {
        this.$set(todoObj, 'isEdit', true)
      }
     this.$nextTick(function(){
      this.$refs.inuptTitle.focus()
     })

    },
    handlerBlur(todoObj, e) {
      if(!e.target.value.trim()) return alert('输入不能为空')
      todoObj.isEdit = false
      this.$bus.$emit('updateTodo', todoObj.id, e.target.value)
      console.log(e.target.value);

    }
  },


}
</script>

<style scoped>
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}

li:hover {
  background-color: #d3d3d3;
}

li:hover button {
  display: block;
}
</style>