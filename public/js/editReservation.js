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
      modalContent.style.width = "250px"
      modalContent.style.height = "250px"
      modalContent.style.textAlign = "center"

      const correctReservation = document.createElement("div")
      correctReservation.innerText = "Edit reservation"
      correctReservation.style.fontSize = "20px"
      correctReservation.style.fontWeight = "bold"
      correctReservation.style.marginBottom = "15px"

      const nameInput = document.createElement("input")
      nameInput.value = reservation.name
      nameInput.classList.add("edit")

      const surenameInput = document.createElement("input")
      surenameInput.value = reservation.surename
      surenameInput.classList.add("edit")

      const startDateInput = document.createElement("input")
      startDateInput.type = "date"
      startDateInput.classList.add("edit")

      const endDateInput = document.createElement("input")
      endDateInput.type = "date"
      endDateInput.classList.add("edit")

      const confirmButton = document.createElement("button")
      confirmButton.innerText = "YES"
      confirmButton.style.width = "125px"
      confirmButton.style.height = "30px"
      confirmButton.style.fontSize = "17px"

      modalContent.appendChild(correctReservation)
      modalContent.appendChild(nameInput)
      modalContent.appendChild(surenameInput)
      modalContent.appendChild(startDateInput)
      modalContent.appendChild(endDateInput)
      modalContent.appendChild(confirmButton)

      modal.appendChild(modalContent)

      document.body.appendChild(modal)

      confirmButton.addEventListener("click", () => {
        if (isDate(startDateInput.value) && isDate(endDateInput.value)) {
          const data = {
            name: nameInput.value,
            surename: surenameInput.value,
            startDate: startDateInput.value,
            endDate: endDateInput.value,
          }

          fetch(id, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
            .then((response) => {
              if (response.status == 204) {
                alert("Successfully edited reservation")
                location.reload()
              } else throw new Error("Failed to edit reservation")
            })
            .catch((error) => console.error(error))
        } else {
          alert("Please input valid dates!")
        }
      })

      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.style.display = "none"
        }
      })
    })
})

function isDate(date) {
  const isDate = !Number.isNaN(Date.parse(date))
  return isDate
}
