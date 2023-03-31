document.addEventListener('DOMContentLoaded', () => {
  fetchPups()
})

let fetchPups = () => {
  fetch('http://localhost:3000/pups')
    .then((resp) => resp.json())
    .then((pups) => renderPupsDetails(pups))
}

let renderPupsDetails = (pups) => {
  pups.forEach((pup) => {
    createPupsDetailsElement(pup)
  })
}

let createPupsDetailsElement = (pup) => {
  let pupName = document.createElement('span')
  pupName.textContent = pup.name
  document.querySelector('#dog-bar').appendChild(pupName)
  pupName.addEventListener('click', viewPupInfo)
}

let viewPupInfo = (e) => {
  selectedPup = e.target.textContent
  fetch('http://localhost:3000/pups')
    .then((resp) => resp.json())
    .then((pups) => {
      createPupInfoElement(pups, selectedPup)
    })
}

let createPupInfoElement = (pups, selectedPup) => {
  filteredPup = pups.find((pup) => pup.name === selectedPup)
  let goodDogStatus
  filteredPup.isGoodDog === true
    ? (goodDogStatus = `<button>Good Dog!</button>`)
    : (goodDogStatus = `<button>Bad Dog!</button>`)
  document.querySelector('#dog-info').innerHTML = ''
  const dogInfo = document.createElement('div')
  document.querySelector('#dog-info').appendChild(dogInfo)
  dogInfo.innerHTML =
    `<img src="${filteredPup.image}" />` +
    `<h2>${filteredPup.name}</h2>` +
    goodDogStatus
}