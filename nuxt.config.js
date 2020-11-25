import axios from "axios";

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: "static",

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "microcms-nuxt-jamstack-blog",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ["~plugins/vue-scrollto"],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ["@nuxtjs/axios", "vue-scrollto/nuxt"],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},

  generate: {
    async routes() {
      const limit = 2;
      const range = (start, end) =>
        [...Array(end - start + 1)].map((_, i) => start + i);
      const pages = await axios
        .get("https://jamstackblog.microcms.io/api/v1/blog?limit=0", {
          headers: { "X-API-KEY": "ac4bdc72-42db-40aa-87ad-f41ca20e95e1" }
        })
        .then(res =>
          res.data.contents.map(content => ({
            route: `/${content.id}`,
            payload: content
          })),
          range(1, Math.ceil(res.data.totalCount / limit)).map((p) => ({
            route: `/page/${p}`,
          }))
        );
      return pages;
    }
  },

  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        path: "/page/:p",
        component: resolve(__dirname, "pages/index.vue"),
        name: "page"
      });
    }
  }
};
