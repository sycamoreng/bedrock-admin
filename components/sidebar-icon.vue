<template lang="">
  <div>
    <PhosphorIconUser v-if="icon === 'user'" />
    <PhosphorIconUsers v-if="icon === 'users'" />
    <PhosphorIconHouse v-if="icon === 'house'" />
    <PhosphorIconIdentificationCard v-if="icon === 'identification-card'" />
    <PhosphorIconLock v-if="icon === 'lock'" />
    <PhosphorIconShieldCheck v-if="icon === 'shield-check'" />
    <PhosphorIconGauge v-if="icon === 'gauge'" />
    <PhosphorIconCalendar v-if="icon === 'calendar'" />
    <PhosphorIconChartBar v-if="icon === 'chart-bar'" />
    <PhosphorIconChartLineUp v-if="icon === 'chart-line-up'" />
  </div>
</template>
<script>
export default {
  name: "SidebarIcon",
  props: {
    icon: String,
  },
}
</script>
