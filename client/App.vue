<template lang="html">
  <div class="app">
    <div class="cover"></div>
    <div class="loading" v-show="isLoading">
      <loading></loading>
    </div>
    <Header />
    <!--<p style = "fontSize:50px;color:#000;" @click = "handleClick" >{{text}} {{counter}} {{fullName}}</p>-->
    <!--<router-link to="/login">login</router-link>-->
    <!--<router-link to="/todo/123">todo123</router-link>-->
    <!--<router-link to="/todo/456">todo456</router-link>-->
    <!-- <Todo /> -->
    <!--<Notification content = "notification test"/>-->
    <!--<input type="button" value="click me1" @click = "handleClickNotify">-->
    <router-view />
    <Footer />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import Header from './views/layout/Header.vue'
import Footer from './views/layout/footer.jsx'
import loading from './components/loading/loading.vue'
// import Todo from './views/todo/todo.vue'
export default {
  metaInfo: {
    title: 'power\'s todo App'
  },
  name: 'App',
  components: { Header, Footer, loading },
  mounted () {

  },
  computed: {
    ...mapState({
      counter: (state) => state.count,
      isLoading: (state) => state.isLoading
    }),
    ...mapState('a', {
      text: state => state.text
    }),
    ...mapGetters(['fullName'])
  },
  methods: {
    // handleClickNotify: function () {
    //   this.$notify({
    //     content: 'notification Test.',
    //     btn: 'close'
    //   })
    // },
    ...mapMutations({
      handleClick: (commit) => commit('countPlus', 20)
    }),
    ...mapActions({
      syntaxCountPlus: (dispatch) => dispatch('countPlusa', 20)
    }),
    ...mapActions('a', {
      addTextAsync: (dispatch) => dispatch('addTextAsync', 'aaaaa')
    }),
    ...mapMutations('a', {
      addText: (commit) => commit('adText', 'abcdef')
    })
    // handleClick () {
    //   // $store中mutation不能直接使用 需要使用commit来调用
    //   this.$store.commit('countPlus', 20)
    // }
  }
}
</script>

<style lang="scss" >
  .app{
    position: absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    .loading{
      position:fixed;
      top:0;
      right:0;
      bottom:0;
      left:0;
      background-color:rgba(255,255,255,0.3);
      z-index:99;
      display:flex;
      align-items:center;
      justify-content:center;
    }
    .cover{
      position: absolute;
      top:0;
      bottom:0;
      left:0;
      right:0;
      background-color: #999;
      opacity: 0.35;
      z-index: -1;
    }
  }
</style>
