const form = document.querySelector("#form")

const firstNameInput = document.querySelector("[name='first-name-input']")
const surenameInput = document.querySelector("[name='surename-input']")
const startDateInput = document.querySelector("[name='start-date-input']")
const endDateInput = document.querySelector("[name='end-date-input']")

form.addEventListener("submit", async (e) => {
  e.preventDefault()

  const formData = {
    name: firstNameInput.value,
    surename: surenameInput.value,
    startDate: startDateInput.value,
    endDate: endDateInput.value,
  }

  fetch("/reservations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error("Failed to create reservation")
      }

      return response.json()
    })
    .then((data) =>
      alert(`Successfuly created reservation, your ID is : ${data.id}`)
    )
    .catch((error) => alert(error))
})
