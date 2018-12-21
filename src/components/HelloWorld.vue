<template>
  <div class="hello">
    <demo/>
   {{msg}}
    
  </div>
</template>

<script>
import demo from '@/components/demo'
export default {
  name: 'HelloWorld',
  components:{
    demo
  },
  data () {
    return {
      msg: ''
    }
  },
   /*   created(){
             let self = this;
      self.$axios
        .post("https://112.64.170.158:8187/Service1.svc/CJConditionSetting")
        .then(function(res) {
          console.log(res);
          self.msg=res
        })
        .catch(function(err) {
          console.log(err);
        })
        }, */
         mounted(){
    this.$post('/CJConditionSetting')
      .then((response) => {
        console.log(response)
         let self = this;
          self.msg=response
          var user = {};
        user.name = 'Adam Li';
        user.age  = 25;
        user.home = 'China';
        localStorage.setItem('userinfo',JSON.stringify(user));
         self.$localstorage.putLocalStorage('userinfo', user)
 /*   console.log(self.$localstorage.getLocalStorage('userinfo')) */
      })
      .catch(function(error) {
         if (error.response) {
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
        })
    
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
