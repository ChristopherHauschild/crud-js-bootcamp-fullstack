window.addEventListener('load', start)

var globalNames = []
var inputName = null
var isEditing = false
var currentIndex = null

function start() {
  inputName = document.querySelector('#inputName')

  preventFormSubmit()
  startInput()
  
  render()
}

function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault()
  }

  var form = document.querySelector('form')
  form.addEventListener('submit', handleFormSubmit)
}

function startInput() {
  function insertName(newName) {
    globalNames.push(newName)
  }

  function updateName(newName) {
    globalNames[currentIndex] = newName
  }

  function handleTyping(event) {

    var hasText = !!event.target.value && event.target.value.trim() !== ''

    if(!hasText) {
      clearInput()
      return
    }

    if (event.key === 'Enter') {
      if (isEditing) {
        updateName(event.target.value)
      } else {
        insertName(event.target.value)

        var h2 = document.querySelector('h2')
        h2.textContent = 'Nomes Cadastrados:'
      }

      render()

      isEditing = false
      clearInput()
    }
  }

  inputName.focus()
  inputName.addEventListener('keyup', handleTyping)
}

function render() {
  
  function createDeleteButton(index) {
    function deleteName() {
      console.log(index)
      globalNames.splice(index, 1)
      render()
    }

    var button = document.createElement('button')
    button.classList.add('deleteButton')
    button.textContent = 'x'

    button.addEventListener('click', deleteName)

    return button
  }

  function createSpan(name, index) {
    function editItem() {
      inputName.value = name
      inputName.focus()

      isEditing = true
      currentIndex = index
    }

    var span = document.createElement('span')
    span.classList.add('clickable')
    span.textContent = name
    
    span.addEventListener('click', editItem)
    
    return span
  }

  var divNames = document.querySelector('#names')
  divNames.innerHTML = ''
  
  var ul = document.createElement('ul')

  for(var i = 0; i < globalNames.length; i++) {
    var currentName = globalNames[i]

    var li = document.createElement('li')
    var button = createDeleteButton(i)
    var span = createSpan(currentName, i)
    
    li.appendChild(button)
    li.appendChild(span)

    ul.appendChild(li)
  }

  divNames.appendChild(ul)
  clearInput()
}

function clearInput() {
  inputName.value = ''
  inputName.focus()
}