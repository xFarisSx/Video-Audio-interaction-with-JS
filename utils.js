function getLocationWithColor(imgData, color) {
  const locs = [];

  for (let i = 0; i < imgData.data.length; i += 4) {
    let pColor = {
      r: imgData.data[i],
      g: imgData.data[i + 1],
      b: imgData.data[i + 2],
    };

    const pIndex = i / 4;

    const loc = {
      x: pIndex % imgData.width,
      y: Math.floor(pIndex / imgData.width),
    };

    if (colorMatch(pColor, color)) {
      locs.push(loc);
    }
  }

  return locs;
}

function colorMatch(c1, c2, threshold = 170) {
  if (sqDistance(c1, c2) < threshold**2) {
    return true;
  }
  return false;
}

function sqDistance(c1, c2) {
    return (c1.r-c2.r)**2+(c1.g-c2.g)**2+(c1.b-c2.b)**2
}

function average(locs) {
    const res = {x:0, y:0}
    locs.forEach(loc=> {
        res.x+=loc.x
        res.y+=loc.y
    })
    res.x/=locs.length
    res.y/=locs.length
    return res
}