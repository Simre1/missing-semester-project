<script lang="ts">
	import '@fontsource-variable/jetbrains-mono';
	export let mdValue: String = "";

	import loader from '@monaco-editor/loader';
	import { onDestroy, onMount } from 'svelte';
	import type * as Monaco from 'monaco-editor/esm/vs/editor/editor.api';


	// Editor used based on this tutorial: https://www.codelantis.com/blog/sveltekit-monaco-editor
	let editor: Monaco.editor.IStandaloneCodeEditor;
	let monaco: typeof Monaco;
	let editorContainer: HTMLElement;
	let subscriptions = [];

	onMount(async () => {
		const monacoEditor = await import('monaco-editor');
		loader.config({ monaco: monacoEditor.default });

		monaco = await loader.init();

		const editor = monaco.editor.create(editorContainer, {theme: "vs-dark"});
		const model = monaco.editor.createModel(
			"",
			'markdown'
		);
		editor.setModel(model);

		editor.onDidChangeModelContent(() => {
			mdValue = editor.getValue();
		});
	});

	onDestroy(() => {
		monaco?.editor.getModels().forEach((model) => model.dispose());
		editor?.dispose();
	});

</script>

<div bind:this={editorContainer}></div>
<!--<textarea id="mdInput" bind:value={mdValue} ></textarea>-->

<style>
	div {
      font-family: 'JetBrains Mono Variable', monospace;
			width: 100%;
			height: 100%;
			margin: 0;
	}
</style>