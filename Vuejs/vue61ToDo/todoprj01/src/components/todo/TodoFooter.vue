<style scoped>
.clearAllContainer {
    width: 8.5rem;
    height: 50px;
    line-height: 50px;
    background-color: white;
    border-radius: 5px;
    margin: 0 auto;
}
.clearAllBtn {
    color: #e20303;
    display: block;
}
</style>

<template>
    <div class="clearAllContainer">
        <span class="clearAllBtn" v-on:click="clearAll">Clear All</span>
    </div>
</template>

<script>
export default {
    /* pdtmc^2w */
    props: [] ,
    data: function() {
        /* 컴포넌트 안에서 사용되는 변수 등록. 개별 변수 */
        return {

        }
    },
    // template: ``,
    methods: {
        /* 이벤트 핸들러 등록 + 일반 함수 */
        clearAll() {
            // console.log(event.target);
            this.$emit("clear-all")
        }
    },
};
</script>
