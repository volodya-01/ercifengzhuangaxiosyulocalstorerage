<template>
    
       <div>
               {{ count }}
               <p>
                <button @click="increment">+</button>
                <button @click="decrement">-</button>
              </p>
               
       </div>
  
</template>
<script>
export default {
        name:'demo',
        data(){
            return{

            }
        },
        mounted(){
            this.$store.state.count=100
        },
        methods:{
            increment(){
              this.$store.commit('increment')
            },
            decrement(){
              this.$store.commit('decrement')
            }
        },
        computed:{
            count(){
                return this.$store.state.count
            },
        }
}
</script>
