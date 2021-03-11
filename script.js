const form = document.getElementById('form');
const results = document.getElementById('results');
const search = document.getElementById('search');

const apiURL = 'https://api.lyrics.ovh';

// Getting data from the server
async function searchSongs(songOrArtist) {
    const res = await fetch(`${apiURL}/suggest/${songOrArtist}`);
    const data = await res.json();

    showData(data);
}

// The function shows data in the browser
function showData(data) {
    let output = '';

    data.data.forEach(song => {
        output +=
        `
        <li>${song.artist.name} - ${song.title}
        <button class="get-lyrics-btn" artist-data="${song.artist.name}" song-data="${song.title}">Get Lyrics</button></li>
        `
    });

    results.innerHTML = 
    `
        <ul class="songs-and-artists-list">${output}</ul>
    `;
}

// Getting lyrics from the server and showing them
async function getLyrics(artist, song) {
    const res = await fetch(`${apiURL}/v1/${artist}/${song}`);
    const data = await res.json();

    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

    results.innerHTML = `
        <h5><strong>${artist} - ${song}</strong></h5> <p>${lyrics}</p>
    `;
}

// Event listeners
form.addEventListener('submit', e => {
    e.preventDefault();

    const songOrArtist = search.value.trim();
    if(songOrArtist === '')
        alert('Type something ...');
    else
        searchSongs(songOrArtist);
})

results.addEventListener('click', e => {
    const hit = e.target;
    
    if(hit.tagName === 'BUTTON'){
        const artist = hit.getAttribute('artist-data');
        const song = hit.getAttribute('song-data');

        getLyrics(artist, song);
    }
})