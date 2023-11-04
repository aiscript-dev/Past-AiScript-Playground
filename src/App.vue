<template>
<h1>AiScript (
	<MenuButton id='version' :options='versions' @select='onVersionSelect'>{{ version }}</MenuButton>
) Playground</h1>
<V0_16_0 v-if='version === "0.16.0"'></V0_16_0>
<V0_15_0 v-if='version === "0.15.0"'></V0_15_0>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import MenuButton from '@common/MenuButton.vue';
import V0_16_0 from './versions/0.16.0/index.vue';
import V0_15_0 from './versions/0.15.0/index.vue';
const version = ref(window.localStorage.getItem('version') ?? '0.16.0');
const versions = ['0.16.0', '0.15.0'] as const;

function onVersionSelect(v: string) {
	version.value = v;
	window.localStorage.setItem('version', version.value);
}

</script>

<style>
:root {
	--borderThickness: 1px;
}

* {
	font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
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

h1 {
	font-size: 1.5em;
	margin: 16px 16px 0 16px;
}

</style>

