import {createClient} from "@sanity/client"

export const client = createClient({

projectId: "YOUR_PROJECT_ID",

dataset: "production",

apiVersion: "2025-01-01",

useCdn: true

})
