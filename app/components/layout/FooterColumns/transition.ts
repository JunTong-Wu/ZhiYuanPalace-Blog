export function footerColumnsHide() {
  const footer = document.querySelector("#footer-columns");
  if (footer) {
    footer.classList.remove("transition-translate-in");
    footer.classList.add("transition-translate-out");
  }
}
export function footerColumnsShow() {
  const footer = document.querySelector("#footer-columns");
  if (footer) {
    footer.classList.remove("transition-translate-out");
    footer.classList.add("transition-translate-in");
  }
}
