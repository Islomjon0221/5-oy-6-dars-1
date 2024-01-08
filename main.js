// import { validate, createUser } from "./function.js";
let imgInput = document.getElementById("img");
let nameInput = document.getElementById("name");
let desc = document.getElementById("textArea");
let button = document.getElementById("button");
let body = document.getElementById("cardBody")

function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}


function validate() {
  if(!imgInput.value || !validURL(imgInput.value)) {
    focus(imgInput);
    imgInput.style.outline = "auto"
    imgInput.style.outlineColor = "red"
    return false
  } else  {
    imgInput.style.outlineColor = "gray"
    imgInput.style.outline = "none"
  }

  if(!nameInput.value) {
    focus(nameInput);
    nameInput.style.outline = "auto"
    nameInput.style.outlineColor = "red"
    return false
  } else {
    nameInput.style.outlineColor = "gray"
    
    nameInput.style.outline = "none"
  }

  if(!desc.value) {
    focus(desc);
    desc.style.outline = "auto"
    desc.style.outlineColor = "red"
    return false
  } else {
    desc.style.outlineColor = "gray"
    desc.style.outline = "none"
  }


  return true
}


export{createUser, validate}

button & button.addEventListener('click', function(){
  if(validate()) {
    const user = {
      img: imgInput.value,
      name: nameInput.value,
      desc: desc.value
    };
    
    let data = [];
    if(localStorage.getItem('users')) {
      data = JSON.parse(localStorage.getItem('users'));
    }
    
    data.push(user);
    localStorage.setItem('users', JSON.stringify(data));
    let userItem = createUser(user);
    body.innerHTML += userItem;
    imgInput.value = '';
    nameInput.value = '';
    desc.value = '';
  } else {
    console.log('Validatsiya o`tmadi')
  }
}
)

function createUser() {
  return `<div class="card">
  <div class="card-img">
  <img src="${imgInput.value}" width="297" height="300" alt="dog">
  </div>
  <div class="description">
      <h3>
          ${nameInput.value}
      </h3>

      <p>
          ${desc.value}
      </p>
  </div>

</div>`
}