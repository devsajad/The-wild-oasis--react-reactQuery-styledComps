import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate: deleteBookingQuery, isPending: DeleteBookingLoading } =
    useMutation({
      mutationFn: deleteBooking,
      onSuccess: () => {
        queryClient.invalidateQueries(["bookings"]);
        toast.success("Booking Deleted Successfully");
      },
      onError: () => {
        toast.error("There was an error during Booking deleting");
      },
    });

  return { deleteBookingQuery, DeleteBookingLoading };
}

export default useDeleteBooking;
