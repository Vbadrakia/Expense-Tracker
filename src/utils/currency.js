export function getCurrencySymbol(code) {
  switch (code) {
    case "USD":
      return "$";
    case "EUR":
      return "€";
    case "GBP":
      return "£";
    case "INR":
      return "₹";
    case "AUD":
    case "CAD":
      return "$";
    default:
      return "";
  }
}

export function formatAmount(amount, currency = "USD", rate = null) {
  const base = Number(amount) || 0;

  if (currency === "USD" || !rate) {
    return `${getCurrencySymbol("USD")}${base.toFixed(2)}`;
  }

  const converted = base * Number(rate);

  // show value then code (e.g. 100.00 EUR)
  return `${converted.toFixed(2)} ${currency}`;
}
