export function footerBarHide() {
  const footer = document.querySelector('footer');
  if (footer) {
    footer.classList.remove('transition-translate-in');
    footer.classList.add('transition-translate-out');
  }
}
export function footerBarShow() {
  const footer = document.querySelector('footer');
  if (footer) {
    footer.classList.remove('transition-translate-out');
    footer.classList.add('transition-translate-in');
  }
}
