<template>
  <div class="container">
    <br />
    <router-link to="/login">About</router-link>
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
