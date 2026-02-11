import { AxiosClient } from "@xcrap/axios-client"

export const baseUrl = "https://dbgames.info/dragoncity"

export type FetchOptions = {
    path: string
    params?: Record<string, string | number | boolean | undefined>
}

export class Client {
    private readonly client: AxiosClient

    constructor() {
        this.client = new AxiosClient({
            rateLimit: {
                maxRPS: 20,
            },
        })
    }

    async fetch({ path, params }: FetchOptions) {
        const query = new URLSearchParams()

        for (const [key, value] of Object.entries(params ?? {})) {
            if (value === undefined) continue
            if (key === "p" && Number(value) < 2) continue
            query.append(key, String(value))
        }

        const url = `${baseUrl}${path}?${query.toString()}`
        console.log(url)
        const response = await this.client.fetch({ url: url })
        const parser = response.asHtmlParser()

        return parser
    }
}
