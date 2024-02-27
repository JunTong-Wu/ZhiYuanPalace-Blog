export const getNavigationMap = () => {
  return [
    {
      path: "/",
      title: "home",
      defaultIcon: "home-default",
      activatedIcon: "home-activated",
    },
    {
      path: "/text",
      title: "text",
      defaultIcon: "text-default",
      activatedIcon: "text-activated",
      children: [
        {
          path: "/text/article",
          title: "article",
          defaultIcon: "article-default",
          activatedIcon: "article-activated",
        },
        {
          path: "/text/shuoshuo",
          title: "shuoshuo",
          defaultIcon: "shuoshuo-default",
          activatedIcon: "shuoshuo-activated",
        },
      ],
    },
    {
      path: "/audio",
      title: "audio",
      defaultIcon: "audio-default",
      activatedIcon: "audio-activated",
    },
    {
      path: "/music",
      title: "music",
      defaultIcon: "music-default",
      activatedIcon: "music-activated",
    },
    {
      path: "/about",
      title: "about",
      defaultIcon: "about-default",
      activatedIcon: "about-activated",
    },
  ];
};
