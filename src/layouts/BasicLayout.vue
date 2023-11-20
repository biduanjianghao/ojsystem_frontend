<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <GlobalHeader />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <a href="http://localhost:8080" target="_blank"> design by biduan </a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
#basicLayout {
}

#basicLayout .header {
  box-shadow: #bbbad0;
}

#basicLayout .content {
  background: linear-gradient(to right, #bbbad0, #fff);
  padding: 20px;
}

#basicLayout .footer {
  background: linear-gradient(to right, #bbbad0, #fff);
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
<script setup lang="ts">
import GlobalHeader from "@/layouts/GlobalHeader.vue";
</script>
