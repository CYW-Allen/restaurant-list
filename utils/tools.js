function sanitizeUrl(urlString) {
  try {
    new URL(urlString);
    return urlString;
  } catch {
    return '';
  }
}

function sanitizePhone(phone) {
  const phoneNum = phone.replace(/[-\s]/g, '');
  return phoneNum.length > 10 || phoneNum.length < 9 || isNaN(phoneNum)
    ? '' : phoneNum;
}

function sanitizeRating(rating) {
  return isNaN(rating) || Number(rating) < 0
    ? 0
    : Number(rating) > 5
      ? 5 : Number(rating);
}

function sanitizeInput(input) {
  return {
    name: input.name.slice(0, 100),
    name_en: input.name_en.slice(0, 100),
    category: input.category.slice(0, 100),
    image: sanitizeUrl(input.image),
    location: input.location.slice(0, 200),
    phone: sanitizePhone(input.phone),
    google_map: sanitizeUrl(input.google_map),
    rating: sanitizeRating(input.rating),
    description: input.description.slice(0, 500),
  };
}

function getDataWithoutId(oriData) {
  return Object.entries(oriData).reduce((result, [key, val]) => {
    if (key !== 'id') result[key] = val;
    return result;
  }, {});
}

module.exports = { sanitizeInput, getDataWithoutId }