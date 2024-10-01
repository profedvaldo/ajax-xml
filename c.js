//javascript para carregar as ultimas noticias

//endereço do xml
const xmlURL = 'https://folhadecianorte.com/sitemap-news.xml';

//função pra buscar o xml
function buscarXML(){
    fetch(xmlURL)
    .then(response => response.text)
    .then(data => {
        //aqui vamos converter o texto em DOM
        let parser = new DOMParser();
        let xml = parser.parseFromString(data, "application/xml");
        
        //agora vamos extrarir os dados desejados(exemplo URL da noticias)
        let noticias = xml.getElementsByTagName("url");
        //elemento (no html) onde vou exibir as noticias
        let manchetesContainer = document.getElementById("manchetes");
        manchetesContainer.innerHTML = "";//limpa o elemento

        //percorrer as noticias usando um for
        for (let i = 0; i < noticias.length; i++){
            let loc = noticias[i].getElementsByTagName("loc")[0].textContent;
            let data_publi = 
            noticias[i].getElementsByTagName("news:publication_date")[0].textContent;
            let titulo = noticias[i].getElementsByTagName("news:title")[0].textContent;
            let manchetesHTMLclass = "<div class='noticias'>";
            let manchetesHTMLclassend = "</div><hr/>";
            let h21 = "<h2>";
            let h21end = "</h2>";
            let link1 = "<a href='";
            let linkend = "'>leia mais</a>";
            let montadiv = manchetesHTMLclass+
                            h21+
                            ${titulo}+
                            h21end+
                            link1+
                            ${loc}+
                            linkend+
                            manchetesHTMLclassend;
            manchetesContainer.innerHTML +=montadiv;
        }
    }).catch(error => {console.error('erro ao carregar o xml', error);});
        
}
window.onload = buscarXML;//atualiza ao carregar a pagina