export default defineNuxtRouteMiddleware((to, from) => {
  if (to.meta?.type !== "admin") {
    return;
  }
  if (to.path === "/login") {
    return;
  }
  // Check if user is authenticated
  if (!store.useAuthStore().token) {
    // If not authenticated, redirect to login page
    return navigateTo("/login");
    // return;
  }
});
