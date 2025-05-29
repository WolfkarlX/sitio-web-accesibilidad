// accessibility.js - Control de accesibilidad completo con cambio correcto de fuentes y tamaños

// Mapa de fuentes: clave => cadena CSS con fallback
const fuentesMap = {
  default: '',
  arial: 'Arial, Helvetica, sans-serif',
  verdana: 'Verdana, Geneva, Tahoma, sans-serif',
  times: '"Times New Roman", Times, serif',
  courier: '"Courier New", Courier, monospace',
  segoe: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
};

// Variable global para tamaño de fuente
let currentFontSize = 1;

// Inicializar ajustes de accesibilidad al cargar la página
document.addEventListener('DOMContentLoaded', function() {
  loadSettings();

  // Set up event listeners
  document.getElementById('accessibility-toggle').addEventListener('click', toggleAccessibilityPanel);
  document.getElementById('close-accessibility').addEventListener('click', toggleAccessibilityPanel);
});

// Mostrar u ocultar panel de accesibilidad
function toggleAccessibilityPanel() {
  const panel = document.getElementById('accessibility-controls');
  panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
}

function applyStyleExceptAccessibilityPanel(styleProp, value) {
      const main = document.getElementById("page-content");
      if (!main) return;

      const elements = main.querySelectorAll("*");
      elements.forEach(el => {
        el.style[styleProp] = value;
      });
      main.style[styleProp] = value;
    }

    function changeFontSize(direction) {
      if (direction === 'increase') {
        currentFontSize *= 1.1;
      } else if (direction === 'decrease') {
        currentFontSize *= 0.9;
      }
      if (currentFontSize < 0.5) currentFontSize = 0.5;
      if (currentFontSize > 3) currentFontSize = 3;

      applyStyleExceptAccessibilityPanel('fontSize', `${currentFontSize}rem`);
    }

// Resetear tamaño de fuente a valor por defecto
function resetFontSize() {
  const html = document.documentElement;
  currentFontSize = 1;
  html.style.fontSize = '';
  applyStyleExceptAccessibilityPanel('fontSize', ``);

}

// Cambiar la fuente usando clave del mapa fuentesMap
function changeFontFamily(fontKey) {
  const fontValue = fuentesMap[fontKey] !== undefined ? fuentesMap[fontKey] : '';
  document.body.style.fontFamily = fontValue;

  // Actualizar select para reflejar la selección (si existe)
  const select = document.querySelector('select[onchange="changeFontFamily(this.value)"]');
  if (select) select.value = fontKey;
}

// Obtener la clave de fuente actual usada en el body
function getCurrentFontKey() {
  const currentFont = document.body.style.fontFamily || '';
  for (const key in fuentesMap) {
    if (fuentesMap[key] === currentFont) return key;
  }
  return 'default';
}

// Aplicar color a todos los párrafos que coincidan con selector
function applyColorToParagraphs(selector, color) {
  const paragraphs = document.querySelectorAll(selector);
  paragraphs.forEach(p => {
    p.style.color = color;
  });
}

// Obtener color computado del primer párrafo que coincida con selector
function getColorOfFirstParagraph(selector) {
  const el = document.querySelector(selector);
  if (el) {
    return window.getComputedStyle(el).color;
  }
  return null;
}

// Alternar modo oscuro y aplicar color a párrafos
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  const color = isDark ? 'black' : ''; // O el color que quieras usar en modo oscuro o claro

  applyColorToParagraphs('.target-card p', color);
  applyColorToParagraphs('.challenge-item p', color);
}

// Alternar alto contraste
function toggleHighContrast() {
  document.body.classList.toggle('high-contrast');
}


// Alternar filtro para daltonismo
function toggleColorBlindFilter() {
  const content = document.getElementById('page-content'); // Le decimos que agarre el contenido del id "page-content"
  if (content) {
    content.classList.toggle('color-blind-filter'); // Se le aplica el atributo de CSS
  }
}

// Alternar cursor grande
function toggleCursor() {
  document.body.classList.toggle('cursor-large');
}

// Alternar ocultar imágenes
function toggleImages() {
  document.body.classList.toggle('hide-images');
}

// Alternar resaltar enlaces
function toggleLinks() {
  document.body.classList.toggle('hide-links');
}

// Resetear todas las configuraciones de accesibilidad
function resetAccessibility() {
  const content = document.getElementById('page-content'); // Le decimos que agarre el contenido del id "page-content"

  resetFontSize();
  changeFontFamily('default');
  document.body.className = ''; // eliminar todas las clases
  content.className = '';


}

// Guardar ajustes en localStorage
function saveSettings() {
  const content = document.getElementById('page-content'); // Le decimos que agarre el contenido del id "page-content"

  const settings = {
    fontSize: currentFontSize,
    fontFamilyKey: getCurrentFontKey() || 'default',
    darkMode: document.body.classList.contains('dark-mode'),
    highContrast: document.body.classList.contains('high-contrast'),
    colorBlind: content.classList.contains('color-blind-filter'),
    largeCursor: document.body.classList.contains('cursor-large'),
    hideImages: document.body.classList.contains('hide-images'),
    highlightLinks: document.body.classList.contains('hide-links'),

    // Guardar colores actuales de los párrafos
    targetCardColor: getColorOfFirstParagraph('.target-card p'),
    challengeItemColor: getColorOfFirstParagraph('.challenge-item p')
  };
  localStorage.setItem('accessibilitySettings', JSON.stringify(settings));
  alert('Configuración guardada. Se aplicará en todas las páginas.');
}

// Cargar ajustes de localStorage y aplicarlos
function loadSettings() {
  const content = document.getElementById('page-content'); // Le decimos que agarre el contenido del id "page-content"
  const savedSettings = localStorage.getItem('accessibilitySettings');
  if (savedSettings) {
    const settings = JSON.parse(savedSettings);

    if (settings.fontSize) {
      currentFontSize = settings.fontSize;
      document.documentElement.style.fontSize = `${currentFontSize}rem`;
    }

    if (settings.fontFamilyKey) {
      changeFontFamily(settings.fontFamilyKey);
    }

    if (settings.darkMode) {
      document.body.classList.add('dark-mode');
      applyColorToParagraphs('.target-card p', 'black');
      applyColorToParagraphs('.challenge-item p', 'black');
    } else {
      document.body.classList.remove('dark-mode');
    }

    if (settings.targetCardColor) {
      applyColorToParagraphs('.target-card p', settings.targetCardColor);
    }

    if (settings.challengeItemColor) {
      applyColorToParagraphs('.challenge-item p', settings.challengeItemColor);
    }

    if (settings.highContrast) document.body.classList.add('high-contrast');
    if (settings.colorBlind) content.classList.add('color-blind-filter');
    if (settings.largeCursor) document.body.classList.add('cursor-large');
    if (settings.hideImages) document.body.classList.add('hide-images');
    if (settings.highlightLinks) document.body.classList.add('hide-links');
  }
}
