<template>
<h1>AiScript (
	<MenuButton id='version' :options='menu' @select='onVersionSelect'>{{ version }}</MenuButton>
) Playground</h1>
<Next v-if='version === "next"'></Next>
<Develop v-if='version === "develop"'></Develop>
<V0_16_0 v-if='version === "0.16.0"'></V0_16_0>
<V0_15_0 v-if='version === "0.15.0"'></V0_15_0>
<V0_14_1 v-if='version === "0.14.1"'></V0_14_1>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import MenuButton from '@common/MenuButton.vue';
import Next from './versions/next/index.vue';
import Develop from './versions/develop/index.vue';
import V0_16_0 from './versions/0.16.0/index.vue';
import V0_15_0 from './versions/0.15.0/index.vue';
import V0_14_1 from './versions/0.14.1/index.vue';
const versions = [
	'next',
	'develop',
	'0.16.0',
	'0.15.0',
	'0.14.1'
] as const;
const latest = '0.16.0';

const version = ref(window.localStorage.getItem('version') ?? latest);
const menu = Object.fromEntries(versions.map(v => [v, v + (v == latest ? '(latest)' : '')]));
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

