<style scoped>
body {
    text-align: center;
    background-color: #f6f6f8;
}
input {
    border-style: groove;
    width: 200px;
}
button {
    border-style: groove;
}
.shadow {
    box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>

<template>
    <div id="app">

        <!-- TodoHeader -->
        <todo-header></todo-header>

        <!-- TodoInput --> <!--자식이벤트명=부모이벤트명 순서-->
        <todo-input v-on:add-todo="addTodo"></todo-input>

        <!-- TodoList -->
        <todo-list v-bind:todo-items="todoItems"
                      v-on:done-toggle="doneToggle"
                      v-on:remove-todo="removeTodo"></todo-list> <!-- 부모 데이터를 자식 컴포넌트가 받는 코드를 v-bind/v-on으로 작성 -->

        <!-- TodoFooter -->
        <todo-footer v-on:clear-all="clearAll"></todo-footer>

    </div>
</template>
<script>
import store from "../store/index";  // var store = new Vuex.Store();
import TodoHeader from "../components/todo/TodoHeader.vue";
import TodoInput from "../components/todo/TodoInput.vue";
import TodoList from "../components/todo/TodoList.vue";
import TodoFooter from "../components/todo/TodoFooter.vue";

export default {
    /* pdtmc^2w */
    data: function () {
        return {
            // store로 대체
            // todoItems: [
            //     { id: 1, todo: "영화보기", done: false },
            //     { id: 2, todo: "주말 산책", done: true },
            //     { id: 3, todo: "ES6 학습", done: false },
            //     { id: 4, todo: "잠실 야구장", done: false }
            // ]
        };
    },
 methods: {
            /* 이벤트 핸들러 등록 */
            addTodo (newTodoItem) {
                store.dispatch("addTodo", newTodoItem);
            },
            doneToggle (id) {
                store.dispatch("doneToggle", id);
            },
            removeTodo (id, index) {
                store.dispatch("removeTodo", id, index);
            },
            clearAll () {
                store.dispatch("clearAll");
            }
        },
        components: {
            /* 지역 컴포넌트 등록. 예시) "태그명" : 컴포넌트명 */
            "todo-header": TodoHeader,
            "todo-input" : TodoInput,
            "todo-list" : TodoList,
            "todo-footer" : TodoFooter
        },
        computed: {
            /* 자동처리 + 동기식. 메서드로 작성. return 필수. */
            todoItems : function () {
                return store.getters.todoItems;
            }
        },
        watch: {
            /* 자동처리 + 비동기식. data 에 등록된 프로퍼티 모니터링. 메서드로 작성. 매개변수 입력 필수  */

        },
        mounted: function() {
            console.log("mounted");
        },
        updated: function() {
            console.log("updated");
        },
};
</script>
