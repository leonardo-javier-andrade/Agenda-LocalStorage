// construir las variables

const $nameInput = document.querySelector("#name")
const $emailInput = document.getElementById("email")
const $contactId = document.getElementById("ID")
const $form = document.querySelector("form")
const $btnCancel = document.querySelector("#btn-cancel")
const $contaactlist = document.querySelector("tbody")
const $btnClear = document.querySelector("#Clearcontact")
const $divwelcome = document.querySelector("#bienvenida")
const $btnStart = document.querySelector("#start")


let contacts

let contactsToLocalStorage = JSON.parse(localStorage.getItem("contacts"))

if (contactsToLocalStorage !== null) {
    contacts = contactsToLocalStorage
} else {
    contacts = []
}


const showwelcome = () => {
    valid = contacts.length === 0 
    $divwelcome.style.display = valid? "flex" : "none"


}


console.log(contacts, "<- la lista de contactos")
//Creacion de la Funcion (Donde aprende a hacer lo que uno quiere)
const rendercontacts = () => {

    $contaactlist.innerHTML = ``


    for (let i = 0; i < contacts.length; i++) {
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
    $contactId.value = ""
    localStorage.setItem("contacts", JSON.stringify(contacts))
            $form.reset()

}



const sendForm = (event) => {


    event.preventDefault()
    console.log(event)
    console.log("Agregando El valor del nombre es: ", $nameInput.value)
    console.log("El valor del email es: ", $emailInput.value)

    const name = $nameInput.value
    const mail = $emailInput.value


    const dataContac = {
        name: name,
        email: mail
    }
    if (name === "" || mail === "") {
        alert("✋Debes completar los campos⛔")
        return
    }

    const foundContact = contacts.find(contacts => contacts.email === mail)

    if (foundContact) {
          alert("✋El email se encuentra regsitrado, intenta con otro⛔")
        return
    }


    if ($contactId.value === "") {

        // adherir a la lista los nuevos contactos 
        // meter el objeto en la lista de contactos

        contacts.push(dataContac)


        // limpiar el formulario
        $form.reset()

        //Renderizar los contactos (mostrarlos en la pag)
        rendercontacts()
    } else {
        contacts[$contactId.value] = dataContac
        rendercontacts()

    }

}



const deletecontact = (index) => {
    const validDel = confirm("¿Estas seguro que quieres borrar el contacto?")
    if (validDel) {
        console.log(index, "Borrando un contacto accion")
        contacts.splice(index, 1)
        console.log(contacts)
        rendercontacts()
    }
}

const updatecontact = (index) => {
    $nameInput.value = contacts[index].name
    $emailInput.value = contacts[index].email
    $contactId.value = index
}

const cancelform = () => {
    $form.reset()
}

const clearAll = () => {
   const confirmclear=  confirm("Estas seguro de querer borrar todos los contactos?")
   if (confirmclear) {
    localStorage.removeItem("contacts")
    contacts = []
    rendercontacts()
   }
}

const startContact = () => {
    $divwelcome.style.display = "none"
    console.log("deberia ocultarse la pagina de inicio")
}



$btnCancel.addEventListener("click", cancelform)
// Al formulario dejarlo en escucha hasta que suceda un evento
// en este caso el evento es enviar, y cuando suceda se ejecute una funcion
//Invocacion de un evento y de la funcion
$form.addEventListener("submit", sendForm)

$btnClear.addEventListener("click",clearAll)

$btnStart.addEventListener("click", startContact)
showwelcome()
rendercontacts()
