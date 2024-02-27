export async function makePdf(markdownText: string, theme: string = "simple", customCss: string = "") {
    const formData = new FormData()

    formData.append('markdown', markdownText)
    formData.append('theme', theme)
    formData.append('css', customCss)

    return await fetch('/api', {
        method: 'POST',
        body: formData
    })
}

export function listThemes() {
    return ['simple']
}
