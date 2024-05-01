//crear selectores
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

//crear eventos
addEventListeners();
function addEventListeners() {
    formulario.addEventListener('submit', agregarTweet);

    document.addEventListener('DOMContentLoaded', ()=>{
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        crearHTML();
    })
}

function agregarTweet(e) {
    //creando un tweet
    e.preventDefault();
    const tweet = document.querySelector('#tweet').value;
    let numeroC = tweet.length;

    //validar tweet no puede estar vacio
    if (tweet === '') {
        //const error = 'El tweet no puede estar vacio';
        mostrarerror('El tweet no puede estar vacio')
        return;
    } else
        if (numeroC >= 250) {
            mostrarerror('la cantidad maxima de caracteres es de 250')
            return;
        } else {

            //crear un objeto
            const tweetObj = {
                id: Date.now(),
                tweet: tweet
            }

            tweets = [...tweets, tweetObj];

            crearHTML();

            formulario.reset();

            sincronizarStorage();
        }      
}

//agregar los tweets en el localstorage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function crearHTML() {
    limpiarHTML();

    if (tweets.length > 0) {
        //al menos hay guardado 1 tweet en el arreglo
        //crear el html

        tweets.forEach(tweets => {
            const li = document.createElement('li');
            const btnEliminar = document.createElement('a')
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'x';

            btnEliminar.onclick = () => {
                borrarTweet(tweets.id);
            }

            li.innerText = tweets.tweet;
            li.appendChild(btnEliminar);
            listaTweets.appendChild(li)

        })
    }
}

function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

function borrarTweet(id) {

    tweets = tweets.filter(tweets => tweets.id !== id);

    crearHTML();
}

function mostrarerror(error) {
    //mostrar error en html
    const mensajeerror = document.createElement('p')
    mensajeerror.innerText = error;
    mensajeerror.classList.add('error');
    //insetar el mensaje de error
    const contenido = document.querySelector('#contenido')
    contenido.appendChild(mensajeerror)

    setTimeout( ()=>
        mensajeerror.remove(),2000
        )

}
