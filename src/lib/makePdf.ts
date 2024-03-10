export async function makePdf(markdownText: string, customCss: string = "") {
    const formData = new FormData()

    formData.append('markdown', markdownText)
    formData.append('css', customCss)

    return await fetch('/api', {
        method: 'POST',
        body: formData
    })
}
