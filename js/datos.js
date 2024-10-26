// Datos por defecto
const defaultData = {
    name: "Nombre Ejemplo",
    address: "Dirección Ejemplo",
    location: "Localidad Ejemplo",
    phoneNumber: "1234567890"
};

// Cargar datos de localStorage o usar los datos por defecto
function loadData() {
    const savedData = JSON.parse(localStorage.getItem('userData')) || defaultData;
    document.getElementById('newname').value = savedData.name;
    document.getElementById('address').value = savedData.address;
    document.getElementById('Location').value = savedData.location;
    document.getElementById('Phonenumber').value = savedData.phoneNumber;
    // document.getElementById('title').textContent = savedData.name;

    
    
}

// Guardar datos en localStorage
function saveData() {
    const updatedData = {
        name: document.getElementById('newname').value,
        address: document.getElementById('address').value,
        location: document.getElementById('Location').value,
        phoneNumber: document.getElementById('Phonenumber').value
    };

    
    
    localStorage.setItem('userData', JSON.stringify(updatedData));
    alert("Datos actualizados correctamente.");
}

// Asignar función al botón de actualizar
document.querySelector("button").addEventListener("click", saveData);

// Cargar los datos al iniciar la página
// window.onload = loadData;
window.onload = function () {
    loadData();
}
