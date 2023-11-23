const keyboard = (function() {
  let _isOpen = false;
  
  function handleResize() {
    _isOpen = window.innerHeight < 450;
  }

  // Inicializa la librería
  init = function() {
    window.addEventListener('resize', handleResize);
  }

  return {
    get isOpen(){
      return _isOpen
    },
    init,
    //isOpen: () => isOpen
  };
})()

// Inicializa la librería
keyboard.init();

// Exporta la librería si es necesario
//export default keyboard;
