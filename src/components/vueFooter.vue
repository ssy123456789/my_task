<template>
<div class="todo-footer" v-show="todos.length" >
        <label>
          <input type="checkbox" v-model="isAll"/>
        </label>
        <span>
          <span>已完成{{ doneTodo }}</span> / 全部{{ todos.length }}
        </span>
        <button class="btn btn-danger" @click="clearAll1">清除已完成任务</button>
      </div>
</template>

<script>
export default {
    name:'vueFooter',
    props:["todos"],
    computed:{
        doneTodo(){
            return this.todos.reduce((pre,current)=> pre+(current.done ? 1 : 0),0)
            
        },
        isAll:{
           get(){
            return this.doneTodo===this.todos.length && this.todos.length>0
           },
           set(checked){
            // this.checkAll1(checked)
            this.$emit('checkAll1',checked)
           }
        }
    },
    methods:{ 
        // chackAll(e){
        //     console.log(e.target.checked)
        //     this.checkAll1(e.target.checked)

        // },
       clearAll1(){
        if(confirm("确认删除马？"))
        // this.clearAll()
        this.$emit('clearAll')
       }
    }

}
</script>

<style scoped>
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>