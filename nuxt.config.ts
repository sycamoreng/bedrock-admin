import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/ui', "nuxt-phosphor-icons", "dayjs-nuxt", "@sidebase/nuxt-auth", "@pinia/nuxt"],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL,
      authOrigin: process.env.AUTH_ORIGIN
    }
  },
  devServer: {
    // https: true,
  },
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/logo.png' }
      ]
    }
  },
  auth: {
    isEnabled: true,
    disableServerSideAuth: false,
    originEnvKey: 'AUTH_ORIGIN',
    provider: {
      type: "local",
      pages: {
        login: "/auth/login"
      },
      endpoints: {
        signIn: { path: "/auth/admin/login", method: "post" },
        getSession: { path: '/admin/profile', method: 'get' }
      },
      token: {
        signInResponseTokenPointer: "/data/token",
        cookieName: "auth.brock.token",
        maxAgeInSeconds: 86400,
      }
    },
    sessionRefresh: {
      enablePeriodically: false,
      enableOnWindowFocus: false,
    },
    globalAppMiddleware: true,
  }

})
