<template>
	<div id='wrapper'>
  <h1>
    AiScript (
    <MenuButton id="version" :options="menu" @select="onVersionSelect">{{
      version
    }}</MenuButton>
    ) Playground
  </h1>
	<div v-for='v in versions'>
		<MainArea :ver='v' v-if='v==version'/>
	</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MainArea, { versions, latest } from './MainArea.vue';
import MenuButton from "@common/MenuButton.vue";

const version = ref(window.localStorage.getItem("version") ?? latest);
const menu = Object.fromEntries(
  versions.map((v) => [v, v + (v == latest ? "(latest)" : "")]),
);
function onVersionSelect(v: string) {
  version.value = v;
  window.localStorage.setItem("version", version.value);
}
</script>

<style>
:root {
  --borderThickness: 1px;
}

* {
  font-family:
    Fira code,
    Fira Mono,
    Consolas,
    Menlo,
    Courier,
    monospace;
	box-sizing: border-box;
}

html {
  background: #171717;
  color: #fff;
  tab-size: 2;
}

body {
  margin: 0;
  padding: 0;
}
</style>

<style scoped>
#wrapper {
	padding: 16px;
}
h1 {
  font-size: 1.5em;
  margin: 0 0 16px 0;
}
</style>
