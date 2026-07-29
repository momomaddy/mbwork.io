import {client} from "./sanity"

export async function getLatestStories() {

return await client.fetch(`

*[_type=="story"]

| order(publishedAt desc)

[0...4]{

title,

slug,

publishedAt,

coverImage,

readingTime,

category

}

`)

}
