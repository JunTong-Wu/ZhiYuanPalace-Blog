export const getNavigationMap = () => {
  return [
    {
      path: "/",
      title: "home",
      defaultIcon: "home-default",
      activatedIcon: "home-activated",
      order: 1,
    },
    {
      path: "/text",
      title: "text",
      defaultIcon: "text-default",
      activatedIcon: "text-activated",
      order: 2,
      children: [
        {
          path: "/text/article",
          title: "article",
          defaultIcon: "article-default",
          activatedIcon: "article-activated",
          order: 1,
        },
        {
          path: "/text/shuoshuo",
          title: "shuoshuo",
          defaultIcon: "shuoshuo-default",
          activatedIcon: "shuoshuo-activated",
          order: 2,
        },
      ],
    },
    {
      path: "/audio",
      title: "audio",
      defaultIcon: "audio-default",
      activatedIcon: "audio-activated",
      order: 3,
    },
    {
      path: "/music",
      title: "music",
      defaultIcon: "music-default",
      activatedIcon: "music-activated",
      order: 4,
    },
    {
      path: "/about",
      title: "about",
      defaultIcon: "about-default",
      activatedIcon: "about-activated",
      order: 5,
    },
  ];
};
