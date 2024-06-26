let scale = 1;
let targetScale = 1;

function updateTransform(posterContainer, xAxis, yAxis) {
    posterContainer.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg) scale(${scale})`;
}

document.addEventListener('mousemove', function (e) {
    const posterContainer = document.querySelector('.poster-container');
    const rect = posterContainer.getBoundingClientRect();
    const xAxis = (e.clientX - rect.left - rect.width / 2) / 10;
    const yAxis = -(e.clientY - rect.top - rect.height / 2) / 10;
    posterContainer.dataset.xAxis = xAxis;
    posterContainer.dataset.yAxis = yAxis;
    updateTransform(posterContainer, xAxis, yAxis);
});

document.addEventListener('mouseleave', function () {
    const posterContainer = document.querySelector('.poster-container');
    posterContainer.dataset.xAxis = 0;
    posterContainer.dataset.yAxis = 0;
    updateTransform(posterContainer, 0, 0);
});

document.addEventListener('wheel', function (e) {
    e.preventDefault();
    targetScale += e.deltaY * -0.001;
    targetScale = Math.min(Math.max(1, targetScale), 2); // Limita o zoom entre 1x e 2x
});

function animate() {
    const posterContainer = document.querySelector('.poster-container');
    scale += (targetScale - scale) * 0.05; // Suaviza a transição do zoom
    const xAxis = parseFloat(posterContainer.dataset.xAxis) || 0;
    const yAxis = parseFloat(posterContainer.dataset.yAxis) || 0;
    updateTransform(posterContainer, xAxis, yAxis);
    requestAnimationFrame(animate);
}

animate();

// Adiciona suporte para toque em dispositivos móveis
document.addEventListener('touchmove', function (e) {
    e.preventDefault();
    const posterContainer = document.querySelector('.poster-container');
    const rect = posterContainer.getBoundingClientRect();
    const touch = e.touches[0];
    const xAxis = (touch.clientX - rect.left - rect.width / 2) / 10;
    const yAxis = -(touch.clientY - rect.top - rect.height / 2) / 10;
    posterContainer.dataset.xAxis = xAxis;
    posterContainer.dataset.yAxis = yAxis;
    updateTransform(posterContainer, xAxis, yAxis);
}, { passive: false });

document.addEventListener('touchend', function () {
    const posterContainer = document.querySelector('.poster-container');
    posterContainer.dataset.xAxis = 0;
    posterContainer.dataset.yAxis = 0;
    updateTransform(posterContainer, 0, 0);
});