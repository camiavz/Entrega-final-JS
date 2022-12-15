fetch("./vuelos.json")
.then(respuesta => respuesta.json())
.then(vuelos => {

    let misreservas = []


    let input = document.getElementById("input")
    input.addEventListener("input", fnInput)
    
    function fnInput(event) {
      console.log(event)
      let vuelosFiltrados = vuelos.filter(vuelo => vuelo.pais.toLowerCase().includes(input.value.toLowerCase()))
      renderizarVuelos(vuelosFiltrados)
    }
    
    let btnComprar = document.getElementById("misReservas")
    btnComprar.onclick = () => {
        let salida = ""
        for (const reserva of misreservas) {
            salida = salida + `\n 
            ${reserva.pais}\n 
            ${reserva.fecha}\n  
            $${reserva.precio}\n
            `
    
        }
        swal.fire({text: "Tu Reserva: " + salida})
    
    }
    
    let fly = document.getElementById("fly")
    
    
    renderizarVuelos(vuelos)
    
    
    
    function renderizarVuelos(vuelos) {
      fly.innerHTML = ''
      for (const vuelo of vuelos) {
        let tarjetaVuelos = document.createElement("div")
    
        if (vuelo.disponibilidad == false) {
          tarjetaVuelos.className = "greyCard"
        } else {
          tarjetaVuelos.className = "card"
        }
    
        tarjetaVuelos.innerHTML = `
          <img src=${vuelo.img} class="img" />
          <div class="informacion">
          <h4> Tu siguiente destino: </h4>
          <h3 class="pais">${vuelo.pais}</h3>
          <h4 class="precio">$${vuelo.precio}</h3>
          <h5 class="precio">${vuelo.fecha}</h5>
          </div>
          
          <button class="botonReserva button" id=${vuelo.id}>Reservar</button>
        `
    
        fly.append(tarjetaVuelos)
      }
      let botonesReserva = document.getElementsByClassName("botonReserva")
      for (const botonReserva of botonesReserva) {
        botonReserva.addEventListener("click", reserva)
      }
    
    }
    
    function reserva(e){
        
        let destinosDisponibles = vuelos.find(el => el.id == e.target.id)
        localStorage.getItem("lista") ? misreservas = JSON.parse(localStorage.getItem("lista")) : misreservas = []
    
        if (destinosDisponibles.disponibilidad){
    
            let buscar = misreservas.some(el => el.id === e.target.id)
    
            if(!buscar){
                let destino = vuelos.find(el =>el.id == e.target.id)
            misreservas.push(destino)
            localStorage.setItem("lista", JSON.stringify(misreservas))
            console.log(misreservas)
    
            swal.fire({
              text: "Reservaste el vuelo a " + destino.pais,
              imageUrl: destino.img
            })
            }
            else{
                swal.fire({text: "Estás seleccionando un vuelo ya reservado."})
    
            }
        }
        else{
            swal.fire({text: "No hay vuelos disponibles."})
        }
    }
    
})





