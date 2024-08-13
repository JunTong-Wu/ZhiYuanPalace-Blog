export default defineAppConfig({
  ui: {
    primary: 'theme',
    gray: 'slate',
    input: {
      default: {
        color: 'theme',
      },
      variant: {
        outline: 'bg-transparent outline-none shadow-none ring-0 border-b-4 border-gray-100 rounded-none focus:ring-0 focus:border-{color}-500 pl-0 py-4 transition-border-color duration-300',
      },
    }
  }
})