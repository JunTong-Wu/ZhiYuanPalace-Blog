export function musicBarHide() {
    const musicBar = document.querySelector("#zy-music-bar");
    if (musicBar) {
        musicBar.classList.remove("transition-translate-in");
        musicBar.classList.add("transition-translate-out");
    }
}
export function musicBarShow() {
    const musicBar = document.querySelector("#zy-music-bar");
    if (musicBar) {
        musicBar.classList.remove("transition-translate-out");
        musicBar.classList.add("transition-translate-in");
    }
}