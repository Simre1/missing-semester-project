import type { RequestHandler } from "@sveltejs/kit";
import { mdToPdf } from 'md-to-pdf';

export const POST: RequestHandler = async ({ request }): Promise<Response> => {
    let formData: FormData = await request.formData()

    // Get Markdown
    let markdownText: string = formData.get('markdown') as string

    if (!markdownText) {
        return new Response('No markdown provided', { status: 400 })
    }

    // Get CSS
    let css: string = BASE_CSS + formData.get('css') as string

    const pdf = await mdToPdf({ content: markdownText }, { css, launch_options: { headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] } }).catch(console.error);

    // Return PDF file
    if (pdf) {
        let response: Response = new Response(pdf.content, { status: 200 })

        return response
    } else {
        return new Response('Error', { status: 500 })
    }
};

const BASE_CSS: string = `
body {
    margin-left: 1em;
    margin-right: 1em;
    color: #080808;
    font-size: 15px;
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