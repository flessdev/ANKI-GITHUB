const keyboard = (function() {
  let isOpen = false;

  function handleResize() {
    isOpen = window.innerHeight < 450;
  }

  // Inicializa la librería
  init = function() {
    window.addEventListener('resize', handleResize);
  }

  return {
    init,
    isOpen: () => isOpen
  };
})()

// Inicializa la librería
keyboard.init();

// Exporta la librería si es necesario
//export default keyboard;
