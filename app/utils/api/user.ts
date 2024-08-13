export const ApiUser = {
    /**
     * 登录
     */
    login(parameter: object) {
        return useMyFetch("post", "/user/login", parameter);
    },
}