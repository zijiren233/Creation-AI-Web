<script setup lang="ts">
import Header from "@/views/Layout/components/Header.vue";
import Nav from "@/views/Layout/components/Nav.vue";
import Footer from "@/views/Layout/components/Footer.vue";
import "animate.css";
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header></Header>
        <Nav></Nav>
      </el-header>
      <el-main>
        <router-view v-slot="{ route, Component }">
          <Transition
            :enter-active-class="`animate__animated ${route.meta.transition}`"
          >
            <keep-alive include="home">
              <component :is="Component" />
            </keep-alive>
          </Transition>
        </router-view>
      </el-main>
      <el-footer>
        <Footer></Footer>
      </el-footer>
    </el-container>
  </div>
</template>
