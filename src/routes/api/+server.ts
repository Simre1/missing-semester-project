import type { RequestHandler } from "@sveltejs/kit";
import markdownpdf from 'markdown-pdf'
import tmp from 'tmp'
import fs from 'fs'

export const POST: RequestHandler = async ({ request }) => {
    let markdownText = await request.text()

    const tmpMdFile = tmp.fileSync();
    fs.writeFileSync(tmpMdFile.name, markdownText)

    const tmpPdfFile = tmp.fileSync();

    let pdfFile = new Promise((resolve, reject) => markdownpdf().from(tmpMdFile.name).to(tmpPdfFile.name, () => {
        fs.readFile(tmpPdfFile.name, (err, data) => err ? reject(err) : resolve(data))
    }))

    let response: Response = new Response(await pdfFile, { status: 200 })

    return response
};
