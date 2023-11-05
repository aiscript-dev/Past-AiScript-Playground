<template>
  <Container>
    <template #header>
      Input
      <div :class="$style.actions" v-if="props.samples">
        <MenuButton
          :options="Object.keys(props.samples!)"
          @select="onSelectSample"
          >Samples</MenuButton
        >
      </div>
    </template>
    <PrismEditor
      :class="$style.code"
      v-model="modelValueInter"
      :highlight="highlighter"
      :line-numbers="false"
    />
    <template #footer>
      <span v-if="props.parseError" :class="$style.parseError">{{
        props.parseError
      }}</span>
      <div :class="$style.actions">
        <button @click="emit('run')">RUN</button>
      </div>
    </template>
  </Container>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { PrismEditor } from "vue-prism-editor";
import "vue-prism-editor/dist/prismeditor.min.css";
import "prismjs";
/**
 * @types/prismjsの更新が止まっているためとりあえずts-ignoreする（declare moduleしようとしたがうまくいかなかった）
 */
// @ts-ignore
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-okaidia.css";
import Container from "./Container.vue";
import MenuButton from "./MenuButton.vue";

// 使う場所はそんなにないしとりあえずunknownで
type Grammer = unknown;
declare var languages: {
  js: Grammer;
};
declare function highlight(
  test: string,
  grammer: Grammer,
  language: string,
): string;

const props = defineProps<{
  modelValue: string;
  samples?: Record<string, string>;
  parseError?: string | null;
}>();
const emit = defineEmits<{
  (e: "run"): void;
  (e: "update:modelValue", value: string): void;
}>();

const modelValueInter = ref<string>(props.modelValue);
watch(
  modelValueInter,
  () => {
    emit("update:modelValue", modelValueInter.value);
  },
  {
    immediate: true,
  },
);

function onSelectSample(chosen: string) {
  modelValueInter.value = props.samples![chosen] as string;
}

const highlighter = (code: string) => {
  return highlight(code, languages.js, "javascript");
};
</script>

<style module>
.code {
  box-sizing: border-box;
  padding: 0;
}
.parseError {
  color: #f00;
}
.actions {
  margin-left: auto;
  float: right;
}
</style>
