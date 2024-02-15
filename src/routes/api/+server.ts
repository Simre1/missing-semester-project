import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
    let markdown = await request.text()

    let response: Response = new Response(markdown, { status: 200 })

    return response
};
