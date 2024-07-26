const addressBarParameters = new URLSearchParams(location.search)
const id = addressBarParameters.get('id')
const eventsRow = document.getElementById('events-row')
const errormodal = new bootstrap.Modal(document.getElementById("staticBackdrop3"))
function creaCard() {
    const URL = "https://striveschool-api.herokuapp.com/api/product/"+id
    fetch(URL, {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNTUzNGYyNjBjYzAwMTVjYzBkZDIiLCJpYXQiOjE3MjE5ODAyMTIsImV4cCI6MTcyMzE4OTgxMn0.mp6w0WMuZsehfSzj6a8XRuvz4GeNx-vx2YG7LyR88ho",
            'Content-Type': 'application/json',
        },
    })
        .then((response) => {
            console.log(response)
            if (response.ok) {

                return response.json()
            } else {

                throw new Error('Errore nella chiamata, response non OK')
            }
        })
        .then((product) => {
            console.log('EVENTI A DB', product)


            

                const newEventCol = `
                <div class="col mb-5 col-12 col-md-8 text-center">
                        <div class="card h-100">
                            <!-- Product image-->
                            <img class="card-img-top p-2" src="${product.imageUrl}" alt="..." />
                            <!-- Product details-->
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <!-- Product name-->
                                    <h5 class="fw-bolder">${product.name}</h5>
                                    <h6> ${product.description}</h6>
                                    <h6> ${product.brand}</h6>
                                    <!-- Product price-->
                                    $${product.price}
                                </div>
                            </div>
                            <!-- Product actions-->
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="backoffice.html?id=${product._id}">Edit</a></div>
                            </div>
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><button class="btn btn-outline-dark mt-auto" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Delete</button></div>
                            </div>
                        </div>
                    </div>
                  
                `


                const eventsRow = document.getElementById('events-row')
                eventsRow.innerHTML = eventsRow.innerHTML + newEventCol

            })
        
        .catch((error) => {

            console.log('ERRORE!', error)
        })

}

creaCard()


const deleteEvent = function () {
    const URL = "https://striveschool-api.herokuapp.com/api/product/"+id
    fetch(URL, {
      method: 'DELETE',
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNTUzNGYyNjBjYzAwMTVjYzBkZDIiLCJpYXQiOjE3MjE5ODAyMTIsImV4cCI6MTcyMzE4OTgxMn0.mp6w0WMuZsehfSzj6a8XRuvz4GeNx-vx2YG7LyR88ho",
        'Content-Type': 'application/json',
    },
    }) 
      .then((response) => {
        if (response.ok) {
        errormodal.show()
           
        } else {
          
          throw new Error("Problema nell'eliminazione")
        }
      })
      .catch((err) => {
        console.log('error', err)
      })
  }

function goHome ( ) {
    location.assign('./index.html')
}