<template>


  <!-- div for the stars  -->
  <div class="stars-container"></div>

  <!--  div for falling stars -->
  <div
      class="falling-star"
      v-for="index in numberOfStars"
      :key="index"
      :style="addFalling()"
      @animationend="($event) => removeFallingStar($event.target)"
  ></div>

  <!-- UFO -->
  <div class="ufo-container">

    <div :class="{ 'ufo': true, 'ufo-slide': ufoFly }">
      <div class="monster" style="color: #7cb342">
        <div class="body">
          <div class="ear"></div>
          <div class="ear"></div>
          <div class="vampi-mouth">
            <div class="vampi-tooth"></div>
          </div>
        </div>
        <div class="eye-lid">
          <div class="eyes">
            <div class="eye"></div>
          </div>
        </div>
      </div>
      <div class="ufo-underside">
        <div class="title-screen">
          <h2 v-if="login" :class="{'show-title': loginFormShow}">Login</h2>
          <h2 v-if="register" :class="{'show-title': registerFormShow}">Register</h2>
          <h2 v-if="ligginIn" :class="{'show-title': ligginIn}">Logging in</h2>
          <h2 v-if="createAccount" :class="{'show-title': createAccount}">Creating account</h2>
        </div>
      </div>
      <!-- <div class="ufo-inner"></div> -->
      <div class="center-dot"></div>
      <div class="ufo-top"></div>
    </div>
    <div :class="{ 'beam': beam, 'beam-slide-up': isBeamUp, 'beam-slide-down': isBeamDown }">
      <div v-if="login" :class="{ 'login-form': true, 'login-form-slide-down': loginFormShow, 'login-form-slide-up': !loginFormShow }">
        <form @submit.prevent="Login">
          <!--      <div class="form-group">-->
          <!--        <label for="username">Username:</label>-->
          <!--        <input type="text" id="username" v-model="email" required>-->
          <!--      </div>-->
          <div class="form-group">
            <label class="label-email">Email:</label>
            <input type="email" id="email" v-model="email" required>
          </div>
          <div class="form-group">
            <label class="label-password">Password:</label>
            <input type="password" id="password" v-model="password" required>
          </div>
          <button type="submit">Login</button> <span @click="changeToRegister">Register</span>
        </form>
      </div>

      <div v-if="register" :class="{ 'register-form': true, 'register-form-slide-up': !registerFormShow, 'register-form-slide-down': registerFormShow }">
        <form @submit.prevent="Register">
          <!--      <div class="form-group">-->
          <!--        <label for="username">Username:</label>-->
          <!--        <input type="text" id="username" v-model="email" required>-->
          <!--      </div>-->
          <div class="form-group">
            <label class="label-email">Email:</label>
            <input type="email" id="email" v-model="email" required>
          </div>
          <div class="form-group">
            <label class="label-password">Password:</label>
            <input type="password" id="password" v-model="password" required>
          </div>
          <div class="form-group">
            <label class="label-repeat-password">Repeat password:</label>
            <input type="password" id="password" v-model="conf_password" required>
          </div>
          <button type="submit">Register</button> <span style="cursor: pointer;" @click="changeToLogin">Login</span>
        </form>
      </div>
    </div>
  </div>
  <div :class="{ 'flying-error-div': hasError }">
    <div class="flying-error">
      {{errorMessage}}
    </div>
    <div class="rockets-div">
      <div class="rocket one">
      </div>
      <div class="rocket two">
      </div>
    </div>
    <div class="rocket-fire one">
      <div v-for="(spark, index) in sparks" class="spark"></div>
    </div>
    <div class="rocket-fire two">
      <div v-for="(spark, index) in sparks" class="spark"></div>
    </div>
  </div>

</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { nextTick } from 'vue';

export default {
  name: 'Login',
  setup() {
    const router = useRouter();
    const numberOfStars = ref(0); // Using ref to make it reactive
    const fallingStar = ref(null);
    const sparks = ref([1, 2, 3, 4, 5, 6, 7]); // Array of how many sparks

    // stores if the beam needs to be shown
    let beam = ref(true);
    // stores if the form is login
    let login = ref(true);
    // stores if the form is register
    let register = ref(false);
    // stores if the login form must slide in
    let loginFormShow = ref(true);
    // stores if the register form must slide in
    let registerFormShow = ref(false);
    // stores if beam needs to go up
    let isBeamUp = ref(false);
    // true because it makes the beam go down when loading page
    let isBeamDown = ref(true);
    // stores if you are logged in
    let ligginIn = ref(false);
    // stores if you are logged in
    let createAccount = ref(false);
    // stores if the ufo needs to fly
    let ufoFly = ref(false);
    // stores if there is an error
    let hasError = ref(false);
    // stores the error message
    let errorMessage = ref(null);

    const email = ref('');
    const password = ref('');
    const conf_password = ref('');

    nextTick(() => {
      const starContainer = document.querySelector('.stars-container');

      if (starContainer) {
        for (let i = 0; i < 3000; i++) {
          const star = document.createElement('div');
          star.className = 'star';
          star.style.top = `${Math.random() * 100}%`;
          star.style.left = `${Math.random() * 100}%`;
          starContainer.appendChild(star);
        }
      }
    });

    // sets a rondom time interval for a star to appear
    setInterval(() => {
      numberOfStars.value = Math.floor(Math.random() * 2) + 1;
    }, Math.floor(Math.random() * (50000 - 8000 + 500)) + 10000);
    // }, Math.floor(Math.random() * (5000 - 800 + 50)) + 1000);

    // makes the star fall
    const addFalling = () => {
      const left = `${Math.random() * 20 + 80}%`; // Random between 80 and 100
      const top = '-10px'; // Reset to top position
      const opacity = 1;
      const animationDuration = `${Math.random() * 3 + 1}s`; // Random duration between 3 and 8 seconds
      const animationDelay = `${0}s`; // Random delay for variation

      // Custom property to track if star should stop falling
      const stopFalling = false; // Initially set to false

      return {
        left,
        top,
        opacity,
        animationDuration,
        animationDelay,
        // Custom property to track if star should stop falling
        stopFalling,
        // Add a class to stop falling if it should stop
        stopFallingClass: stopFalling ? 'stop-falling' : '',
      };
    };

    // removes the falling star when the falling star animation is done
    const removeFallingStar = (element) => {
      if (element && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };

    // changes the form to register and will make it slide in
    const changeToRegister = () => {
      isBeamUp.value = false;
      isBeamDown.value = false

      loginFormShow.value = false;

      setTimeout(() => {
        register.value = true;
        registerFormShow.value = true;
        login.value = false;
      }, 1500);// 1.5 seconds

      isBeamUp.value = true;
      setTimeout(() => {
        isBeamUp.value = false;
        isBeamDown.value = true;
      }, 1500); // 1,5 seconds

      setTimeout(() => {
        isBeamDown.value = false
      }, 3000); // 3,0 seconds
    }

    // changes the form to login and makes it slide in
    const changeToLogin = () => {
      isBeamUp.value = false;
      isBeamDown.value = false

      registerFormShow.value = false;

      setTimeout(() => {
        loginFormShow.value = true;
        login.value = true;
        register.value = false;
      }, 1500);// 1.5 seconds

      isBeamUp.value = true;
      setTimeout(() => {
        isBeamUp.value = false;
        isBeamDown.value = true;
      }, 1500); // 1,5 seconds

      setTimeout(() => {
        isBeamDown.value = false
      }, 3000); // 3,0 seconds
    }

    // sends a login request
    const Login = async message => {
      try {
        const res = await fetch('http://localhost:3333/Login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email.value,
            password: password.value
          })
        }).then(res => res.json());
        if (res.success) {
          localStorage.setItem('token', res.token);

          isBeamUp.value = true;
          loginFormShow.value = false;
          registerFormShow.value = false;

          setTimeout(() => {
            beam.value = false;
            login.value = false;
            register.value = false;
            ligginIn.value = true;
          }, 1500);

          setTimeout(() => {
            ufoFly.value = true;
            setTimeout(async () => {
              await router.push('/');
            }, 2200);
          }, 3000);


          // await router.push('/');
        } else {
          hasError.value = true;
          errorMessage.value = res.message;
        }
      } catch (error) {
        alert('Error login in user:', error);
        console.error(error);
        return false;
      }
    }

    // sends a register request
    const Register = async message => {
      if(password.value !== conf_password.value) {
        hasError.value = true;
        errorMessage.value = 'Passwords do not match';
        return;
      }

      try {
        const res = await fetch('http://localhost:3333/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email.value,
            password: password.value
          })
        }).then(res => res.json());
        if (res.success) {
          localStorage.setItem('token', res.token);

          isBeamUp.value = true;
          loginFormShow.value = false;
          registerFormShow.value = false;

          setTimeout(() => {
            beam.value = false;
            login.value = false;
            register.value = false;
            createAccount.value = true;
          }, 1500);

          setTimeout(() => {
            ufoFly.value = true;
            setTimeout(async () => {
              await router.push('/');
            }, 2200);
          }, 3000);
        } else {
          hasError.value = true;
          errorMessage.value = res.message;
        }
      } catch (error) {
        return alert('Error registering user:', error);
      }
    }

    const animate = () => {
      spark.style.height = height + 'px';

      setTimeout(() => {

      }, 100); // Animation speed in milliseconds
    }

    return {
      email,
      password,
      conf_password,
      fallingStar,
      Login,
      Register,
      numberOfStars,
      addFalling,
      removeFallingStar,
      login,
      register,
      loginFormShow,
      registerFormShow,
      changeToRegister,
      changeToLogin,
      isBeamUp,
      isBeamDown,
      beam,
      ligginIn,
      ufoFly,
      createAccount,
      hasError,
      errorMessage,
      sparks
    }
  },
  data() {
    return {
      starStyle: {
        // Initial position, off screen
        left: `${Math.random() * 100}%`,
        top: '-10px',
        opacity: Math.random(), // Random opacity for variation
        animationDuration: `${Math.random() * 3 + 1}s`, // Random duration for variation
        animationDelay: `${Math.random() * 20}s`, // Random delay for variation
      },
    };
  }
}
</script>

<style lang="scss">
body {
  background-color: #000000;
  overflow: hidden;
  position: relative;
}

body::before {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(transparent 50%, rgba(255, 255, 255, 0.6) 50%);
  background-size: 2px 2px;
  z-index: 1;
}

body::after {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent 50%, rgba(255, 255, 255, 0.6) 50%);
  background-size: 2px 2px;
  z-index: 2;
}

@import '../../assets/scss/Stars.scss';
</style>

<style scoped lang="scss">
@import '../../assets/scss/UFO.scss';
@import '../../assets/scss/FallingStar.scss';
</style>