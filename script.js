
let titoliPerArtista = {};

let fetchCard = (richiesta, idArtista) => {
    let artista = document.querySelector(`#${idArtista}`);
    let idSection = artista.querySelector(`#${idArtista}Section`);

    fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q="+richiesta)
    .then(risposta => risposta.json())
    .then(dati => {
        let singoli = dati.data;
        let titoliCanzoni = singoli.map(brano => brano.title); // Array di titoli delle canzoni
        titoliPerArtista[idArtista] = titoliCanzoni; // Memorizza i titoli per l'artista

        singoli.forEach(brano => {
            let card = `
                <div class="df-card-wrapper mb-5">
                    <div class="card h-100">
                        <img src="${brano.album.cover_medium}" class="w-100" alt="${brano.title}">
                        <div class="card-body bg-dark">
                            <h5 class="card-title df-testo-troncato">${brano.title}</h5>
                            <p class="card-text df-testo-troncato">${brano.album.title}</p>
                        </div>
                    </div>
                </div>
            `;
            idSection.innerHTML += card;
            artista.classList.remove('d-none');
        });

        idSection.querySelectorAll('.df-card-wrapper').forEach(card => {
            card.addEventListener('click', function() {
                let titoli = titoliPerArtista[idArtista];
                let modalList = document.getElementById('dfModalList');
                modalList.innerHTML = '';
                titoli.forEach(titolo => {
                    let listItem = document.createElement('li');
                    listItem.className = 'list-group-item';
                    listItem.textContent = titolo;
                    modalList.appendChild(listItem);
                });
                $('#dfModal').modal('show');
            });
        });
    })
    .catch(errore => {
        console.log(errore);
    });
}


fetchCard('eminem', 'eminem');
fetchCard('metallica', 'metallica');
fetchCard('queen', 'queen');    

