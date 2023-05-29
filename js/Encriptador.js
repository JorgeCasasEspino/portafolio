let diccionario = {"e":"enter","i":"imes","a":"ai","o":"ober","u":"ufat"};

const imagen = document.getElementById('imagen');
const resultado = document.getElementById('resultado');
const copiar = document.getElementById('copiar');
const textoControl = document.getElementById("Texto");

const cifrado = {
    validarTexto: (texto) => {
        if (texto === '') {
            alert("El texto está vacío");
            textoControl.focus();
            return false;
        }
        if(ExisteAcento(texto) || ExisteMayusculas(texto)){
            alert("El texto introducido no cumple con los requerimientos");
            textoControl.value = "";
            textoControl.focus();
            return false;
        }
        return true;
    },
    encriptar: () => {
        const texto = textoControl.value;
        if (!cifrado.validarTexto(texto)) {
            return;
        }
        let Resultado = "";
        [...texto].forEach(c =>{
            Resultado += c.match(/[aeiou]/gi) ? diccionario[c]:c;
        });
        imagen.classList.add( "ocultarImagen" );
        resultado.textContent = Resultado;
        copiar.removeAttribute('hidden');
    },
    desencriptar: () => {
        const texto = textoControl.value;
        if (!cifrado.validarTexto(texto)) {
            return;
        }
        let Resultado = "";
        for (let index = 0; index < texto.length; index++) {
            if(texto[index].match(/[aeiou]/gi)){
                const Letra = diccionario[texto[index]]
                Resultado += texto[index];
                index += Letra.length-1;
            }
            else
                Resultado += texto[index]; 
        }
        imagen.classList.add( "ocultarImagen" );
        resultado.textContent = Resultado;
        copiar.removeAttribute('hidden');
    },
    limpiar: () => {
        textoControl.value = "";
        imagen.classList.remove( "ocultarImagen" );
        resultado.textContent = "";
        copiar.setAttribute('hidden', 'true');
    }
};

function ExisteAcento(Texto){
    var normalizedText = Texto.normalize("NFD");
    var acentos = normalizedText.match(/[\u0300-\u036f]/g);
    return !(acentos === null)
}

function ExisteMayusculas(Texto){
    return !(Texto.match(/[A-Z]/g) === null);
}

function EncriptarClick(){
    cifrado.encriptar();
}

function DesencriptarClick(){
    cifrado.desencriptar();
}

copiar.addEventListener('click', ()=>{
    navigator.clipboard.writeText( resultado.textContent );
})