<template>
  <div id="app" class="app">

    <div class="app-bar">
      <div class="app-title">
        <router-link :to="{name: 'dogs'}">Пёсель</router-link>
      </div>
      <div class="app-fav">
        <router-link :to="{name: 'favorites'}">Избранные пёсели <img src="/fav-out.svg" alt="Избранные песели"></router-link>
      </div>
    </div>

    <div class="app-content">

      <router-view/>

    </div>

  </div>
</template>

<script>

  export default {

    name: 'App'

  }

</script>

<style lang="scss">

  @import "./styles/app";

</style>