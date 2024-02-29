import { type Directive } from "vue";
import * as directives from "../directives";

export default defineNuxtPlugin((nuxtApp) => {
  Object.keys(directives).forEach((key) => {
    nuxtApp.vueApp.directive(
      key,
      (directives as { [key: string]: Directive })[key]
    );
  });
});
