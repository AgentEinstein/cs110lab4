document.addEventListener('DOMContentLoaded', () => {
    const defaultSort = document.querySelector('input[name="sort"]:checked').value;
    const defaultTime = document.querySelector('input[name="time"]:checked').value;
    fetchAndDisplayArticles(defaultSort, defaultTime);
});


document.querySelectorAll('input[name="sort"], input[name="time"]').forEach(input => {
    input.addEventListener('change', handleSelectionChange);
});


function handleSelectionChange() {
    const sort = document.querySelector('input[name="sort"]:checked').value;
    const time = document.querySelector('input[name="time"]:checked').value;
    fetchAndDisplayArticles(sort, time);
}

async function fetchAndDisplayArticles(sort, time) {
    const apiKey = '6IPGoI88rQjGxo4NvU9hAOrbYjMxoUaW'; 
    const url = `https://api.nytimes.com/svc/mostpopular/v2/${sort}/${time}.json?api-key=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        displayArticles(data.results);
    } catch (error) {
        console.error('Failed to fetch articles:', error);
    }
}

function displayArticles(articles) {
    const container = document.getElementById('articles-container');
    container.innerHTML = ''; 
    articles.slice(0, 5).forEach(article => {
        const articleHTML = createArticleHTML(article);
        container.innerHTML += articleHTML;
    });
}

function createArticleHTML(article) {
    const imageUrl = article.media.length > 0 ? article.media[0]['media-metadata'][2].url : 'placeholder.jpg';
    return `
    <div class="article">
    <div class="article-header">
    <h2 class="article-title">${article.title}</h2>
        <p class="article-date">${article.published_date}</p>
    </div>
    <div class="article-content">
        <img src="${imageUrl}" alt="${article.title}">
        <p>${article.abstract}</p>
    </div>
</div>

    `;
}
