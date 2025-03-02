import jwt from "jsonwebtoken";
import { config } from "~~/server/config";
import { EventHandlerRequest, H3Event } from "h3";

export const loginVerify = (event: H3Event<EventHandlerRequest>) => {
  const authHeader = getHeader(event, "authorization");
  let isLoggedIn = false; // 默认未登录
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      // 验证 JWT 令牌
      const decoded = jwt.verify(token, config.jwt.secret);
      if (decoded) {
        isLoggedIn = true; // 如果验证成功，标记为已登录
      } else {
        console.log("decoded: ", decoded);
      }
    } catch (error) {
      // 如果验证失败，保持 isLoggedIn 为 false
      console.error("JWT 验证失败:", error);
    }
  }

  return isLoggedIn;
};
