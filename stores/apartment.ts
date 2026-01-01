export const useApartmentStore = defineStore("apartmentStore", {
  state: () => ({
    apartments: [],
    apartmentTypes: [],
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
    async getApartmentTypes(size = 100) {
      const response = await bedrockServiceClient({
        url: `/admin/apartment-types?size=${size}`,
        method: "get",
      });
      const { data } = response?.data;
      this.apartmentTypes = data.items;
    },
  },
});
