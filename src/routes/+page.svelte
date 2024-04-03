<script lang="ts">
	import { onMount } from 'svelte';
	import MdInput from '../components/MdInput.svelte';
	import PdfView from '../components/PdfView.svelte';
	import ApacheLicense from '../components/ApacheLicense.svelte';
	import MITLicense from '../components/MITLicense.svelte';
	import '@fontsource/londrina-shadow';
	import '@fontsource-variable/inter';
	import '@fontsource-variable/material-symbols-rounded';
	import '@tsparticles/confetti';

	import { makePdf } from '$lib/makePdf.ts';
	import CSSInput from '../components/CSSInput.svelte';
	import { confetti } from '@tsparticles/confetti';

	$: compileDisabled = mdValue === '';
	$: hiddenCSS = true;

	$: mdValue = '';
	$: cssValue = '';
	$: pdf = '';

	let mainElement: HTMLElement;
	let cssButton: HTMLButtonElement;
	let compileButton: HTMLButtonElement;
	let aboutDialog: HTMLDialogElement;
	let markdownWrapper: HTMLDivElement;
	let cssWrapper: HTMLDivElement;
	let pdfWrapper: HTMLDivElement;

	async function compile() {
		compileButton.style.transition = '20s linear';
		compileButton.style.transform = 'rotate(3600deg)';
		let pdfPromise;
		if (hiddenCSS) {
			pdfPromise = await makePdf(mdValue);
		} else {
			pdfPromise = await makePdf(mdValue, cssValue);
		}
		compileButton.style.transition = '0s';
		compileButton.style.transform = 'rotate(0deg)';
		pdfPromise.blob().then((res) => {
			let reader = new FileReader();
			reader.readAsDataURL(res);
			reader.onloadend = function () {
				let base64data = reader.result; // the result always starts with "data:application/octet-stream;base64," but we need "data:application/pdf;base64,"
				//console.log(base64data);
				pdf = String(base64data).replace('octet-stream', 'pdf');
				//console.log(pdf)
				confetti({
					particleCount: 200,
					spread: 60,
					origin: { y: 0.7 }
				});
			};
		});
	}

	async function toggleCSS() {
		hiddenCSS = !hiddenCSS;
		calculateWidths();
		if (hiddenCSS) {
			cssButton.innerHTML = "&#58313<span style='font-size: 0'>Show CSS</span>";
		} else {
			cssButton.innerHTML = "&#59728<span style='font-size: 0'>Close CSS Input</span>";
		}
	}

	async function toggleAbout() {
		if (!aboutDialog.open)
			aboutDialog.showModal(); // we use showmodal instead of the HTML elements open property,
		// as only then, the ::backdrop pseudo class is used!
		else aboutDialog.close();
	}

	onMount(async () => {
		calculateWidths();
		window.addEventListener('resize', calculateWidths);
	});

	function calculateWidths() {
		// Due to strange behaviour of the Monaco Editor, the size of the editors must be set with JS
		if (hiddenCSS) {
			let theWidth = mainElement.clientWidth;
			markdownWrapper.style.width = theWidth / 2 - 5 + 'px';
			pdfWrapper.style.width = theWidth / 2 - 5 + 'px';
		}
		if (!hiddenCSS) {
			let theWidth = mainElement.clientWidth;
			markdownWrapper.style.width = theWidth / 3 - 20 / 3 + 'px';
			cssWrapper.style.width = theWidth / 3 - 20 / 3 + 'px';
			pdfWrapper.style.width = theWidth / 3 - 20 / 3 + 'px';
		}
	}
</script>

<header>
	<h1>MarkDownie's PDF Party</h1>
	<button id="showcss" type="button" on:click={toggleCSS} bind:this={cssButton}
		>&#58313<span>Show CSS</span></button
	>
	<button
		id="compile"
		type="button"
		on:click={compile}
		disabled={compileDisabled}
		bind:this={compileButton}
	>
		&#58837<span>Compile</span>
	</button>
	<button id="showabout" type="button" on:click={toggleAbout}
		>Help<span>Show about and help dialog</span></button
	>
</header>
<main bind:this={mainElement}>
	<dialog bind:this={aboutDialog}>
		<button id="closeabout" on:click={toggleAbout}>Close<span>Close the help dialog</span></button>
		<h1>About <span>McDownie's PDF Party</span></h1>
		<p>Welcome to McDownie's PDF Party - your easy to use Markdown to PDF converter.</p>
		<p>
			To convert Markdown encoded text, paste it into the editor on the left. Press then compile
			button (<span>&#58837</span>) to create a PDF out of it, which gets then displayed on the
			right. As a special service, everytime you compile, a (harmless) surprise will happen to
			brighten up your day. 🎉🥳
		</p>
		<p>
			Per default, a minimalistic CSS theme is used for the PDF creation. If you would like to
			adjust the theme or use you own, open the CSS editor (using the <span>&#58313</span> button),
			which will then be displayed in the center. By writing CSS for standard HTML element
			identifiers (<code>h1</code>, <code>p</code>, ...) you can adjut the style of the PDF. Please
			note, that the entered CSS is only applied, if the editor is opened.
		</p>
		<h2>Used open-source projects, libraries and trademarks:</h2>
		<p>
			For the creation of McDownie's PDF Party, we entered the JavaScript Hell (although relying on TypeScript as well)
			and use a number open-source projects as listed below:
		</p>
		<ul>
			<li><MITLicense name="md-to-pdf" owner="Simon Hänisch" year="2024" /></li>
			<li><ApacheLicense name="Material Symbols" owner="Google" year="2024" /></li>
			<li>
				<MITLicense name="Monaco Editor" owner="Microsoft Corporation" year="2016 - present" />
			</li>
			<li>
				<MITLicense
					name="Svelte"
					owner="the contributors of the repository at https://github.com/sveltejs/svelte"
					year="2016 - 2024"
				></MITLicense>
			</li>
			<li><MITLicense name="tsParticles" owner="Matteo Bruni" year="2020" /></li>
		</ul>
	</dialog>
	<div bind:this={markdownWrapper}>
		<div class="columnTitle">Markdown source:</div>
		<MdInput bind:mdValue></MdInput>
	</div>
	<div bind:this={cssWrapper} hidden={hiddenCSS}>
		<div class="columnTitle">Custom CSS styles:</div>
		<CSSInput bind:cssValue></CSSInput>
	</div>
	<div bind:this={pdfWrapper}>
		{#if mdValue === '' && pdf === ''}
			<div id="prompt"><p>Enter Markdown code to start your PDF party!<br />🎉🥳</p></div>
		{:else if mdValue !== '' && pdf === ''}
			<div id="prompt"><p>Run compile to display the PDF.</p></div>
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
		border-color: #305b80;
		border-width: 10px;
		font-size: 16px;
	}

	dialog::backdrop {
		background-color: rgba(0, 0, 0, 50%);
	}

	dialog > h1 {
		margin: 0;
		font-size: 35px;
		margin-bottom: 10px;
	}

	dialog > h1,
	dialog > h2 {
		color: #305b80;
	}

	dialog > h1 > span {
		font-family: 'Londrina Shadow', 'Inter Variable', sans-serif;
	}

	dialog > p > span {
		font-family: 'Material Symbols Rounded Variable', sans-serif;
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
		font-family: 'Londrina Shadow', 'Inter Variable', sans-serif;
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
	}

	main > div {
		background-color: white;
	}
	.columnTitle {
		margin-top: 5px;
		height: 25px;
		font-size: 16px;
		margin-left: 12px;
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

	#compile,
	#showcss,
	#showabout,
	#closeabout {
		border: none;
		background-color: #305b80;
		color: white;
		font-family: 'Material Symbols Rounded Variable', sans-serif;
		font-size: 40px;
	}

	#compile,
	#showcss,
	#showabout {
		position: absolute;
		top: 0;
	}

	#compile > span,
	#showcss > span,
	#showabout > span,
	#closeabout > span {
		font-size: 0;
	}

	#compile {
		left: calc(50% - 44px);
		width: 88px;
		height: 88px;
		border-radius: 44px;
		z-index: 10;
	}

	#showcss {
		height: 60px;
		width: 120px;
		right: calc(50%);
		text-align: left;
	}

	#closeabout {
		position: fixed;
		right: 115px;
	}

	#showabout {
		height: 60px;
		width: 120px;
		left: calc(50%);
		text-align: right;
	}

	#compile:disabled {
		color: #adb0bd;
	}
</style>
