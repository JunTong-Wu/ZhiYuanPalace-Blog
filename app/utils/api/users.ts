export const ApiUser = {
  /**
   * 登录
   */
  login(param: any) {
    return ApiService.post("/users/login", param);
  },
};
