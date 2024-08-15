import type { DirectiveBinding } from "vue";
import './ZySectionLoading.scss';
export const Loading = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const div = document.createElement("div");
    div.classList.add("loading-spinner-wrapper");
    const inner = document.createElement("div");
    inner.classList.add("loading-spinner-inner");
    div.appendChild(inner);
    el.appendChild(div);
    if (binding.value) {
      el.classList.add("is-loading");
    } else {
      el.classList.remove("is-loading");
    }
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    if (binding.value) {
      el.classList.add("is-loading");
    } else {
      el.classList.remove("is-loading");
    }
  },
};

export default Loading;
