export function toolBarHide() {
  const toolBar = document.querySelector("#zy-tool-bar");
  if (toolBar) {
    toolBar.classList.remove("transition-translate-in");
    toolBar.classList.add("transition-translate-out");
  }
}
export function toolBarShow() {
  const toolBar = document.querySelector("#zy-tool-bar");
  if (toolBar) {
    toolBar.classList.remove("transition-translate-out");
    toolBar.classList.add("transition-translate-in");
  }
}
