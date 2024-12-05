
    let url = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

    let artisti = ['eminem', 'metallica', 'queen'];
    let numeroDischi = 4;

    for (let i=0; i<artisti.length; i++) {
        fetch(url+artisti[i])
        .then(risposta => risposta.json())
        .then(dati => {
            let copertine = document.getElementById(artisti[i]+'Section');
            console.log(copertine);
            let discografiaParziale = dati.data.slice(0, numeroDischi);
            for (let j=0; j<discografiaParziale.length; j++) {
                copertine.innerHTML += `<img class='p-3' src="${discografiaParziale[j].album.cover_medium}" data-album-id="${discografiaParziale[j].album.id}" style="cursor: pointer;">`;
                document.getElementById(artisti[i]).classList.remove('d-none')        
            }
        })
        .catch(errore => {
            console.log(errore);
        });
    }

    
