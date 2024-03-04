<script lang="ts">
	import {MdInput} from '../components/MdInput.js';
	import {PdfView} from '../components/PdfView.js';
	import '@fontsource/londrina-shadow';
	import '@fontsource-variable/inter';
	import '@fontsource-variable/material-symbols-rounded';



	import {makePdf} from '$lib/makePdf.ts';

	$: compileDisabled = (mdValue === "");
	$: showCSS = false
	$: showAbout = false

	$: mdValue = "";
	$: pdf = "";

	let compileButton: HTMLButtonElement;
	async function compile() {
		compileButton.style.transition="2s";
		compileButton.style.transform = "rotate(360deg)";
		setTimeout( () => {
			compileButton.style.transition="0s";
			compileButton.style.transform = "rotate(0deg)";
		}, 2000);
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

	<button id="compile" type="button" on:click={compile} disabled={compileDisabled} bind:this={compileButton}>
	&#58837<span>Compile</span>
</button>
</header>
<main>
	{#if showCSS}
	<div>CSS editor</div>
		{/if}
	<div>
		<div class="columnTitle">Markdown source:</div>
		<MdInput bind:mdValue={mdValue}></MdInput>
	</div>
	<div>
	{#if mdValue === "" && pdf === ""}
		<div id="prompt"><p>Enter Markdown code to start your PDF party!<br>🎉🥳</p></div>
	{:else if mdValue !== "" && pdf === ""}
		<div id="prompt"><p>Run compile to display the pdf</p></div>
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
		height: 6em;
    font-size: 10px;
    font-family: 'Inter Variable', sans-serif;

}
header > h1 {
		margin: 0;
    font-family: 'Londrina Shadow', system-ui;
		margin-top: 0.2em;
		margin-left: 0.3em;
		font-size: 40px;
}


main {
		/* Intersting discussion on even distribution of children:
		https://css-tricks.com/equal-columns-with-flexbox-its-more-complicated-than-you-might-think/*/
		position: absolute;
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: 1fr;
		gap: 10px;
		top: 6em;
		left: 0;
		right: 0;
		bottom: 0;
		width: auto;
		font-family: 'Inter Variable', sans-serif;
		font-size: 10px;
		grid-gap: 1em;
		background-color: #305b80;
;
}

main > div {
background-color: white;
}
.columnTitle {
		margin-top: 5px;
		height: 25px;
		font-size: 16px;
}

#prompt {
		display: table;
		height: 100%;
		width: 100%;
}

#prompt > p {
		display: table-cell;
		text-align: center;
		vertical-align: middle;
		font-size: 30px;
}

#compile {
		position: absolute;
		left: calc(50% - 44px);
		top: 0;
		width: 88px;
		height: 88px;
		border-radius: 44px;
		border: none;
		background-color: #305b80;
		color: white;
    font-family: 'Material Symbols Rounded Variable', sans-serif;
		font-size: 40px;
		z-index: 10;

}

#compile:disabled {
		color: #adb0bd;
}



#compile > span {
		font-size: 0;
}

</style>