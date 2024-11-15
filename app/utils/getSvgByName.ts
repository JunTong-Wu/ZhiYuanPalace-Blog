export const getSvgByName = (name: string) => {
  let svgElement = "";
  switch (name) {
    case "home-default":
      svgElement = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M3.918 8.037A9 9 0 0 0 15.966 20.08c.873.373 1.719.618 2.49.681c.902.074 1.844-.095 2.526-.777c.752-.752.88-1.816.746-2.812c-.123-.91-.48-1.92-1.002-2.961A9 9 0 0 0 9.791 3.274c-1.044-.524-2.055-.882-2.965-1.006c-.997-.135-2.062-.007-2.815.746c-.682.683-.851 1.626-.777 2.528c.064.773.31 1.62.684 2.495m1.404-2.071a4 4 0 0 1-.095-.587c-.048-.586.09-.842.198-.95c.12-.12.423-.275 1.132-.179q.298.04.643.136a9 9 0 0 0-1.878 1.58m14.29 10.837a5 5 0 0 1 .134.637c.096.709-.06 1.012-.178 1.13c-.109.109-.364.247-.95.199a4 4 0 0 1-.581-.094a9 9 0 0 0 1.575-1.872m-3.73 1.023c-1.677-.878-3.625-2.323-5.507-4.205c-1.88-1.88-3.324-3.825-4.203-5.5A7.02 7.02 0 0 1 9.97 5.298a7 7 0 0 1 5.912 12.528m-2.277.99a7 7 0 0 1-8.42-8.419c.964 1.516 2.25 3.112 3.776 4.638c1.528 1.528 3.126 2.815 4.644 3.78"/></svg>`;
      break;
    case "home-activated":
      svgElement = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M5.322 5.966A9.2 9.2 0 0 1 7.2 4.386a4.5 4.5 0 0 0-.844-.157c-.572-.043-.823.093-.93.2c-.106.106-.242.357-.2.93q.022.275.097.607m15.404 8.245q.091.184.177.366c.476 1.02.791 2.017.859 2.913c.067.892-.106 1.82-.78 2.495c-.674.674-1.603.847-2.495.78c-.78-.06-1.637-.306-2.52-.684l-.003.002a13 13 0 0 1-.462-.208c-2.033-.963-4.359-2.654-6.542-4.838c-2.181-2.181-3.872-4.505-4.835-6.536q-.11-.233-.209-.463l.001-.002c-.379-.885-.626-1.745-.685-2.527c-.068-.892.105-1.82.78-2.495c.673-.674 1.602-.847 2.494-.78c.896.068 1.892.383 2.913.86q.186.085.373.18a9 9 0 0 1 8.572 2.362a9 9 0 0 1 2.362 8.575m-1.113 2.593a9 9 0 0 1-1.576 1.871q.328.075.6.095c.573.043.824-.093.93-.2c.108-.106.244-.357.2-.93a4.5 4.5 0 0 0-.154-.836m-13.977 1.56a9 9 0 0 1-2.417-8.342c1.082 1.981 2.705 4.1 4.68 6.076c1.977 1.977 4.098 3.6 6.08 4.683a9 9 0 0 1-8.343-2.417"/></svg>`;
      break;
    case "text-default":
      svgElement = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M21 18H6a1 1 0 1 0 0 2h15v2H6a3 3 0 0 1-3-3V4a2 2 0 0 1 2-2h16zM5 16.05q.243-.05.5-.05H19V4H5zM16 9H8V7h8z"/></svg>`;
      break;
    case "text-activated":
      svgElement = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M21 18H6a1 1 0 1 0 0 2h15v2H6a3 3 0 0 1-3-3V4a2 2 0 0 1 2-2h16zm-5-9V7H8v2z"/></svg>`;
      break;
    case "article-default":
      svgElement = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M21 3a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6.455L2 22.5V4a1 1 0 0 1 1-1zm-1 2H4v13.385L5.763 17H20zm-9.485 2.412l.447.688c-1.668.903-1.639 2.352-1.639 2.665c.155-.022.318-.025.48-.01a1.76 1.76 0 0 1 1.613 1.745a1.75 1.75 0 0 1-1.75 1.75c-.537 0-1.05-.245-1.374-.59c-.515-.546-.792-1.16-.792-2.155c0-1.75 1.228-3.318 3.015-4.093m5 0l.447.688c-1.668.903-1.639 2.352-1.639 2.665c.155-.022.318-.025.48-.01a1.76 1.76 0 0 1 1.613 1.745a1.75 1.75 0 0 1-1.75 1.75c-.537 0-1.05-.245-1.374-.59c-.515-.546-.792-1.16-.792-2.155c0-1.75 1.228-3.318 3.015-4.093"/></svg>`;
      break;
    case "article-activated":
      svgElement = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M21 3a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6.455L2 22.5V4a1 1 0 0 1 1-1zM10.515 7.412C8.728 8.187 7.5 9.755 7.5 11.505c0 .995.277 1.609.792 2.156c.324.344.837.589 1.374.589a1.75 1.75 0 0 0 1.75-1.75a1.76 1.76 0 0 0-1.614-1.745a2 2 0 0 0-.479.01v-.092c.006-.44.1-1.74 1.639-2.573zm5 0c-1.787.775-3.015 2.343-3.015 4.093c0 .995.277 1.609.792 2.156c.324.344.837.589 1.374.589a1.75 1.75 0 0 0 1.75-1.75a1.76 1.76 0 0 0-1.614-1.745a2 2 0 0 0-.479.01v-.092c.006-.44.1-1.74 1.639-2.573z"/></svg>`;
      break;
    case "shuoshuo-default":
      svgElement = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m2 22l5.291-1.176A9.96 9.96 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12c0 1.703.425 3.306 1.176 4.709zm6.234-2.94l-.653-.349l-2.947.655l.655-2.947l-.35-.653A7.96 7.96 0 0 1 4 12a8 8 0 1 1 8 8a7.96 7.96 0 0 1-3.766-.94M15.45 7h-2.01l-.175 2h-2.008l.175-2H9.426L9.25 9H7v2h2.076L8.9 13H7v2h1.726l-.175 2h2.008l.175-2h2.007l-.175 2h2.008l.175-2H17v-2h-2.076l.175-2H17V9h-1.726zm-4.366 4h2.008l-.175 2h-2.008z"/></svg>`;
      break;
    case "shuoshuo-activated":
      svgElement = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m2 22l5.291-1.176A9.96 9.96 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12c0 1.703.425 3.306 1.176 4.709zM15.449 7l-.175 2H17v2h-1.901l-.175 2H17v2h-2.251l-.175 2h-2.008l.175-2h-2.008l-.175 2H8.552l.175-2H7v-2h1.9l.176-2H7V9h2.25l.176-2h2.007l-.175 2h2.008l.175-2zm-4.366 4l-.175 2h2.008l.175-2z"/></svg>`;
      break;
    case "music-default":
      svgElement = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M20 3v14a4 4 0 1 1-2-3.465V5H9v12a4 4 0 1 1-2-3.465V3zM5 19a2 2 0 1 0 0-4a2 2 0 0 0 0 4m11 0a2 2 0 1 0 0-4a2 2 0 0 0 0 4"/></svg>`;
      break;
    case "music-activated":
      svgElement = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M20 3v14a4 4 0 1 1-2-3.465V6H9v11a4 4 0 1 1-2-3.465V3z"/></svg>`;
      break;
    case "audio-default":
      svgElement = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m9.828 5l-2 2H4v12h16V7h-3.828l-2-2zM9 3h6l2 2h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4zm3 15a5.5 5.5 0 1 1 0-11a5.5 5.5 0 0 1 0 11m0-2a3.5 3.5 0 1 0 0-7a3.5 3.5 0 0 0 0 7"/></svg>`;
      break;
    case "audio-activated":
      svgElement = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M9 3h6l2 2h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4zm3 16a6 6 0 1 0 0-12a6 6 0 0 0 0 12m0-2a4 4 0 1 1 0-8a4 4 0 0 1 0 8"/></svg>`;
      break;
    case "photo-default":
      svgElement = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M2.992 21A.993.993 0 0 1 2 20.007V3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993zM20 15V5H4v14L14 9zm0 2.828l-6-6L6.828 19H20zM8 11a2 2 0 1 1 0-4a2 2 0 0 1 0 4"/></svg>`;
      break;
    case "photo-activated":
      svgElement = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M20 5H4v14l9.292-9.294a1 1 0 0 1 1.415 0L20 15.01zM2 3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H2.992A.993.993 0 0 1 2 20.007zM8 11a2 2 0 1 1 0-4a2 2 0 0 1 0 4"/></svg>`;
      break;
    case "video-default":
      svgElement = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m17 9.2l5.213-3.65a.5.5 0 0 1 .787.41v12.08a.5.5 0 0 1-.787.41L17 14.8V19a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1zm0 3.159l4 2.8V8.84l-4 2.8zM3 6v12h12V6z"/></svg>`;
      break;
    case "video-activated":
      svgElement = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m17 9.2l5.213-3.65a.5.5 0 0 1 .787.41v12.08a.5.5 0 0 1-.787.41L17 14.8V19a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1z"/></svg>`;
      break;
    case "about-default":
      svgElement = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M20 22h-2v-2a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v2H4v-2a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5zm-8-9a6 6 0 1 1 0-12a6 6 0 0 1 0 12m0-2a4 4 0 1 0 0-8a4 4 0 0 0 0 8"/></svg>`;
      break;
    case "about-activated":
      svgElement = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M20 22H4v-2a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5zm-8-9a6 6 0 1 1 0-12a6 6 0 0 1 0 12"/></svg>`;
      break;
    case "information-default":
      svgElement = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16m-5-8h2a3 3 0 1 0 6 0h2a5 5 0 0 1-10 0"/></svg>`;
      break;
    case "information-activated":
      svgElement = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10M7 12a5 5 0 0 0 10 0h-2a3 3 0 1 1-6 0z"/></svg>`;
      break;
    case "friend-default":
      svgElement = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m13.06 8.111l1.415 1.414a7 7 0 0 1 0 9.9l-.354.353a7 7 0 1 1-9.9-9.9l1.415 1.415a5 5 0 1 0 7.071 7.071l.354-.354a5 5 0 0 0 0-7.07l-1.415-1.415zm6.718 6.01l-1.414-1.414a5 5 0 0 0-7.071-7.07l-.354.353a5 5 0 0 0 0 7.07l1.415 1.415l-1.415 1.414l-1.414-1.414a7 7 0 0 1 0-9.9l.354-.353a7 7 0 1 1 9.9 9.9"/></svg>`;
      break;
    case "friend-activated":
      svgElement = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m13.06 8.111l1.415 1.414a7 7 0 0 1 0 9.9l-.354.353a7 7 0 1 1-9.9-9.9l1.415 1.415a5 5 0 1 0 7.071 7.071l.354-.354a5 5 0 0 0 0-7.07l-1.415-1.415zm6.718 6.01l-1.414-1.414a5 5 0 0 0-7.071-7.07l-.354.353a5 5 0 0 0 0 7.07l1.415 1.415l-1.415 1.414l-1.414-1.414a7 7 0 0 1 0-9.9l.354-.353a7 7 0 1 1 9.9 9.9"/></svg>`;
      break;
    case "arrow-left":
      svgElement = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m10.828 12l4.95 4.95l-1.414 1.415L8 12l6.364-6.364l1.414 1.414z"/></svg>`;
      break;
    case "arrow-right":
      svgElement = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m13.172 12l-4.95-4.95l1.414-1.413L16 12l-6.364 6.364l-1.414-1.415z"/></svg>`;
      break;

    default:
      break;
  }
  return svgElement;
};
