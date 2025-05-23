import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

function useSettings() {
  const { data: settings, isPending: isSettingsLoading , error } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { settings, isSettingsLoading , error };
}

export default useSettings;
