export const useBookingStore = defineStore("bookingStore", {
  state: () => ({
    bookings: [],
  }),
  actions: {
    async getBookings(size = 100) {
      const response = await bedrockServiceClient({
        url: `/admin/booking?size=${size}`,
        method: "get",
      });
      const { data } = response?.data;
      this.bookings = data;
    },
    async createBooking(body: any) {
      const response = await bedrockServiceClient({
        url: "/admin/booking",
        method: "post",
        data: body,
      });
      const { data } = response?.data;
      // this.bookings = data.items;
    },
  },
});
