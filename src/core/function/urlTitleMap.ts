export const getMap = () => {
    return [
        {
            path: '/',
            title: 'home',
            lineIcon: 'solar:home-smile-linear',
            filledIcon: 'solar:home-smile-bold'},
        {
            path: '/article',
            title: 'article',
            lineIcon: 'solar:notebook-minimalistic-linear',
            filledIcon: 'solar:notebook-minimalistic-bold'
        },
        {
            path: '/shuoshuo',
            title: 'shuoshuo',
            lineIcon: 'solar:star-linear',
            filledIcon: 'solar:star-bold'},
        {
            path: '/photo',
            title: 'photo',
            lineIcon: 'solar:album-linear',
            filledIcon: 'solar:album-bold'},
        {
            path: '/video',
            title: 'video',
            lineIcon: 'solar:videocamera-linear',
            filledIcon: 'solar:videocamera-bold'
        },
    ]
}

export const getTitle = (url:string) => {
    let parts = url.split('/');
    parts.splice(0, 2);
    const path = '/' + parts.join('/');
    let title = ''
    const item = getMap().find((item)=>{
        return item.path == path
    })
    if (item) {
        title = item.title
    }
    return title
}
