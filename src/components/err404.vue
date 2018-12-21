<template>
    <div>
        <img src="../assets/404.jpg" alt="">
        <button @click="backhelloword">返回主页</button>
    </div>
</template>
<script>
export default {
    name:"err404",
    methods:{
        backhelloword(){
            this.$router.push({path:'/'})
        }
    }
}
</script>
