<template>
  <div class="register-form">
    <h2>Register</h2>
    <form @submit.prevent="Register">
<!--      <div class="form-group">-->
<!--        <label for="username">Username:</label>-->
<!--        <input type="text" id="username" v-model="email" required>-->
<!--      </div>-->
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <div class="form-group">
        <label>Confirm:</label>
        <input type="password" id="ConfirmPassword" v-model="conf_password" required>
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'register',
  setup() {
    const router = useRouter();

    const email = ref('');
    const password = ref('');
    const conf_password = ref('');

    const Register = async message => {
      if(!email.value || !password.value || !conf_password.value) {
        return alert('Please fill all fields');
      }

      if(password.value !== conf_password.value) {
        return alert('Passwords does not match');
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
          await router.push('/');
        } else {
          alert(res.message);
        }
      } catch (error) {
        return alert('Error registering user:', error);
      }
    }

    return { email, password, conf_password, Register }
  }
}

</script>