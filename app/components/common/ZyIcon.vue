<template>
  <div :class="{ activated: activated }" :style="{ '--size': size, width: size, height: size }" class="ZyIcon relative">
    <div
        v-if="defaultName"
        :style="{ '--icon-color': defaultLinearGradient ? 'inherit' : defaultColor }"
        class="icon-default flex"
        v-html="formatDefaultIcon"
    ></div>
    <div
        v-if="activatedName"
        :style="{ '--icon-color': activatedLinearGradient ? 'inherit' : activatedColor }"
        class="icon-activated flex"
        v-html="formatActivatedIcon"
    ></div>
  </div>
</template>
<script lang="ts" setup>
import md5 from "md5";

interface LinearGradient {
  direction: "bottom" | "top" | "left" | "right";
  from: string;
  to: string;
}

const props = defineProps({
  size: {
    type: String,
    default: "1rem",
  },
  defaultName: {
    type: String,
    default: "",
  },
  defaultColor: {
    type: String,
    default: "inherit",
  },
  activatedName: {
    type: String,
    default: "",
  },
  activatedColor: {
    type: String,
    default: "inherit",
  },
  activated: {
    type: Boolean,
    default: false,
  },
  defaultLinearGradient: {
    type: Object as () => LinearGradient | null,
    default: null,
  },
  activatedLinearGradient: {
    type: Object as () => LinearGradient | null,
    default: null,
  },
});

const originDefaultIcon = getSvgByName(props.defaultName);
const originActivatedIcon = getSvgByName(props.activatedName);
let formatDefaultIcon = "";
let formatActivatedIcon = "";

const getId = (state: "default" | "activated") => {
  const name = state === "default" ? props.defaultName : props.activatedName;
  const {direction, from, to} =
      state === "default"
          ? (props.defaultLinearGradient as LinearGradient)
          : (props.activatedLinearGradient as LinearGradient);
  const randomNumber = Math.floor(Math.random() * 900000) + 100000;
  return md5(name + direction + from + to + randomNumber);
};

const formatIcon = () => {
  if (!props.defaultLinearGradient) {
    formatDefaultIcon = originDefaultIcon;
  }
  if (!props.activatedLinearGradient) {
    formatActivatedIcon = originActivatedIcon;
  }

  if (props.defaultLinearGradient) {
    const name = getId("default");
    const {direction, from, to} = props.defaultLinearGradient;
    let x1 = "0%",
        y1 = "0%",
        x2 = "0%",
        y2 = "0%";
    switch (direction) {
      case "bottom":
        y2 = "100%";
        break;
      case "top":
        y1 = "100%";
        break;
      case "left":
        x2 = "100%";
        break;
      case "right":
        x1 = "100%";
        break;
    }
    const gradient = `
      <linearGradient id="${name}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">
        <stop offset="0%" stop-color="${from}" />
        <stop offset="100%" stop-color="${to}" />
      </linearGradient>
    `;
    formatDefaultIcon = originDefaultIcon.replace(/fill="([^"]+)"/g, `fill="url(#${name})"`);
    formatDefaultIcon = formatDefaultIcon.replace(/(<svg[^>]+)>/, `$1>${gradient}`);
  }

  if (props.activatedLinearGradient) {
    const name = getId("activated");
    const {direction, from, to} = props.activatedLinearGradient;
    let x1 = "0%",
        y1 = "0%",
        x2 = "0%",
        y2 = "0%";
    switch (direction) {
      case "bottom":
        y2 = "100%";
        break;
      case "top":
        y1 = "100%";
        break;
      case "left":
        x2 = "100%";
        break;
      case "right":
        x1 = "100%";
        break;
    }
    const gradient = `
      <linearGradient id="${name}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">
        <stop offset="0%" stop-color="${from}" />
        <stop offset="100%" stop-color="${to}" />
      </linearGradient>
    `;
    formatActivatedIcon = originActivatedIcon.replace(/fill="([^"]+)"/g, `fill="url(#${name})"`);
    formatActivatedIcon = formatActivatedIcon.replace(/(<svg[^>]+)>/, `$1>${gradient}`);
  }
};

formatIcon();
</script>
<style lang="scss">
.ZyIcon {
  svg {
    width: var(--size);
    height: var(--size);
    font-size: var(--size);
    color: var(--icon-color);
  }

  > div {
    position: absolute;
    top: 0;
    transition: opacity 0.3s ease;
  }

  > div.icon-default {
    opacity: 1;
  }

  > div.icon-activated {
    opacity: 0;
  }

  &.activated {
    > div.icon-default {
      opacity: 0;
    }

    > div.icon-activated {
      opacity: 1;
    }
  }
}
</style>
