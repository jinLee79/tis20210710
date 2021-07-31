import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    actions: {
        /* 왜 actions를 사용하나? 비동기로 외부 함수 호출하기 위해서
         * actions 에는 메서드만 등록 가능하다.
         * 첫번째인자: 무조건 mutations로 고정.
         * 두번째인자: 값. store.dispatch()호출시 넘겨지는 값.
         */
        addTodo : function (mutations, newTodoItem) {
            mutations.commit("addTodo", newTodoItem);
        },
        doneToggle : function (mutations, id) {
            mutations.commit("doneToggle", id);
        },
        removeTodo : function (mutations, id, index) {
            mutations.commit("removeTodo", id, index);
        },
        clearAll : function (mutations) {
            mutations.commit("clearAll");
        },
    },
    mutations: {
        /* 왜 mutations 를 사용하나? state 를 바꾸기 위해서
         * mutations 에는 메서드만 등록 가능하다.
         * 첫번째인자: 무조건 state 로 고정.
         * 두번째인자: 값. mutations.commit() 호출시 넘겨지는 값.
         * */
        addTodo : function (state, newTodoItem) {
            // debugger;
            let maxObj = null;
            if (state.todoItems.length > 0) {
                // state.todoItems.reduce()를 사용하여 최대 id 값을 갖고있는 element 를 찾는다.
                maxObj = state.todoItems.reduce((prevObj, curtObj) => {
                    if (prevObj.id >= curtObj.id) {
                        return prevObj;
                    } else {
                        return curtObj;
                    }
                });
            } else {
                // 빈 배열인 경우
                maxObj = {
                    id: 0
                };
            }
            const newTodo = {
                id :  maxObj.id+1,   // id는 1부터 시작
                todo : newTodoItem,
                done : false,
            };
            state.todoItems.push(newTodo);  // Vuex 사용 시 this.$set 사용X
        },
        doneToggle : function (state, id) {
            // debugger;
            // 복제 후 재할당 위해 map을 사용해 list를 전부 복사해야 한다
            const newItems = state.todoItems.map( (item) => {
                if ( item.id === id ) {
                    item.done = !item.done;
                    return item;
                }
                else {
                    return item;
                }
            });
            state.todoItems = newItems;
        },
        removeTodo : function (state, id, index) {
            state.todoItems.splice(index, 1);
        },
        clearAll : function (state) {
            state.todoItems = [];
        },
    },
    state: {
        /* vue인스턴스나 컴포넌트의 data 프로퍼티에 해당 */
        todoItems: [
            { id: 1, todo: "영화보기", done: false },
            { id: 2, todo: "주말 산책", done: true },
            { id: 3, todo: "ES6 학습", done: false },
            { id: 4, todo: "잠실 야구장", done: false }
        ],
    },
    getters: {
        /* state 변경 정보를 컴포넌트에 전달하는 역활.
         * 메서드로 만들어야 하며 메서드명은 state 의 이름을 그대로 사용
         * 첫번째인자: 무조건 state
         * 컴포넌트에서는 computed를 사용하여 store의 state 변경 정보를 자동으로 가져오게 된다.
         * 예시) message()=> store.getters.인자;
         */
        todoItems: function(state/* 고정 */){
            return state.todoItems;
        },
    },
});
// export default new Vuex.Store({
//     state: {

//     },
//     mutations: {},
//     actions: {},
//     modules: {
//         todo : {},
//         login : {},  //  modules의 사용 - 로그인 상태별로 다른 데이터 보여주고 싶을 때..
//     }
// });