import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

function useUser() {
  const { isPending: isUserLoading, data: currentUser } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return {
    isUserLoading,
    currentUser,
    isAuthenticated: currentUser?.role === "authenticated",
  };
}

export default useUser;
