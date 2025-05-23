import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending: isLoadingUpdateUser } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      toast.success("User udpated successfully");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },

    onError: (error) => {
      console.error(error);
      toast.error("There was an error during updating user");
    },
  });

  return { updateUser, isLoadingUpdateUser };
}

export default useUpdateUser;
