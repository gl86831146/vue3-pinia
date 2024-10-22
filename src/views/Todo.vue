<template>
    <div>
        <h2>代办清单</h2>
        <input type="text" v-model="newTodoText" placeholder="请输入新的代办事项" />
        <button @click="myAddTodo">添加</button>
    </div>

    <ul>
        <li v-for="(todo, index) in myTodos" :key="todo.id" :class="{ completed: todo.completed }"
            @click="myToggleTodoCompleted(index)"> <!-- 修正这里，传递索引 -->
            {{ todo.text }}
            <button @click.stop="myRemoveTodo(index)">删除</button> <!-- 加上 .stop，避免事件冒泡 -->
        </li>
    </ul>
</template>

<script setup lang="ts">
import { useTodoStore } from "../stores/useTodo";
import { ref } from "vue";

const todoStore = useTodoStore();

const newTodoText = ref("");

const myAddTodo = () => {
    if (newTodoText.value.trim()) {
        todoStore.addTodo(newTodoText.value);
        newTodoText.value = "";
    }
};

const myRemoveTodo = (index: number) => {
    todoStore.removeTodo(index);
};

const myToggleTodoCompleted = (index: number) => {
    todoStore.toggleTodo(index);  // 确保方法名一致  
};

const myTodos = todoStore.todos;  
</script>

<style>
.completed {
    text-decoration: line-through;
    color: gray;
}
</style>