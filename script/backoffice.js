class Product {
  constructor(_name, _description, _brand, _imgUrl, _price) {
    this.name = _name
    this.description = _description
    this.brand = _brand
    this.imageUrl = _imgUrl
    this.price = _price

  }
}


const nameInput = document.getElementById('name')
const descriptionInput = document.getElementById('description')
const brandInput = document.getElementById('brand')
const imgInput = document.getElementById('img')
const priceInput = document.getElementById('price')


const id = new URLSearchParams(location.search).get('id')

if (id) {
  const URL = "https://striveschool-api.herokuapp.com/api/product/" + id
  fetch(URL, {
    headers: {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNTUzNGYyNjBjYzAwMTVjYzBkZDIiLCJpYXQiOjE3MjE5ODAyMTIsImV4cCI6MTcyMzE4OTgxMn0.mp6w0WMuZsehfSzj6a8XRuvz4GeNx-vx2YG7LyR88ho",
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.ok) {

        return response.json()
      } else {
        throw new Error('errore nel recupero del singolo prodotto')
      }
    })
    .then((product) => {
      nameInput.value = product.name
      descriptionInput.value = product.description
      brandInput.value = product.brand
      imgInput.value = product.imageUrl
      priceInput.value = product.price
    })
    .catch((err) => {
      console.log(err)
    })
}



const eventForm = document.getElementById('event-form')
eventForm.addEventListener('submit', function (e) {
  e.preventDefault()

  const nameValue = nameInput.value
  const descriptionValue = descriptionInput.value
  const brandValue = brandInput.value
  const imgValue = imgInput.value
  const priceValue = priceInput.value


  const newProduct = new Product(
    nameValue,
    descriptionValue,
    brandValue,
    imgValue,
    priceValue

  )
 let URL = 'https://striveschool-api.herokuapp.com/api/product/'
  let methodToUse = "POST"
    if (id) {
     
      methodToUse = 'PUT'
      URL = URL +id
    } 
 


  fetch(URL, {

    method: methodToUse,

    body: JSON.stringify(newProduct),
    headers: {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNTUzNGYyNjBjYzAwMTVjYzBkZDIiLCJpYXQiOjE3MjE5ODAyMTIsImV4cCI6MTcyMzE4OTgxMn0.mp6w0WMuZsehfSzj6a8XRuvz4GeNx-vx2YG7LyR88ho",
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.ok) {

        alert('PRODOTTO SALVATO!')
      } else {

        alert('ERRORE NEL SALVATAGGIO!')
        throw new Error('Errore nel salvataggio del prodotto')
      }
    })
    .catch((err) => {
      console.log('ERRORE', err)
    })
})

function reset (){
  nameInput.value = ""
  descriptionInput.value = ""
  brandInput.value = ""
  imgInput.value = ""
  priceInput.value = ""
}