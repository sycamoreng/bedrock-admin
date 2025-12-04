import { defineStore } from "pinia";

export const useMiscStore = defineStore("miscStore", {
  state: () => ({
    amenities: [],
  }),
  actions: {
    async getAmenities(size = 50) {
      const response = await bedrockServiceClient({
        url: `/admin/amenities?size=${size}`,
        method: "get",
      });
      const { data } = response?.data;
      this.amenities = data.items;
    }
  },
});
