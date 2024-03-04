<script lang="ts">
	import { onMount } from 'svelte';
	import {MdInput} from '../components/MdInput.js';
	import {PdfView} from '../components/PdfView.js';
	import '@fontsource/londrina-shadow';
	import '@fontsource-variable/inter';
	import '@fontsource-variable/material-symbols-rounded';



	import {makePdf} from '$lib/makePdf.ts';
	import CSSInput from '../components/CSSInput.svelte';

	$: compileDisabled = (mdValue === "");
	$: hiddenCSS = true

	$: mdValue = "";
	$: cssValue = "";
	$: pdf = "";

	let mainElement: HTMLElement;
	let cssButton: HTMLButtonElement;
	let compileButton: HTMLButtonElement;
	let aboutDialog: HTMLDialogElement;
	let markdownWrapper: HTMLDivElement;
	let cssWrapper: HTMLDivElement;
	let pdfWrapper: HTMLDivElement;

	async function compile() {
		compileButton.style.transition="2s";
		compileButton.style.transform = "rotate(360deg)";
		setTimeout( () => {
			compileButton.style.transition="0s";
			compileButton.style.transform = "rotate(0deg)";
		}, 2000);
		let pdfPromise;
		if (hiddenCSS) {
			pdfPromise = await makePdf(mdValue);
		} else {
			pdfPromise = await makePdf(mdValue, "simple", cssValue);
		}
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

	async function toggleCSS() {
		hiddenCSS = !hiddenCSS
		calculateWidths()
		if (hiddenCSS) {
			cssButton.textContent = "Open CSS input"
		} else {
			cssButton.textContent = "Close CSS input"
		}
	}

	async function showAbout() {
		aboutDialog.open = !aboutDialog.open
	}

	onMount(async () => {
		calculateWidths()
		window.addEventListener("resize", calculateWidths)
	});


	function calculateWidths() {
		// Due to strange behaviour of the Monaco Editor, the size of the editors must be set with JS
		if (hiddenCSS) {
			let theWidth = mainElement.clientWidth
			markdownWrapper.style.width = (theWidth / 2) - 5 + "px"
			pdfWrapper.style.width = (theWidth / 2) - 5 + "px"
		}
		if (!hiddenCSS) {
			let theWidth = mainElement.clientWidth
			markdownWrapper.style.width = (theWidth / 3) - (20/3) + "px"
			cssWrapper.style.width = (theWidth / 3) - (20/3) + "px"
			pdfWrapper.style.width = (theWidth / 3) - (20/3) + "px"
		}
	}
</script>

<header>
	<h1>MarkDownie's PDF Party</h1>
	<img src="logo.svg" alt="Logo of MarkDownie's PDF Party">

	<button id="showcss" type="button" on:click={toggleCSS} bind:this={cssButton}>Open CSS input</button>

	<button id="compile" type="button" on:click={compile} disabled={compileDisabled} bind:this={compileButton}>
		&#58837<span>Compile</span>
</button>
	<button id="showabout" type="button" on:click={showAbout}>About + Help</button>

</header>
<main bind:this={mainElement} >
	<dialog bind:this={aboutDialog}>
		<h1>About McDownies PDF Party</h1>
		<div>Description</div>
		<h2>Used open-source projects and libraries:</h2>
		<ul>
			<li>dfghjklö</li>
		</ul>
	</dialog>
	<div bind:this={markdownWrapper}>
		<div class="columnTitle">Markdown source:</div>
		<MdInput bind:mdValue={mdValue}></MdInput>
	</div>
	<div bind:this={cssWrapper} hidden="{hiddenCSS}">
		<div class="columnTitle">Custom CSS styles</div>
		<CSSInput bind:cssValue={cssValue}></CSSInput>
	</div>
	<div bind:this={pdfWrapper}>
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

dialog {
		z-index: 1000;
		position: fixed;
    top: 10%;
		width: calc(100% - 200px);
		height: 80%;
}

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

#compile, #showcss, #showabout{
    position: absolute;
    top: 0;
    border: none;
    background-color: #305b80;
    color: white;
}

#compile {
		left: calc(50% - 44px);
		width: 88px;
		height: 88px;
		border-radius: 44px;
    font-family: 'Material Symbols Rounded Variable', sans-serif;
		font-size: 40px;
		z-index: 10;

}

#showcss {
		height: 60px;
		width:165px;
    right: calc(50%);
		text-align: left;
}

#showabout {
    height: 60px;
    width:140px;
    left: calc(50%);
    text-align: right;
}

#compile:disabled {
		color: #adb0bd;
}



#compile > span {
		font-size: 0;
}

</style>