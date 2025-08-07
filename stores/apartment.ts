export const useApartmentStore = defineStore("apartmentStore", {
  state: () => ({
    apartments: [],
  }),
  actions: {
    async getApartments(size = 100) {
      const response = await bedrockServiceClient({
        url: `/admin/apartment?size=${size}`,
        method: "get",
      });
      const { data } = response?.data;
      this.apartments = data.items;
    },
    async createApartment(body: any) {
      const response = await bedrockServiceClient({
        url: "/admin/apartment",
        method: "post",
        data: body,
      });
      const { data } = response?.data;
      // this.apartments = data.items;
    },
  },
});
