// scripts.js
document.addEventListener('DOMContentLoaded', function() {
  // Activar animación de olas
  const waves = document.querySelectorAll('.wave-effect');
  
  waves.forEach(wave => {
    // Crear elemento para las olas si no existe
    if (!wave.querySelector('.wave-animation')) {
      const waveAnimation = document.createElement('div');
      waveAnimation.className = 'wave-animation';
      wave.appendChild(waveAnimation);
    }
    
    // Activar animación
    wave.style.animation = 'waveAnimation 15s linear infinite';
  });
  
  // Animación de tarjetas
  const cards = document.querySelectorAll('.card, .target-card, .stat-item');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    });
  });
});