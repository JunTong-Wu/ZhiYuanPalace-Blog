import { type Directive } from 'vue';
import * as directives from './directives/export';

export default defineNuxtPlugin((nuxtApp) => {
  Object.keys(directives).forEach((key) => {
    nuxtApp.vueApp.directive(
      key,
      //@ts-ignore
      (directives as { [key: string]: Directive })[key],
    );
  });
});
