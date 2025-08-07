import { defineStore } from "pinia";
// import { fetchPartners } from "~/api/partners";

export const usePartnerStore = defineStore("partnerStore", {
  state: () => ({
    partners: [],
  }),
  actions: {
    async getPartners(size = 10) {
      const response = await bedrockServiceClient({
        url: `/admin/partner?size=${size}`,
        method: "get",
      });
      const { data } = response?.data;
      this.partners = data.items;
      console.log(data);
    }
  },
});
