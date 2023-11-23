function replaceByUnderScores(completo, incompleto) {
  const com = Array.from(completo);
  const inc = Array.from(incompleto.replace(/\s+/g, ""))
  let iterations = 0;
  let c = 0;
  let i = 0;
  let cx = 1;
  let ix = 1;
  let result = "";
  while (c < com.length && iterations < 5000) {
    iterations++
    if (com[c] == " ") {
      result += " "
      c++
      cx = c + 1
    } else if (com[c] == "\n") {
      result += "\n"
      c++
      cx = c + 1
    }
    //console.log(x, result[i])
    else if (com[c] == inc[i]) {
      result += com[c];
      c++;
      i++;
      cx = c + 1; // Reinicia x
      ix = i;
    } else {
      //Si ya no hay más carácteres (osea nada coincidió)
      if (cx >= com.length || ix >= inc.length) {
        result += "_"
          cx = c + 1
          ++c
        ix = ++i
      }

      //si el limite fue activado porque se encontró coincidencia
      //Abajo => Arriba
      else if (inc[i] == com[cx]) {
        result += "_"
        c++
        ix = ++i
      }
      //Si encuentra dos carácteres similares
      //Arriba => Abajo
      else if (com[c] == inc[ix]) {
        result += com[c]
        cx = ++c
        ix = ++i

      } else {
        ix++;
        cx++
      }
    }
  }
  console.log(iterations)
  return result

}