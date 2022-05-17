<template>
  <Header />
  <div class="page-view">
    <router-view v-slot="slotProps">
      <transition name="route" mode="out-in">
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
  </div>
  <Footer />
</template>

<script>
import Header from './components/layout/Header.vue';
import Footer from './components/layout/Footer.vue';
export default {
  components: {
    Header,
    Footer,
  },
  computed: {
    didAutoLogout() {
      return this.$store.getters.didAutoLogout;
    }
  },
  watch: {
    didAutoLogout(curVal, oldVal) {
      if(curVal && curVal !== oldVal) {
        this.$router.replace('/coaches');
      }
    }
  },
  created() {
    this.$store.dispatch('tryLogin');
  }
};
</script>

<style>
.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-leave-from,
.route-enter-to {
  opacity: 1;
  transform: translateY(0);
}

@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', sans-serif;
}
.page-view {
  min-height: 100%;
}

body {
  margin: 0;
}
</style>
