function randomString(min, max) {
  const length=Math.floor(Math.random()*(max-min)) + min;
  const chars = "abcdefghijklmnopqrstuvwxyz";
  let str = "";

  for (let i = 0; i < length; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }

  return str;
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min, max, decimals = 2) {
  const num = Math.random() * (max - min) + min;
  return Number(num.toFixed(decimals));
}

function randomImageUrl() {
    const width = randomInteger(200, 500);
    const height = randomInteger(200, 500);
    return `https://picsum.photos/${width}/${height}`;
}

function randomFileUrl() {
    const files = [
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        "https://file-examples.com/wp-content/uploads/2017/02/file-sample_100kB.docx",
        "https://file-examples.com/wp-content/uploads/2017/02/file_example_CSV_5000.csv"
    ];
    return files[Math.floor(Math.random() * files.length)];
}

module.exports = {
    randomInteger,
    randomFloat,
    randomImageUrl,
    randomFileUrl, 
    randomString,
}; 
