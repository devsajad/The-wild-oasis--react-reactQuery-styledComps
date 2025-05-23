import supabase from "./supabase";

async function apiGuests() {
  let { data, error } = await supabase.from("guests").select("*");

  if (error) {
    console.error(error);
    throw new Error("There Was an error during fetching cabins from API");
  }

  return data;
}

export default apiGuests;
