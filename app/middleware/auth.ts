export default defineNuxtRouteMiddleware((to, from) => {
  // Check if user is authenticated
  if (!store.useAuthStore().token) {
    // If not authenticated, redirect to login page
    return navigateTo("/login");
  }
});
