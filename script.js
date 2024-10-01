// Endereço do XML
const xmlURL = 'sitemap-news.xml';

// Função para buscar o XML
function buscarXML() {
    fetch(xmlURL)
    .then(response => response.text())
    .then(data => {
        // Converter o texto em DOM
        let parser = new DOMParser();
        let xml = parser.parseFromString(data, "application/xml");
        
        // Extrair os dados desejados (exemplo URL das notícias)
        let noticias = xml.getElementsByTagName("url");
        // Elemento onde vou exibir as notícias
        let manchetesContainer = document.getElementById("manchetes");
        manchetesContainer.innerHTML = ""; // Limpa o elemento

        // Percorrer as notícias usando um for
        for (let i = 0; i < noticias.length; i++) {
            let loc = noticias[i].getElementsByTagName("loc")[0].textContent;

            // Verificação para data de publicação
            let data_publi_element = noticias[i].getElementsByTagName("news:publication_date")[0];
            let data_publi = data_publi_element ? data_publi_element.textContent : 'Data não disponível';

            // Verificação para o título
            let titulo_element = noticias[i].getElementsByTagName("news:title")[0];
            let titulo = titulo_element ? titulo_element.textContent : 'Título não disponível';

            // Usar crases para interpolação de variáveis
            let montadiv = `
                <div class='noticias'>
                    <h2>${titulo}</h2>
                    <p>Publicado em: ${data_publi}</p>
                    <a href='${loc}' target='_blank'>Leia mais</a>
                </div>
                <hr/>
            `;
            manchetesContainer.innerHTML += montadiv;
        }
    }).catch(error => {
        console.error('Erro ao carregar o XML:', error);
    });
}

// Chama a função quando a página for carregada
window.onload = buscarXML;
