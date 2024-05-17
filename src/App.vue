<template>
  <div id="app">
    <template v-if="navbar">
      <Navbar />
    </template>

    <RouterView />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import SlideIn from './components/SlideIn.vue';
import { useRoute } from 'vue-router';
import { computed, ref } from 'vue';

export default {
  name: 'App',
  components: {
    Navbar,
    SlideIn,
  },
  setup() {
    const route = useRoute();

    // Define a computed property to check if Navbar should be shown
    const navbar = computed(() => {
      return !(route.path === '/login');
    });

    return { navbar };
  }
};
</script>