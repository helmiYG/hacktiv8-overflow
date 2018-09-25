<template>
  <div id="app">
    <Navbar/>
      <div class="all-body">
        <router-view/>
      </div>
    <Footer/>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "app",
  components: {
    Navbar,
    Footer
  }
};
</script>
<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
.all-body{
  margin-top: 80px;
  min-height: 500px
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
