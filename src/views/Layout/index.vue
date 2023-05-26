<script setup lang="ts">
import Header from "@/views/Layout/components/Header.vue";
import Nav from "@/views/Layout/components/Nav.vue";
import Footer from "@/views/Layout/components/Footer.vue";
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header></Header>
        <Nav></Nav>
      </el-header>
      <el-main>
        <keep-alive include="home">
          <RouterView />
        </keep-alive>
      </el-main>
      <el-footer>
        <Footer></Footer>
      </el-footer>
    </el-container>
  </div>
</template>
