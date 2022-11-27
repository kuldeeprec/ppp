<template>
  <div class="container">
    <br />
    <router-link to="/login">Login</router-link>
    <router-link to="/signup">Signup</router-link>
    <router-view v-slot="{ Component }">
      <transition name="page">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style></style>

<script>
export default { name: "App" };
</script>
