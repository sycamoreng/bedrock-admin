export const useResidenceStore = defineStore("residenceStore", {
  state: () => ({
    residences: [],
  }),
  actions: {
    async getResidences(size = 100) {
      const response = await bedrockServiceClient({
        url: `/admin/residence?size=${size}`,
        method: "get",
      });
      const { data } = response?.data;
      this.residences = data.items;
    },
    async createResidence(body: any) {
      const response = await bedrockServiceClient({
        url: "/admin/residence",
        method: "post",
        data: body,
      });
      const { data } = response?.data;
      this.residences = data.items;
    },
  },
});
