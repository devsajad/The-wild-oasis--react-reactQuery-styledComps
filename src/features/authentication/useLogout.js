import { useMutation } from "@tanstack/react-query";
import { logout } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

function useLogout() {
  const navigate = useNavigate();

  const { mutate: userLogOut, isPending: isLogOutLoading } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("Loged out successfylly");
      navigate("/login", { replace: true });
    },
    onError: (error) => {
      toast.error("You can't log out at this moment !");
      throw new Error(error.message);
    },
  });

  return { userLogOut, isLogOutLoading };
}

export default useLogout;
