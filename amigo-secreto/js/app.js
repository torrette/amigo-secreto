const pluralize = (val, word, plural = word + 's') => {
    const _pluralize = (num, word, plural = word + 's') =>
      [1, -1].includes(Number(num)) ? word : plural;
    if (typeof val === 'object') return (num, word) => _pluralize(num, word, val[word]);
    return _pluralize(val, word, plural);
  };
 
  const PLURALS = {
    amigo: 'amigos',
  };

let arrayAmigos = [];

function adicionar(){
    let amigo = document.getElementById('nome-amigo');
    amigo.value = amigo.value.toUpperCase();

    if(amigo.value == ''){
        alert('Informe o nome do amigo');
        return;
    } 

    if(arrayAmigos.includes(amigo.value)){
        alert(`${amigo.value} já adicionado!`);
        return;
    }
    
    let listaAmigos = document.getElementById('lista-amigos');
    arrayAmigos.push(amigo.value);

    if(listaAmigos.textContent == ''){
        listaAmigos.textContent = amigo.value;
    } else {
        listaAmigos.textContent = listaAmigos.textContent + amigo.value; 
    }
    amigo.value = '';
    
    atualizarLista();
    atualizarSorteio();
}

function sortear(){
    if(arrayAmigos.length < 4){
        alert(`Adicione pelo menos mais ${4 - arrayAmigos.length}` + pluralize(4 - arrayAmigos.length, ' amigo') + '!');
        return;
    }
    
    embaralhar(arrayAmigos);
    let listaSorteio = document.getElementById('lista-sorteio');
    
    for(let i = 0; i < arrayAmigos.length; i++){
        if(i == arrayAmigos.length - 1){
            listaSorteio.innerHTML = listaSorteio.innerHTML + arrayAmigos[i] + ' --> '+ arrayAmigos[0] + '<br>';
        } else {
            listaSorteio.innerHTML = listaSorteio.innerHTML + arrayAmigos[i] + ' --> '+ arrayAmigos[i + 1] + '<br>';
        }
    }   
}

function embaralhar(listaAmigos){
    for (let indice = listaAmigos.length; indice; indice--) {

        const indiceAleatorio = Math.floor(Math.random() * indice);

        [listaAmigos[indice - 1], listaAmigos[indiceAleatorio]] = 
        [listaAmigos[indiceAleatorio], listaAmigos[indice - 1]];
    }
}

function excluirAmigo(index) {
    arrayAmigos.splice(index, 1);
    atualizarLista();
    atualizarSorteio();
}

function atualizarSorteio() {
    let listaSorteio = document.getElementById('lista-sorteio');
    listaSorteio.innerHTML = '';
}

function atualizarLista() {
    let lista = document.getElementById('lista-amigos');
    lista.innerHTML = '';


    for (let i = 0; i < arrayAmigos.length; i++) {
        // Cria um elemento de parágrafo para cada amigo
        let paragrafo = document.createElement('p');
        paragrafo.textContent = arrayAmigos[i];
       
        // Adiciona um evento de clique para excluir o amigo
        paragrafo.addEventListener('click', function() {
            excluirAmigo(i);
        });


        // Adiciona o parágrafo à lista
        lista.appendChild(paragrafo);
    }
}

function reiniciar(){
    document.getElementById('nome-amigo').value = '';
    arrayAmigos = [];
    document.getElementById('lista-amigos').innerHTML = '';
    document.getElementById('lista-sorteio').innerHTML = '';
}



