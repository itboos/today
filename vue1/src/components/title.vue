
<template>
  <div id="title">
      <h3>这是测试的h3,你怎么看...</h3>
      <p>{{msg1}}</p>
      <p>{{msg2}}</p>
      <p><button @click='sayHi()'>按钮</button></p>
  </div>
</template>

<script>
  export default {
        components: {
           
        },
        data () {
          return {
            msg1:'message1',
            msg2:'这是信息2'
          }
        },
        methods: {
          sayHi () {
            alert("Hi");
          }
        },
        watch :{
         
          }    
    }
</script>