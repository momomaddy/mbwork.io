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

fetch(url)
.then(res => res.json())
.then(data => {

  const story = data.result;

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

      <pre>
${JSON.stringify(story.body,null,2)}
      </pre>

    </article>
  `;

});
