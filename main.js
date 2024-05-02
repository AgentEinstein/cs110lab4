document.querySelectorAll('input[name="sort"], input[name="time"]').forEach(input => {
    input.addEventListener('change', fetchAndDisplayArticles);
});

async function fetchAndDisplayArticles() {
    const sort = document.querySelector('input[name="sort"]:checked').value;
    const time = document.querySelector('input[name="time"]:checked').value;
    const articlesContainer = document.getElementById('articles-container');
    const apiKey = '6IPGoI88rQjGxo4NvU9hAOrbYjMxoUaW'; 
    const url = `https://api.nytimes.com/svc/mostpopular/v2/${sort}/${time}.json?api-key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        articlesContainer.innerHTML = ''; // Clear previous articles
        data.results.slice(0, 5).forEach((article, index) => {
            const articleHTML = `
                <div class="article">
                    <img src="${article.media[0]['media-metadata'][2].url}" alt="${article.title}">
                    <h2>${article.title}</h2>
                    <p>${article.abstract}</p>
                    <p>Published on: ${article.published_date}</p>
                </div>
            `;
            articlesContainer.innerHTML += articleHTML;
        });
    } catch (error) {
        console.error('Failed to fetch articles:', error);
    }
}

fetchAndDisplayArticles(); // Initial fetch on page load
