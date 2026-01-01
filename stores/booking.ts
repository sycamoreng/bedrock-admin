/* eslint-disable @typescript-eslint/no-explicit-any */
export const useBookingStore = defineStore("bookingStore", {
  state: () => ({
    bookings: [],
    reservations: [],
    bookingSummary: null,
  }),
  actions: {
    async getBookings(size = 100) {
      const response = await bedrockServiceClient({
        url: `/admin/booking?size=${size}`,
        method: "get",
      });
      const { data } = response.data;
      this.bookings = data;
    },
    async createBooking(body: any) {
      const response = await bedrockServiceClient({
        url: "/admin/booking",
        method: "post",
        data: body,
      });
      const { data } = response.data;
      // this.bookings = data.items;
    },
    async fetchReservations({start_date, end_date}: any) {
      const response = await bedrockServiceClient({
        url: `/admin/dashboard/reservations?start_date=${start_date}&end_date=${end_date}`,
        method: "get",
      });
      const { data } = response.data;
      this.reservations = data;
    },
    async generateBookingSummary(body: any) {
      const response = await bedrockServiceClient({
        url: `/admin/booking/summary`,
        method: "post",
        data: body,
      });
      const { data } = response.data;
      this.bookingSummary = data;
    },
  },
});
