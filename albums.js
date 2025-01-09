function filterGalleries() {
    // Get the selected filter value and convert it to lowercase
    const filter = document.getElementById('filter-dropdown').value.toLowerCase();

    // Select all gallery cards and their parent container
    const cards = document.querySelectorAll('.services__card__music');
    const container = cards[0].parentNode;

    if (filter === 'recent') {
        // Parse a date from the text content using a regex pattern
        const parseDate = (text) => {
            const dateMatch = text.match(/(\d{1,2})\/(\d{1,2})\/(\d{2,4})/);
            if (!dateMatch) return null;
            const [_, day, month, year] = dateMatch.map(Number);
            return new Date(year < 100 ? year + 2000 : year, month - 1, day);
        };

        // Map cards to an array of objects containing the card and its parsed date
        const cardArray = Array.from(cards).map(card => {
            const dateText = card.querySelector('p').textContent;
            const date = parseDate(dateText);
            return { card, date };
        });

        // Sort the cards by date in descending order
        cardArray.sort((a, b) => (b.date || 0) - (a.date || 0));

        // Append the sorted cards back to the container and display them
        cardArray.forEach(({ card }) => {
            container.appendChild(card);
            card.style.display = 'block';
        });
    } else {
        // Map cards to an array of objects containing the card and its title
        const cardArray = Array.from(cards).map(card => {
            const title = card.querySelector('h2').textContent.toLowerCase();
            return { card, title };
        });

        // Sort the cards alphabetically by title
        cardArray.sort((a, b) => a.title.localeCompare(b.title));

        // Append the sorted cards back to the container
        cardArray.forEach(({ card }) => {
            container.appendChild(card);
        });

        // Filter cards based on the selected category
        cards.forEach(card => {
            const category = card.dataset.category || 'all';
            if (filter === 'all' || category.includes(filter)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Check if any cards are visible and toggle the "no results" message accordingly
    const noResults = document.getElementById('no-results');
    const visibleCards = Array.from(cards).some(card => card.style.display === 'block');
    noResults.style.display = visibleCards ? 'none' : 'flex';
}

function searchGalleries() {
    // Get the search query and convert it to lowercase
    let searchQuery = document.getElementById("search-input").value.toLowerCase();

    // Select all gallery cards and the "no results" message element
    let galleries = document.querySelectorAll(".services__card__music");
    let noResults = document.getElementById("no-results");

    // Track whether any matching gallery is found
    let found = false; 

    // Loop through galleries to check if the title or description matches the search query
    galleries.forEach(function(gallery) {
        let title = gallery.querySelector("h2").textContent.toLowerCase();
        let description = gallery.querySelector("p").textContent.toLowerCase(); 

        // Show or hide the gallery based on the search query
        if (title.includes(searchQuery) || description.includes(searchQuery)) {
            gallery.style.display = "block";
            found = true;
        } else {
            gallery.style.display = "none"; 
        }
    });

    // Toggle the "no results" message based on whether any galleries are found
    if (found) {
        noResults.style.display = "none";
    } else {
        noResults.style.display = "block";
    }
}
