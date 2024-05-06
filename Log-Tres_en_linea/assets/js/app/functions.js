
const icons = new Array("./assets/img/icons/eye-fill.svg", "./assets/img/icons/eye-slash-fill.svg");

export function viewText(id) {
  let objInput = document.getElementById(id);
  let typeInput = "password";
  let iconsInput = icons[1];
  if (objInput.type == "password") {
    typeInput = "text";
    iconsInput = icons[0];
  } else {
    typeInput = "password";
    iconsInput = icons[1];
  }
  objInput.type = typeInput;
  objInput.nextElementSibling.childNodes[0].src = iconsInput;
}

export function sendData(idForm) {
  let objForm = document.getElementById(idForm);
  return getDataForm(objForm);
}


export function getDataForm(objForm) {
  try {
    const elementsForm = objForm.querySelectorAll('input');
    const json = {};
    
    for (let i = 0; i < elementsForm.length; i++) {
      const elem = elementsForm[i];
      const key = elem.id;
      const value = elem.value.trim();
      
      if (value === "") {
        alert("Please fill in all fields.");
        return false;
      }
      
      if (elem.dataset.type === "password") {
        json[key] = value; // Agrega la contraseña al objeto JSON sin validar
      } else {
        json[key] = value;
      }
    }
    
    return json;
  } catch (error) {
    console.error("Error getting form data:", error);
    return null; // Devuelve null en caso de error
  }
}


export function cleanForm(objForm) {
  objForm.reset();
}

export function cleanInputPassword(objForm,ArrayInputs) {
  for(let input of ArrayInputs){
    input.type="password";
    input.nextElementSibling.childNodes[0].src = icons[1];
  }
  objForm.reset();
}

export async function fetchUserData() {
  try {
    const user = auth.currentUser;
    if (user) {
      // Realiza la lógica para obtener los datos del usuario desde Firebase
      // Aquí debes acceder a la base de datos de Firebase y obtener los datos del usuario
      // Una vez que obtengas los datos, puedes mostrarlos por consola o realizar cualquier otra acción que necesites
    } else {
      console.log('No user signed in.');
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}