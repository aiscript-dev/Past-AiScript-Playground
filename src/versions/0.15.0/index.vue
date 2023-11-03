<template>
<div id="root">
	<div id="grid1">
		<Container id='editor'>
			<template #header>
				Input<div class="actions"><button @click="setCode">FizzBuzz</button></div>
			</template>
			<PrismEditor class="code" v-model="script" :highlight="highlighter" :line-numbers="false"/>
			<template #footer>
				<span v-if="syntaxErrorMessage" class="syntaxError">{{ syntaxErrorMessage }}</span>
				<div class="actions"><button @click="run">RUN</button></div>
			</template>
		</Container>
		<Container id='logs'>
			<template #header>Output</template>
			<div v-for="log in logs" class="log" :key="log.id" :class="[{ print: log.print }, log.type]"><span class="type">{{ log.type }}</span> {{ log.text }}</div>
		</Container>
	</div>
	<div id="grid2">
		<Container id='ast'>
			<template #header>AST</template>
			<pre>{{ JSON.stringify(ast, null, '\t') }}</pre>
		</Container>
		<Container id='bin'>
			<template #header>Bytecode</template>
			<header></header>
		</Container>
		<Container id='debugger'>
			<template #header>Debugger</template>
		</Container>
	</div>
</div>
</template>

<script setup lang='ts'>
import { ref, watch } from 'vue';
import { Interpreter, Parser, values, utils, Ast } from 'aiscript0_15_0';

import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css';
import 'prismjs';
/**
 * @types/prismjsの更新が止まっているためとりあえずts-ignoreする（declare moduleしようとしたがうまくいかなかった）
 */
// @ts-ignore
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-okaidia.css';
import Container from '@common/Container.vue';

// 使う場所はそんなにないしとりあえずunknownで
type Grammer = unknown;
declare var languages: {
	js: Grammer;
};
declare function highlight(test: string, grammer: Grammer, language: string): string;

const script = ref(window.localStorage.getItem('script') || '<: "Hello, AiScript!"');

const ast = ref<Ast.Node[]|null>(null);
const logs = ref<{
	id: number,
	type?: string,
	text?: string,
	print?: boolean
}[]>([]);
const syntaxErrorMessage = ref<string|null>(null);

watch(script, () => {
	window.localStorage.setItem('script', script.value);
	try {
		ast.value = Parser.parse(script.value);
		syntaxErrorMessage.value = null;
	} catch (e) {
		const err = e as Error;
		syntaxErrorMessage.value = err.message;
		console.error(('info' in err) ? err.info : err);
		return;
	}
}, {
	immediate: true
});

const setCode = () => {
	script.value = `for (let i, 100) {
  <: if (i % 15 == 0) "FizzBuzz"
    elif (i % 3 == 0) "Fizz"
    elif (i % 5 == 0) "Buzz"
    else i
}`;
};

let interpreter: Interpreter|null = null;
const run = async () => {
	logs.value = [];

	interpreter?.abort();
	interpreter = new Interpreter({}, {
		in: (q: string) => {
			return new Promise(ok => {
				const res = window.prompt(q);
				ok(res ?? '');
			});
		},
		out: (value: values.Value) => {
			logs.value.push({
				id: Math.random(),
				type: value.type,
				text: utils.valToString(value, true),
				print: true
			});
		},
		log: (type: string, params: Record<string, any>) => {
			switch (type) {
				case 'end': logs.value.push({
					id: Math.random(),
					text: utils.valToString(params.val, true),
					print: false
				}); break;
				default: break;
			}
		}
	});

	try {
		await interpreter.exec(ast.value!);
	} catch (e) {
		console.error(e);
		window.alert(`{e}`);
	}
}

const highlighter = (code: string) => {
	return highlight(code, languages.js, 'javascript');
};
</script>

<style scoped>
pre {
	margin: 0;
}

#root {
	display: flex;
	flex-direction: column;
	height: 100vh;
}

#grid1 {
	box-sizing: border-box;
	flex: 1;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr;
	grid-gap: 16px;
	padding: 16px 16px 16px 16px;
	min-height: 0;
}
#grid1 > * {
	min-height: 0;
}
#grid2 {
	box-sizing: border-box;
	flex: 1;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-template-rows: 1fr;
	grid-gap: 16px;
	padding: 0 16px 16px 16px;
	min-height: 0;
}
#grid2 > * {
	min-height: 0;
}

#editor {
}
#editor > .code {
	box-sizing: border-box;
	padding: 16px;
}
#editor .syntaxError {
	color: #f00;
}

#logs .log .type {
	opacity: 0.5;
	color: #fff;
}
#logs .log:not(.print) {
	opacity: 0.7;
}
#logs .log.num {
	color: #0ff;
}
#logs .log.str {
	color: #ff0;
}

#ast {

}

.container {
	display: flex;
	flex-direction: column;
	border: solid var(--borderThickness) #555;
	border-radius: 8px;
	background: #202020;
}
.container > header {
	display: flex;
	padding: 8px 16px;
	border-bottom: dashed var(--borderThickness) #555;
	font-weight: bold;
}
.container > header > .actions {
	margin-left: auto;
}
.container > div {
	flex: 1;
	overflow: auto;
	padding: 16px;
}
.container > footer {
	display: flex;
	padding: 8px 16px;
	border-top: dashed var(--borderThickness) #555;
}
.container > footer > .actions {
	margin-left: auto;
}
</style>
