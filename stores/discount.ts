export const useDiscountStore = defineStore("discountStore", {
  state: () => ({
    discounts: [],
  }),
  actions: {
    async getDiscounts(size = 100) {
      const response = await bedrockServiceClient({
        url: `/admin/apartment?size=${size}`,
        method: "get",
      });
      const { data } = response?.data;
      this.discounts = data.items;
    },
    async createDiscount(body: any) {
      const response = await bedrockServiceClient({
        url: "/admin/apartment",
        method: "post",
        data: body,
      });
    },
  },
});
