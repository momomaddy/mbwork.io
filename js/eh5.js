console.log("EH5 JS loaded");
const PROJECT_ID = "ipmstef7";
const DATASET = "production";

const query = encodeURIComponent(`
  *[_type=="story"] | order(publishedAt desc){
    title,
    subtitle,
    slug,
    publishedAt,
    thinking
  }
`);

const url =
  `https://${PROJECT_ID}.api.sanity.io/v2025-02-19/data/query/${DATASET}?query=${query}`;

fetch(url)
  .then(res => res.json())
  .then(data => {

    const container = document.getElementById("stories");

    data.result.forEach(story => {

      const article = document.createElement("article");

      article.className = "stream-post short";

      article.innerHTML = `
        <h2 class="stream-post-title">
          <a href="#">${story.title}</a>
        </h2>

        <p class="stream-post-excerpt">
          ${story.subtitle || ""}
        </p>

        <div class="stream-post-meta">

          <span class="meta-date">
            ${new Date(story.publishedAt).toLocaleDateString("en-US",{
              month:"short",
              day:"numeric",
              year:"numeric"
            })}
          </span>

          <span class="meta-tag red">
            ${story.thinking || ""}
          </span>

        </div>
      `;

      container.appendChild(article);

    });

  });
