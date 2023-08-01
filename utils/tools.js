function throwInputErr(msg) {
  const err = new Error();
  err.name = 'invalidInput';
  err.statusCode = 400;
  err.message = msg;
  throw err;
}

function errHandler(err, _req, res, _next) {
  if (err.name === 'invalidInput') {
    res.status(err.statusCode).render('error', { errorMsg: err.message });
  } else {
    res.status(500).render('error', { errorMsg: 'Internal server error!' });
    console.error(err);
  }
}

function checkIfUrl(urlString) {
  try {
    new URL(urlString);
    return urlString;
  } catch {
    return '';
  }
}

function checkRating(rating) {
  return isNaN(rating) || Number(rating) < 0
    ? 0
    : Number(rating) > 5
      ? 5 : Number(rating);
}

function sanitizeInput(input) {
  const inputName = input?.name?.replace(/\s/g, '');
  const inputLocation = input.location.replace(/\s/g, '');

  if (!inputName || !inputName.length) throwInputErr('Invalid restaurant name');
  if (!inputLocation || !inputLocation.length) throwInputErr('Invalid restaurant location');

  return {
    name: inputName.slice(0, 100),
    name_en: input.name_en.slice(0, 100),
    category: input.category.slice(0, 100),
    image: checkIfUrl(input.image),
    location: input.location.slice(0, 200),
    phone: input.phone.length > 15 || isNaN(input.phone.replace(/[-\s]/g, ''))
      ? '' : input.phone.replace(/[-\s]+/g, ' ').slice(0, 15),
    google_map: checkIfUrl(input.google_map),
    rating: checkRating(input.rating),
    description: input.description.slice(0, 500),
  };
}

module.exports = { throwInputErr, errHandler, checkIfUrl, sanitizeInput }