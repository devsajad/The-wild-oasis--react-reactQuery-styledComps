import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export default function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: userLogin, isPending: isLoginLoading } = useMutation({
    mutationFn: ({ email, password }) => login(email, password),

    onError: (err) => {
      toast.error(err.message);
      console.error(err);
    },

    onSuccess: (data) => {
      toast.success("User logedIn successfully");
      queryClient.setQueryData(["user"], data.user);
      navigate("/dashboard");
    },
  });

  return { userLogin, isLoginLoading };
}
