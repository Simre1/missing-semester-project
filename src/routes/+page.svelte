<script>
	import {MdInput} from '../components/MdInput.js';
	import {PdfView} from '../components/PdfView.js';
	import {makePdf} from '$lib/makePdf.ts';


	$: markdown = ""
	$: pdf = makePdf(markdown)
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<MdInput bind:markdown={markdown}></MdInput>
<PdfView></PdfView>
{markdown}
