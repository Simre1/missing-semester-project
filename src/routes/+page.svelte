<script>
	import {MdInput} from '../components/MdInput.js';
	import {PdfView} from '../components/PdfView.js';
	import '@fontsource/londrina-shadow';
	import '@fontsource-variable/inter';



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

<header>
	<h1>MarkDownie's PDF Party</h1>
	<img src="logo.svg" alt="Logo of MarkDownie's PDF Party">

	<button id="compile" type="button" on:click={compile} disabled={compileDisabled}>
	Compile
</button>
</header>
<main>
	<div>
		<MdInput bind:mdValue={mdValue}></MdInput>
	</div>
	<div>
	{#if mdValue === "" && pdf === ""}
		<span>Enter Markdown code to start your PDF party! 🎉🥳</span>
	{:else if mdValue !== "" && pdf === ""}
			Run compile to display the pdf
	{:else}
			<PdfView bind:pdfBlob={pdf}></PdfView>
	{/if}
	</div>
</main>



<style>

header {
		display: flex;
		color: white;
		background-color: steelblue;
		position: absolute;
		top: 0;
		left: 0;
    right: 0;
		height: 50px;
    font-family: 'Inter Variable', sans-serif;

}
header > h1 {
		margin: 0;
    font-family: 'Londrina Shadow', system-ui;
		margin-top: 3px;
		margin-left: 5px;
		font-size: 40px;
}


main {
		background-color: #080808;
		position: absolute;
		display: flex;
		top: 50px;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		margin: 0;
    font-family: 'Inter Variable', sans-serif;

}
main > div {
		width: 50%;
		height: 100%;
		margin: 0;
}




</style>