import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isPending: isCabinCreating } = useMutation({
    mutationFn: createEditCabin,

    onSuccess: () => {
      toast.success("Cabin created successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });

    },

    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  return { createCabin, isCabinCreating };
}

export default useCreateCabin;
