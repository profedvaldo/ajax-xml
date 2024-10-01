// Endereço do proxy CORS (cors-anywhere)
const proxy = 'https://cors-anywhere.herokuapp.com/';
// Endereço do XML
const xmlURL = proxy + 'https://folhadecianorte.com/sitemap-news.xml';

// Função para buscar o XML e processá-lo
function buscarXML() {
    fetch(xmlURL)
    .then(response => response.text())
    .then(data => {
        // Converte o texto em DOM
        let parser = new DOMParser();
        let xml = parser.parseFromString(data, "application/xml");

        // Extrai os dados desejados (exemplo: URL das notícias)
        let noticias = xml.getElementsByTagName("url");

        // Elemento onde as manchetes serão exibidas
        let manchetesContainer = document.getElementById("manchetes");
        manchetesContainer.innerHTML = ""; // Limpa o elemento

        // Percorre as notícias e monta o HTML
        for (let i = 0; i < noticias.length; i++) {
            let loc = noticias[i].getElementsByTagName("loc")[0].textContent;
            let data_publi = noticias[i].getElementsByTagName("news:publication_date")[0].textContent;
            let titulo = noticias[i].getElementsByTagName("news:title")[0].textContent;

            // Monta o HTML para cada notícia
            let montadiv = `
                <div class='noticias'>
                    <h2>${titulo}</h2>
                    <p>Publicado em: ${data_publi}</p>
                    <a href='${loc}' target="_blank">Leia mais</a>
                </div>
                <hr/>
            `;

            // Adiciona o HTML ao contêiner
            manchetesContainer.innerHTML += montadiv;
        }
    })
    .catch(error => {
        console.error('Erro ao carregar o XML:', error);
        let manchetesContainer = document.getElementById("manchetes");
        manchetesContainer.innerHTML = "<p>Erro ao carregar as manchetes. Tente novamente mais tarde.</p>";
    });
}

// Chama a função quando a página for carregada
window.onload = buscarXML;
