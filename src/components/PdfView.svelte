<script>
	export let pdfBlob = "";
</script>

<object title="title" id="pdfView" type="application/pdf" data={pdfBlob}></object>

<style>
	object {
			display: block;
			width: 100%;
			height: 100%;
	}
</style>