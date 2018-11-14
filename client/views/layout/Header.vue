<template lang="html">
  <header class="main-header">
    <h1>Todo</h1>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
    }
  },
  mounted () {
    // console.log($style.mainHeader)
  }
}
</script>

<style lang="scss" >
.main-header {
  text-align: center;
  h1 {
    font-size: 100px;
    color : rgba(255,0,0,0.1);
    font-weight : 100;
    margin : 20px;
  }
}
</style>
