import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

function useTodayActivity() {
  const { data: todayActivityData, isPending: isTodayActivityLoading } =
    useQuery({
      queryKey: ["today"],
      queryFn: getStaysTodayActivity,
    });

  return { todayActivityData, isTodayActivityLoading };
}

export default useTodayActivity;
