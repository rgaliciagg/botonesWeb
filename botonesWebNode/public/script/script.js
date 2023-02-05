let socket = io();

function boton(num) {
    document.getElementById("texto").textContent = `Dato Enviado: ${num}`;
    socket.emit("dato", num);
}