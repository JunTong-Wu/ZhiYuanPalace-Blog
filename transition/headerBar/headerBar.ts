export function headerBarHide() {
  const header = document.querySelector("header");
  if (header) {
    header.classList.remove("transition-translate-in");
    header.classList.add("transition-translate-out");
  }
}
export function headerBarShow() {
  const header = document.querySelector("header");
  if (header) {
    header.classList.remove("transition-translate-out");
    header.classList.add("transition-translate-in");
  }
}
