import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isPending: isCabinUpdaing } = useMutation({
    mutationFn: ({ id, newCabin }) => createEditCabin(newCabin, id),

    onSuccess: () => {
      toast.success("Cabin edited successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },

    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  return { editCabin, isCabinUpdaing };
}

export default useEditCabin;
