<template>
<div>
	<button @click="showMenu=!showMenu">Samples</button>
	<Transition>
		<div v-if='showMenu' :class="$style.menu">
			<div v-if='options instanceof Array'>
				<div v-for='opt in options' :class="$style.opt" @click="showMenu=false; emit('select', opt)">{{ opt }}</div>
			</div>
			<div v-else>
				<div v-for='opt in Object.keys(options)' :class="$style.opt" @click="showMenu=false; emit('select', opt)">{{ options[opt] }}</div>
			</div>
		</div>
	</Transition>
</div>
</template>
<script setup lang='ts'>
import { ref } from 'vue';

const showMenu = ref<boolean>(false);

const props = defineProps<{
	options: string[]|Record<string, string>;
}>();
const emit = defineEmits<{
	(e: 'select', value: string): void;
}>();
</script>

<style module>
.menu {
	position: absolute;
	border: solid var(--borderThickness) #555;
	border-radius: 4px;
	background: #202020;
	z-index: 10;
}
.opt {
	padding: 16px;
	border: dashed var(--borderThickness) #555;
}
</style>
