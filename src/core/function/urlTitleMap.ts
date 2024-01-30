export const getTitle = (url:string) => {
    let parts = url.split('/');
    parts.splice(0, 2);
    const path = '/' + parts.join('/');
    let title = ''
    if (path == '/') {
        title = '首页'
    } else if (path == '/article') {
        title = '文章'
    } else if (path == '/shuoshuo') {
        title = '说说'
    } else if (path == '/photo') {
        title = '照片'
    } else if (path == '/video') {
        title = '视频'
    }
    return title
}