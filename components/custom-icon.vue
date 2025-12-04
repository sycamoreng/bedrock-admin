<template lang="">
  <div>
    <PhosphorIconUser v-if="icon === 'user'" />
    <PhosphorIconUsers v-else-if="icon === 'users'" />
    <PhosphorIconHouse v-else-if="icon === 'house'" />
    <PhosphorIconIdentificationCard v-else-if="icon === 'identification-card'" />
    <PhosphorIconLock v-else-if="icon === 'lock'" />
    <PhosphorIconShieldCheck v-else-if="icon === 'shield-check'" />
    <PhosphorIconGauge v-else-if="icon === 'gauge'" />
    <PhosphorIconCalendar v-else-if="icon === 'calendar'" />
    <PhosphorIconChartBar v-else-if="icon === 'chart-bar'" />
    <PhosphorIconChartLineUp v-else-if="icon === 'chart-line-up'" />
    <PhosphorIconCurrencyNgn v-else-if="icon === 'currency-ngn'" />
    <PhosphorIconSwimmingPool v-else-if="icon === 'swimming_pool'" />
    <PhosphorIconWifiHigh v-else-if="icon === 'wifi_high'" />
    <PhosphorIconPuzzlePiece v-else-if="icon === 'puzzle_piece'" />
    <PhosphorIconPopcorn v-else-if="icon === 'popcorn'" />
    <PhosphorIconCookingPot v-else-if="icon === 'cooking_pot'" />
    <PhosphorIconForkKnife v-else-if="icon === 'fork_knife'" />
    <PhosphorIconCar v-else-if="icon === 'car'" />
    <PhosphorIconShieldCheck v-else-if="icon === 'shield_check'" />
    <PhosphorIconMoney v-else-if="icon === 'money'" />
    <PhosphorIconGameController v-else-if="icon === 'game_controller'" />
    <PhosphorIconCoatHanger v-else-if="icon === 'coat_hanger'" />
    <PhosphorIconBroom v-else-if="icon === 'broom'" />
    <PhosphorIconDiamond v-else-if="icon === 'diamond'" />
    <PhosphorIconSealPercent v-else-if="icon === 'seal-percent'" />
    <PhosphorIconCheckSquareOffset v-else-if="icon === 'check-square-offset'" />
    <PhosphorIconGlobe v-else-if="icon === 'globe'" />
    <PhosphorIconUserPlus v-else-if="icon === 'user-plus'" />
    <PhosphorIconUsersThree v-else-if="icon === 'users-three'" />
    <PhosphorIconDiamond v-else />
  </div>
</template>
<script>
export default {
  name: "CustomIcon",
  props: {
    icon: {
      type: String,
      default: "diamond"
    },
  },
}
</script>
