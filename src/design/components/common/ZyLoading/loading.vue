<template>
    <div id="loading" class="loading_out">
        <svg viewBox='0 0 50 50'>
            <circle r='15' cx='25' cy='25'></circle>
        </svg>
        <p>LOADING</p>
    </div>
</template>

<script >
export default defineComponent({
  name: "zy-loading",
  props: {
    display: { type: Boolean, defalut:false }, // 指定是否物理打开
  },
  setup(props){
    const Loading_in = () => {
      let conainer = document.getElementById("loading");
      conainer.classList.remove("loading_out");
    }
    const Loading_out = () => {
      let conainer = document.getElementById("loading");
      conainer.classList.add("loading_out");
    }
    watch(
        () => props.display,
        (newValue) => {
          if(newValue){
            Loading_in()
          }else{
            Loading_out()
          }
        }
    );

    return {
      Loading_in,
      Loading_out
    }
  }
})



</script>


<style>
#loading {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: var(--bg-1);
    backdrop-filter: blur(20px);
    z-index: 100000000;
    transition: 400ms ease;
}

#loading svg {
    width: 5rem;
    overflow: visible;
    transition: 0.3s ease;
}

#loading svg circle {
    fill: none;
    stroke: var(--primary-6);
    stroke-width: 4;
    stroke-dasharray: 100;
    stroke-dashoffset: 100;
    transform-origin: center;
    animation: circle_rotate 3s ease-in infinite;
}

@keyframes circle_rotate {
    0% {
        transform: rotate(0deg);
        stroke-dashoffset: 100;
    }

    100% {
        transform: rotate(360deg);
        stroke-dashoffset: -100;
    }
}

#loading p {
    font-family: sans-serif;
    font-size: 1rem;
    color: var(--text-1);
    font-weight: 900;
    transition: 0.3s ease;
}

.loading_out {
    transform: translateY(100%);
}

.loading_out svg,
.loading_out p {
    opacity: 0;
}
</style>
