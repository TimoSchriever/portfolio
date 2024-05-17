<template>
  <transition name="fade" mode="out-in">
    <nav class="navbar">
      <div class="logo">
        <router-link to="/">Logo</router-link>
      </div>
      <ul class="nav-links">
        <li><router-link :to="{ name: 'Home'}" class="nav-link">Home</router-link></li>
        <li><router-link :to="{ name: 'About' }" class="nav-link">Links</router-link></li>
        <li><router-link :to="{ name: 'Freerunning'}" class="nav-link">Freerunning</router-link></li>
        <li @click="Logout" class="nav-link">Logout</li>
      </ul>
    </nav>
  </transition>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  name: 'Navbar',
  setup() {
    const router = useRouter();
    const Logout = async message => {
      try {
        const res = await fetch('http://localhost:3333/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            session_token: localStorage.getItem('token')
          })
        }).then(res => res.json());

        if(res.success) {
          localStorage.removeItem('token');
          await router.push('login');
        }else {
          alert(res.message);
          console.error(res.message);
        }
      } catch (error) {
        alert(error);
        console.error(error);
      }
    }

    return { Logout }
  }
};
</script>

<style>
.navbar {
  background-color: #333;
  color: white;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  font-size: 23px;
  position: fixed; /* Fixed position at the top */
  width: 100%; /* Full width */
  top: 0; /* Position at the top */
  z-index: 1000; /* Ensure it's above other content */
  left: 0;
}

.logo {
  font-size: 23px;
}

.nav-links {
  list-style-type: none;
  display: flex;
  width: 600px;
  justify-content: space-between; /* Center the links horizontally */
  margin-left: 500px;
}

.nav-links li {
  margin-right: 15px;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.nav-link:hover {
  background-color: #555;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 4.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>