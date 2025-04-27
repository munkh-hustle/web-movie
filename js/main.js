document.addEventListener('DOMContentLoaded', function() {
    // Sample movie data
    const movies = [
        {
            id: 1,
            title: "How To Train Your Dragon: The Hidden World",
            year: "2019",
            rating: "7.4",
            genre: "Animation, Adventure",
            image: "https://image.tmdb.org/t/p/w500/xvx4Yhf0DVH8G4LzNISpMfFBDy2.jpg",
            link: "movie.html"
        },
        {
            id: 2,
            title: "Avengers: Endgame",
            year: "2019",
            rating: "8.4",
            genre: "Action, Adventure",
            image: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
            link: "#"
        },
        {
            id: 3,
            title: "Joker",
            year: "2019",
            rating: "8.4",
            genre: "Crime, Drama",
            image: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
            link: "#"
        },
        {
            id: 4,
            title: "Parasite",
            year: "2019",
            rating: "8.6",
            genre: "Comedy, Drama",
            image: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
            link: "#"
        },
        {
            id: 5,
            title: "The Irishman",
            year: "2019",
            rating: "7.8",
            genre: "Biography, Crime",
            image: "https://image.tmdb.org/t/p/w500/mbm8k3GFhK0o9BoJGB0L3hYfApQ.jpg",
            link: "#"
        },
        {
            id: 6,
            title: "1917",
            year: "2019",
            rating: "8.3",
            genre: "Drama, War",
            image: "https://image.tmdb.org/t/p/w500/iZf0KyrE25z1sage4SYFLCCrMi9.jpg",
            link: "#"
        },
        {
            id: 7,
            title: "Knives Out",
            year: "2019",
            rating: "7.9",
            genre: "Comedy, Crime",
            image: "https://image.tmdb.org/t/p/w500/pThyQovXQrw2m0s9x82twj48Jq4.jpg",
            link: "#"
        },
        {
            id: 8,
            title: "Ford v Ferrari",
            year: "2019",
            rating: "8.1",
            genre: "Action, Biography",
            image: "https://image.tmdb.org/t/p/w500/dR1Ju50i8r7MN5vQ7TI6JvT1fFs.jpg",
            link: "#"
        }
    ];

    // Render movies
    const movieGrid = document.getElementById('movie-grid');
    
    function renderMovies(moviesToRender) {
        movieGrid.innerHTML = '';
        moviesToRender.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card';
            movieCard.innerHTML = `
                <a href="${movie.link}">
                    <img src="${movie.image}" alt="${movie.title}">
                    <div class="movie-info">
                        <h3>${movie.title}</h3>
                        <p>${movie.year} • ${movie.rating}/10</p>
                    </div>
                </a>
            `;
            movieGrid.appendChild(movieCard);
        });
    }
    
    renderMovies(movies);

    // Search functionality
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    
    function searchMovies() {
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm.trim() === '') {
            renderMovies(movies);
            return;
        }
        
        const filteredMovies = movies.filter(movie => 
            movie.title.toLowerCase().includes(searchTerm) || 
            movie.genre.toLowerCase().includes(searchTerm)
        );
        
        renderMovies(filteredMovies);
    }
    
    searchBtn.addEventListener('click', searchMovies);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            searchMovies();
        }
    });
});