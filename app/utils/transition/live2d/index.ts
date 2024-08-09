export function live2dHide() {
    const element = document.querySelector("#oml-stage");
    if (element) {
        element.classList.remove("transition-translate-in");
        element.classList.add("transition-translate-out");
    }
}
export function live2dShow() {
    const element = document.querySelector("#oml-stage");
    if (element) {
        element.classList.remove("transition-translate-out");
        element.classList.add("transition-translate-in");
    }
}