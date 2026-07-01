const PROJECT_ID = "ipmstef7";
const DATASET = "production";

// Read slug from URL
const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");

// Sanity query
const query = encodeURIComponent(`
*[_type=="story" && slug.current=="${slug}"][0]{
  title,
  summary,
  publishedAt,
  thinking,
  body
}
`);

const url =
`https://${PROJECT_ID}.api.sanity.io/v2025-02-19/data/query/${DATASET}?query=${query}`;
function renderPortableText(body) {

  if (!body) return "";

  return body.map(block => {

    if (block._type !== "block") return "";

    const text = block.children
      .map(child => child.text)
      .join("");

    switch (block.style) {

      case "h1":
        return `<h1>${text}</h1>`;

      case "h2":
        return `<h2>${text}</h2>`;

      case "h3":
        return `<h3>${text}</h3>`;

      case "blockquote":
        return `<blockquote>${text}</blockquote>`;

      default:
        return `<p>${text}</p>`;
    }

  }).join("");

}
fetch(url)
.then(res => res.json())
.then(data => {

  const story = data.result;
  const words =
JSON.stringify(story.body).split(" ").length;

const readTime =
Math.max(1, Math.round(words / 220));

  document.getElementById("story").innerHTML = `
    <article class="story-page">

      <div class="story-meta">
        ${story.thinking.toUpperCase()}
      </div>

      <h1>${story.title}</h1>

      <p class="story-summary">
        ${story.summary || ""}
      </p>

      <div class="story-date">
        ${new Date(story.publishedAt).toLocaleDateString("en-US",{
          month:"long",
          day:"numeric",
          year:"numeric"
        })}
      </div>

     <hr>

<div class="story-body">
  ${renderPortableText(story.body)}
</div>

    </article>
  `;

});
