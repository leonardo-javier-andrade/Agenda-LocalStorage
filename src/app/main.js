// construir las variables

const $nameInput = document.querySelector("#name")
const $emailInput = document.getElementById("email")
const $form = document.querySelector("form")
const $contaactlist = document.querySelector("tbody")


let contacts 

let contactsToLocalStorage = JSON.parse(localStorage.getItem("contacts"))

if (contactsToLocalStorage !== null) {
    contacts = contactsToLocalStorage
} else {
    contacts = []
}



console.log(contacts, "<- la lista de contactos")
//Creacion de la Funcion (Donde aprende a hacer lo que uno quiere)
const rendercontacts = () => {

    $contaactlist.innerHTML = ``


    for (let i = 0; i < contacts.length ; i++) {
     // creamos una constante Row, la cual crea una fila de tabla
     const row = document.createElement("tr")
     // agregar contenido html
     row.innerHTML = ` 
        <td> ${contacts[i].name}</td>
        <td>${contacts[i].email}</td>
        <td>
            <button class = "btn-update" onclick = "updatecontact(${i})"> Actualizar </button>
            <button class = "btn-delete" onclick="deletecontact(${i})" > Borrar </button>
        </td>`
     // agregar la fila a la pag
     $contaactlist.appendChild(row)
    }
}



const sendForm = (event) => {
    event.preventDefault()
    console.log(event)
    console.log("Agregando El valor del nombre es: ", $nameInput.value)
    console.log ("El valor del email es: ", $emailInput.value)


    //construir un objeto vinculado con una propiedad y valor
    const newContact = {
        name: $nameInput.value, 
        email: $emailInput.value
    }

    // mostrar el ojeto del contacto ( con las clave y valores)
    console.log (newContact)

    // adherir a la lista los nuevos contactos 
    // meter el objeto en la lista de contactos

    contacts.push(newContact)

    // Construir datos para navegador de internet para almacenar en localStorage
    const contactsToJson = JSON.stringify(contacts)
    // Navegador guarda la listade contactos atualizada

    localStorage.setItem("contacts", contactsToJson)

    //mostramos la lista actualizada

    console.log(contacts)

    // limpiar el formulario
    $form.reset()

    //Renderizar los contactos (mostrarlos en la pag)
    rendercontacts()


}

const deletecontact = (index) => {
    console.log (index, "Borrando un contacto accion")
    contacts.splice(index,1)
    console.log(contacts)
    localStorage.setItem("contacs",JSON.stringify(contacts))
    rendercontacts()

}

const updatecontact = (index) => {
    $nameInput.value = contacts[index].name
    $emailInput.value = contacts[index].email
   
}

// Al formulario dejarlo en escucha hasta que suceda un evento
// en este caso el evento es enviar, y cuando suceda se ejecute una funcion
//Invocacion de un evento y de la funcion
$form.addEventListener("submit", sendForm )
    rendercontacts()
