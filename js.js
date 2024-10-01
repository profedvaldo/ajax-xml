//endereço
const xmlURL = 'sitemap.xml';

function buscarXML(){
    fetch(xmlURL)
    .then(response => response.text())
    .then(data => {
        //converter texto em DOM
        let parser = new DOMParser();
        let xml = parser.parseFromString(data, "application/xml");
        //extrair os dados desejados
        let noticias = xml.getElementsByTagName("url");
        //elemento para  exibir as noticias
        let manchetesContainer = document.getElementById("manchetes");
        manchetesContainer.innerHTML = ""; //limpa a div

        //vamos percorrer a lista usando for
        for (let i = 0; i < noticias.length; i++){
            let loc = noticias[i].getElementsByTagName("loc")[0].textContent;

            //extrai a data de public.
            let data_publi_element = noticias[i].getElementsByTagName("publication_date")[0];
            let data_publi = data_publi_element ? data_publi_element.textContent : 'data indisp.';
            //verifica o titulo
            let titulo_element = noticias[i].getElementsByTagName("title")[0];
            let titulo = titulo_element ? titulo_element.textContent : 'titulo_indisponivel';

            //interpolação de variaveis
            let montadiv = `
            <div class = 'noticias'> 
                <h2>${titulo}</h2>
                <p>publicado em> ${data_publi}</p>
                <a href='${loc}' target='_blank'>
                leia mais</a><hr>
            `;
            manchetesContainer.innerHTML += montadiv;
        }
    }).catch(error => {
        console.error('erro ao carregar o xml', error);
    });
}
window.onload = buscarXML;
