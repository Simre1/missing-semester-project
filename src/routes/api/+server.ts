import type { RequestHandler } from "@sveltejs/kit";
import markdownpdf from 'markdown-pdf'
import tmp from 'tmp'
import fs from 'fs'

export const POST: RequestHandler = async ({ request }): Promise<Response> => {
    let formData: FormData = await request.formData()

    // Get Markdown
    let markdownText: string = formData.get('markdown') as string

    if (!markdownText) {
        return new Response('No markdown provided', { status: 400 })
    }

    // Add base CSS
    let cssFile: tmp.FileResult = tmp.fileSync();

    fs.writeFileSync(cssFile.name, BASE_CSS)

    // Add custom CSS
    let customCss: string = formData.get('css') as string

    if (customCss) {
        fs.appendFileSync(cssFile.name, customCss)
    }

    // Build Markdown options
    let options = { cssPath: cssFile.name }

    // Uncomment to log HTML output
    // options = {
    //     cssPath: cssFile.name, preProcessHtml: () => through.obj(function (chunk, encoding, callback) {
    //         console.log('Received:', chunk.toString(encoding));

    //         this.push(chunk.toString());

    //         callback();
    //     })

    // }

    let pdfData = new Promise((resolve, reject) => markdownpdf(options).from.string(markdownText).to.buffer(null, (err, buffer) => {
        if (err) {
            reject(err)
        } else {
            resolve(buffer)
        }
    }))

    // Return PDF file
    let response: Response = new Response(await pdfData, { status: 200 })

    return response
};

const BASE_CSS: string = `
body {
    margin-left: 1em;
    margin-right: 1em;
    color: #080808;
}

code {
    background-color: #f5f5f5;
    display: block;
    padding: 0.5em;
    border-radius: 0.5em;
}

pre {
    border: none;
}
`