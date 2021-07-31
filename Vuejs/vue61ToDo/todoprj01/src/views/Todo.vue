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
import TodoHeader from "../components/todo/TodoHeader.vue";
import TodoInput from "../components/todo/TodoInput.vue";
import TodoList from "../components/todo/TodoList.vue";
import TodoFooter from "../components/todo/TodoFooter.vue";

export default {
    /* pdtmc^2w */
    data: function () {
        return {
            todoItems: [
                { id: 1, todo: "영화보기", done: false },
                { id: 2, todo: "주말 산책", done: true },
                { id: 3, todo: "ES6 학습", done: false },
                { id: 4, todo: "잠실 야구장", done: false }
            ]
        };
    },
 methods: {
            /* 이벤트 핸들러 등록 */
            addTodo (newTodoItem) {
                // console.log(event.target);  // TodoInput의 Button 정보
                // debugger;
                if( newTodoItem && newTodoItem.trim() !== "" ){
                    let maxId = 0;
                    if ( this.$data.todoItems.length > 0 ) {
                        maxId = this.$data.todoItems.reduce((curObj) => {
                            return Math.max(curObj.id);  // index를 사용하면 원치 않게 작동할 가능성. 반드시 고유한 id값을 만들어서 사용한다.
                        });
                    }
                    const newTodo = {
                        id : maxId+1,   // id는 1부터 시작
                        todo : newTodoItem,
                        done : false,
                    };
                    // this.$data.todoItems.push(newTodo);
                    // this.$data.todoItems[ this.$data.todoItems.length ] =  newTodo;  // 안 먹음
                    this.$set(this.$data.todoItems, this.$data.todoItems.length, newTodo);
                }
                else {
                    this.$data.showModal = !this.$data.showModal;
                }
            },
            doneToggle (id) {

                // 방법1. index 로 찾기
                // this.$set(this.$data.todoItems[index], "done" , !this.$data.todoItems[index].done) ;

                // 방법2. id 로 찾기
                // 배열 depth가 깊어질수록 index로 찾기 어려우므로 직접 배열객체를 조작하면 오류날 가능성 높음.
                // 복제 후 재할당 원칙! => 라이브러리..?
                const indexFind = this.$data.todoItems.findIndex( (item) => {
                    return item.id === id;
                });
                const obj = {
                    ...this.$data.todoItems[indexFind],
                    done : !this.$data.todoItems[indexFind].done,
                };
                // console.log(1, obj);
                this.$set(this.$data.todoItems, indexFind, obj);
            },
            removeTodo (id, index) {
                // 복제 후 재할당 필요
                this.$data.todoItems.splice(index, 1);

                // 부모로 bubbling 되지 않게 하기 위해 이벤트 취소 : stop 키워드를 넣어준다
                // => v-on:click.stop="removeTodo(todoItem.id, index)"
            },
            clearAll () {
                // console.log(event);  // 원래 window.event.target
                this.$set(this.$data, "todoItems", []);
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
