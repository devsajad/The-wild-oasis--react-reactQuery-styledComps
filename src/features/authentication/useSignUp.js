import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useSignUp() {
  const { mutate: signUpUser, isPending: isSignUpLoading } = useMutation({
    mutationFn: signUp,

    onError: (err) => {
      toast.error(err.message);
      console.error(err);
    },

    onSuccess: (data) => {
      toast.success("User logedIn successfully");
      console.log(data);
    },
  });

  return { signUpUser, isSignUpLoading };
}

export default useSignUp;
