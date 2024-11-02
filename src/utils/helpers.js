export function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function formatDate(dateStr) {
  return new Intl.DateTimeFormat("in", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateStr));
}

export function calcMinutesLeft(dateStr) {
  const d1 = new Date().getTime();
  const d2 = new Date(dateStr).getTime();
  return Math.round((d2 - d1) / 60000);
}

export function removeForbiddenWords(arr,text) {
  let result = text;
  arr.forEach((word) => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    result = result.replace(regex, "").trim(); 
  });
  return result.replace(/\s{2,}/g, " "); 
}

export function extractAllowedWords(arr,text) {
  const matches = [];
  arr.forEach((word) => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi'); // \\b untuk pencocokan kata yang persis
    if (regex.test(text)) {
      matches.push(word);
    }
  });
  return matches.join(", ");
}
