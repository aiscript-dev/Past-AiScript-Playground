<template>
<div :class="$style.container">
	<header v-if="hasHeader" :class="$style.header">
		<slot name="header"></slot>
	</header>
	<main :class="$style.main">
		<slot></slot>
	</main>
	<footer v-if="hasFooter" :class="$style.footer">
		<slot name="footer"></slot>
	</footer>
</div>
</template>

<script lang='ts'>
export default {
  computed: {
    hasHeader() {
      return !!this.$slots.header;
    },
    hasFooter() {
      return !!this.$slots.footer;
    },
  },
};
</script>

<style module>
.container {
	display: flex;
	flex-direction: column;
	border: solid var(--borderThickness) #555;
	border-radius: 8px;
	background: #202020;
}
.header {
	padding: 8px 16px;
	border-bottom: dashed var(--borderThickness) #555;
	font-weight: bold;
}
.main {
	flex: 1;
	overflow: auto;
	padding: 16px;
}
.footer {
	padding: 8px 16px;
	border-top: dashed var(--borderThickness) #555;
}
</style>
