<template lang="">
  <div class="bg-white h-screen relative">
    <aside class="bg-white fixed h-screen w-[18%] border-r border-gray-100 hidden md:block">
      <div class="w-full p-5 pb-2 flex justify-between items-center hover:bg-primary-50 cursor-pointer"
        id="dropdownAvatarNameButton" data-dropdown-toggle="dropdownProfile" data-dropdown-offset-distance="5">
        <div class="flex items-center justify-center">
          <img src="https://images.pexels.com/photos/33134862/pexels-photo-33134862.jpeg" alt="Profile picture"
            class="w-10 h-10 rounded-full object-cover mr-2">
          <div>
            <p class="text-sm font-medium">Onyinye Okonji</p>
            <p class="text-xs text-gray-400">Admin</p>
          </div>
        </div>
        <PhosphorIconCaretDown />
      </div>
      <div id="dropdownProfile"
        class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-md w-[250px] dark:bg-gray-700 dark:divide-gray-600">
        <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
          <div class="font-medium ">Onyinye Okonji</div>
          <div class="truncate">hello@bedrockresidencies.com</div>
        </div>
        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton">
          <li class="cursor-pointer">
            <p class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Profile</p>
          </li>
          <li class="cursor-pointer">
            <p class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</p>
          </li>
        </ul>
        <div class="py-2">
          <p class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer"
            @click="handleSignOut">Sign out</p>
        </div>
      </div>
      <div class="px-4 pt-5">
        <div v-for="(item, index) in sidebar" :key="index">
          <NuxtLink :to="item.route"
            class="flex flex-row items-center py-3 px-2 cursor-pointer hover:bg-primary-50 hover:text-primary hover:font-medium rounded-md transition"
            :class="currentPage?.name === item?.name ? 'bg-primary-50 text-primary font-medium': 'text-primary-500'"
            v-if="item.route">
            <div class="mr-3">
              <SidebarIcon :icon="item.icon" />
            </div>
            <p class="text-sm">{{item.name}}</p>
          </NuxtLink>
          <div v-else class="py-3">
            <p class="text-xs text-gray-500 uppercase mb-2">{{item.name}}</p>
            <NuxtLink :to="subItem.route"
              class="flex flex-row items-center py-3 px-2 cursor-pointer  hover:bg-primary-50 hover:text-primary hover:font-medium rounded-md transition"
              :class="currentPage?.name === subItem?.name ? 'bg-primary-50 text-primary font-medium': 'text-primary-500'"
              v-for="(subItem, subIndex) in item.subroutes" :key="subIndex">
              <div class="mr-3">
                <SidebarIcon :icon="subItem.icon" />
              </div>
              <p class="text-sm">{{subItem.name}}</p>
            </NuxtLink>
          </div>
        </div>
        <!-- <div class="border-gray-300 border-[0.5px] mb-3"></div> -->
      </div>
    </aside>
    <section class="w-full md:w-[82%] md:ml-[18%] relative">
      <header class="w-full fixed bg-white h-16 p-5 border-b border-gray-100">
        <p class="font-bold">{{currentPage?.name}}</p>
      </header>
      <main class="bg-[#f7f7f7] h-screen pt-16">
        <slot />
      </main>
    </section>
  </div>
</template>

<script setup>
  import sidebarRoutes from "@/constants/sidebar-routes";

  const { data, signOut } = useAuth();

  // console.log(JSON.stringify(data))

  const handleSignOut = () => {
    signOut({ callbackUrl: "/auth/login" })
  };

  useHead({
    title: "Bedrock Admin | Residences & Apartments | Overview",
  });

  const findActiveRoute = (routes, currentPath) => {
    for (const item of routes) {
      if (item.route && item.route === currentPath) {
        return item;
      }
      if (item.subroutes) {
        const found = findActiveRoute(item.subroutes, currentPath);
        if (found) return found;
      }
    }
    return null;
  };
  const currentPage = computed(() => {
    const route = useRoute();
    const activeRoute = findActiveRoute(sidebarRoutes, route.path);
    return activeRoute;
  });
  const sidebar = computed(() => {
    return sidebarRoutes;
  });
</script>