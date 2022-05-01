function addStr(str, index, stringToAdd) {
  return (
    str.substring(0, index) + stringToAdd + str.substring(index, str.length)
  );
}

export const getPoly = (_poly, _num, getDegree) => {
  try {
    let poly = String(_poly);

    for (let i = 0; i < poly.length; i++) {
      poly = poly.replace(" ", "");
    }

    let deg_index = poly.search("x");
    let degree = 0;

    if (poly.at(deg_index + 1) === "^") {
      degree = Number(poly.at(deg_index + 2));
    } else {
      degree = 0;
    }

    let num = _num;

    for (let i = 0; i < poly.length; i++) {
      if (
        poly.at(i) == "x" &&
        (poly.at(i - 1) == "+" || poly.at(i - 1) == "-")
      ) {
        poly = addStr(poly, i, "1");
      }
    }

    for (let i = 0; i < poly.length; i++) {
      if (i === 0) {
        if (poly.search("x") == 0)
          poly = poly.replace("x", "(" + num.toString() + ")");
      } else {
        poly = poly.replace("x", "*(" + num.toString() + ")");
      }
    }

    for (let i = 0; i < poly.length; i++) {
      poly = poly.replace("^", "**");
    }

    if (getDegree === true) {
      return [degree, poly];
    } else {
      return poly;
    }
  } catch {
    return Error("enter proper polynomial");
  }
};

export const getZeros = (_poly) => {
  let zeros = [];

  for (let i = -50; i < 50; i++) {
    let poly = getPoly(_poly, i, false);
    if (eval(poly) === 0) {
      zeros.push(i);
    }
  }

  console.log(zeros);

  return zeros;
};
