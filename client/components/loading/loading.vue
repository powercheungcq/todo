<template>
  <div class="spiner">
    <div class="load-left"></div>
    <div class="load-right"></div>
  </div>
</template>

<style lang="scss" scoped>
  .spiner{
    width:40px;
    height:40px;
    position:relative;
    text-align: center;
    animation: sk-rotate 2.0s infinite linear;
    .load-left, .load-right{
      width:60%;
      height:60%;
      border-radius:100%;
      display: inline-block;
      position: absolute;
      top: 0;
      background-color: #333;
      animation: sk-scale 2.0s infinite ease-in-out;
    }
    .load-right{
      top: auto;
      bottom: 0;
      animation-delay: -1.0s;
    }
  }
  @keyframes sk-rotate {
    100% {transform: rotate(360deg)}
  }
  @keyframes sk-scale {
    0%, 100% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.0);
    }
  }
</style>
