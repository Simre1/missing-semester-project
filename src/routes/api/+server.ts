import type { RequestHandler } from "@sveltejs/kit";
import markdownpdf from 'markdown-pdf'
import tmp from 'tmp'
import fs from 'fs'

import simpleTheme from '$lib/themes/simple.css'

export const POST: RequestHandler = async ({ request }) => {
    let formData = await request.formData()

    // Get Markdown
    let markdownText = formData.get('markdown') as string

    if (!markdownText) {
        return new Response('No markdown provided', { status: 400 })
    }

    const tmpMdFile = tmp.fileSync();
    fs.writeFileSync(tmpMdFile.name, markdownText)


    // Get Theme
    let cssFile = tmp.fileSync();

    let theme = formData.get('theme') as string

    if (!theme) {
        theme = 'simple'
    }

    fs.writeFileSync(cssFile.name, getTheme(theme))

    // Add custom CSS
    let customCss = formData.get('css') as string

    if (customCss) {
        fs.appendFileSync(cssFile.name, customCss)
    }

    // Build Markdown options
    let options = { cssPath: cssFile.name }

    // Write PDF
    const tmpPdfFile = tmp.fileSync();

    let pdfFile = new Promise((resolve, reject) => markdownpdf(options).from(tmpMdFile.name).to(tmpPdfFile.name, () => {
        fs.readFile(tmpPdfFile.name, (err, data) => err ? reject(err) : resolve(data))
    }))

    // Return PDF file
    let response: Response = new Response(await pdfFile, { status: 200 })

    return response
};


function getTheme(theme: string): string {

    switch (theme) {
        case 'simple':
            return simpleTheme.toString()
        default:
            throw new Error('Theme not found')
    }

}