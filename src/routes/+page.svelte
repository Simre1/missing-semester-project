<script>
	import {MdInput} from '../components/MdInput.js';
	import {PdfView} from '../components/PdfView.js';
	import {makePdf} from '$lib/makePdf.ts';

	$: compileDisabled = (mdValue === "");
	$: mdValue = "";
	$: pdf = "";

	async function compile() {
		let pdfPromise = await makePdf(mdValue);
		pdfPromise.blob().then((res) => {
			let reader = new FileReader();
			reader.readAsDataURL(res);
			reader.onloadend = function() {
				let base64data = reader.result; // the result always starts with "data:application/octet-stream;base64," but we need "data:application/pdf;base64,"
				//console.log(base64data);
				pdf = String(base64data).replace("octet-stream", "pdf");
				//console.log(pdf)
			}
		});
	}
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<header>
<button type="button" on:click={compile} disabled={compileDisabled}>
	Post it.
</button>
</header>
<main>
	<div>
<MdInput bind:mdValue={mdValue}></MdInput>
</div>
	<div>
{#if mdValue === "" && pdf === ""}
	Enter Markdown code to start your PDF party! 🎉🥳
	{:else if mdValue !== "" && pdf === ""}
	Run compile to display the pdf
	{:else}
	<PdfView bind:pdfBlob={pdf}></PdfView>
{/if}
		</div>
</main>
