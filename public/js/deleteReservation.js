const buttonId = document.querySelector("#id-input-button")
const idInput = document.querySelector("[name='id-input']")

buttonId.addEventListener("click", (e) => {
  fetch("/reservations")
    .then((response) => response.json())
    .then((data) => {
      const reservation = data.filter((res) => res._id == idInput.value)[0]

      if (!reservation) {
        alert("Couldn't find a reservation matching this ID")
        return
      }

      const id = idInput.value

      const modal = document.createElement("div")
      modal.style.position = "fixed"
      modal.style.top = "0"
      modal.style.left = "0"
      modal.style.width = "100vw"
      modal.style.height = "100vh"
      modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)"
      modal.style.display = "flex"
      modal.style.justifyContent = "center"
      modal.style.alignItems = "center"
      modal.style.zIndex = "1000"

      const modalContent = document.createElement("div")
      modalContent.style.backgroundColor = "white"
      modalContent.style.padding = "20px"
      modalContent.style.borderRadius = "10px"
      modalContent.style.maxWidth = "80%"
      modalContent.style.textAlign = "center"

      const correctReservation = document.createElement("div")
      correctReservation.innerText =
        "ARE YOU SURE YOU WANT TO \n DELETE THIS RESERVATION?"
      correctReservation.style.fontSize = "20px"
      correctReservation.style.fontWeight = "bold"

      const reservationText = document.createElement("div")
      reservationText.innerText = JSON.stringify(reservation, null, 2)
        .replace(/[{}"]/g, "")
        .replace(/:/g, "   =   ")
        .replace(/,/g, "")
      reservationText.style.fontSize = "20px"

      const confirmButton = document.createElement("button")
      confirmButton.innerText = "YES"
      confirmButton.style.width = "125px"
      confirmButton.style.height = "30px"
      confirmButton.style.fontSize = "17px"

      modalContent.appendChild(correctReservation)
      modalContent.appendChild(reservationText)
      modalContent.appendChild(document.createElement("br"))
      modalContent.appendChild(confirmButton)

      modal.appendChild(modalContent)

      document.body.appendChild(modal)

      confirmButton.addEventListener("click", () => {
        fetch(id, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        })
          .then((response) => {
            if (response.status == 204) {
              alert("Succsessfully deleted reservation")
              location.reload()
            } else throw new Error("Failed to delete reservation")
          })
          .catch((error) => alert(error))
      })

      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.style.display = "none"
        }
      })
    })
})
