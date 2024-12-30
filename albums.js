function filterGalleries() {
    const filter = document.getElementById('filter-dropdown').value.toLowerCase();
    const cards = document.querySelectorAll('.services__card__music');
    const container = cards[0].parentNode; // Assumes all cards share the same parent container

    if (filter === 'recent') {
        // Parse and sort cards by date
        const parseDate = (text) => {
            const dateMatch = text.match(/(\d{1,2})\/(\d{1,2})\/(\d{2,4})/);
            if (!dateMatch) return null;
            const [_, day, month, year] = dateMatch.map(Number);
            return new Date(year < 100 ? year + 2000 : year, month - 1, day);
        };

        const cardArray = Array.from(cards).map(card => {
            const dateText = card.querySelector('p').textContent;
            const date = parseDate(dateText);
            return { card, date };
        });

        // Sort by date, most recent first
        cardArray.sort((a, b) => (b.date || 0) - (a.date || 0));

        // Append sorted cards to the container
        cardArray.forEach(({ card }) => {
            container.appendChild(card);
            card.style.display = 'block'; // Ensure all cards are visible
        });
    } else {
        // Default filtering logic
        cards.forEach(card => {
            const category = card.dataset.category || 'all'; 
            if (filter === 'all' || category.includes(filter)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Update the no-results message
    const noResults = document.getElementById('no-results');
    const visibleCards = Array.from(cards).some(card => card.style.display === 'block');
    noResults.style.display = visibleCards ? 'none' : 'flex';
}


function searchGalleries() {
    // Get the search input value and convert it to lowercase for case-insensitive search
    let searchQuery = document.getElementById("search-input").value.toLowerCase();
    
    // Get all gallery items (the .services__card__music elements)
    let galleries = document.querySelectorAll(".services__card__music");
    
    let noResults = document.getElementById("no-results");
    
    let found = false; // Flag to track if any results are found
    
    // Loop through each gallery item and hide/show based on the search query
    galleries.forEach(function(gallery) {
        let title = gallery.querySelector("h2").textContent.toLowerCase(); // Get the title of the gallery
        let description = gallery.querySelector("p").textContent.toLowerCase(); // Get the date/description
        
        // Check if the title or description contains the search query
        if (title.includes(searchQuery) || description.includes(searchQuery)) {
            gallery.style.display = "block"; // Show the gallery item
            found = true;
        } else {
            gallery.style.display = "none"; // Hide the gallery item
        }
    });
    
    // If no galleries were found, show the "No results" message
    if (found) {
        noResults.style.display = "none";
    } else {
        noResults.style.display = "block";
    }
}

document.getElementById('search-input').addEventListener('click', function() {
    this.focus();
});

document.getElementById('filter-dropdown').addEventListener('click', function() {
    this.focus();
});

