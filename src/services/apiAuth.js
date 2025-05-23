import supabase, { supabaseUrl } from "./supabase";

export async function login(email, password) {
  console.log(email, password);
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function signUp({ fullName, email, password }) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function updateCurrentUser({ fullName, avatar, password }) {
  // https://lvxbofzfpvxbqmccnrss.supabase.co/storage/v1/object/public/cabin-images//0.10748528497309806-download.jpg
  // console.log(avatar);

  // 1. Upate Password OR fullName
  let updateData;

  if (password)
    updateData = {
      password,
    };
  if (fullName)
    updateData = {
      data: { fullName },
    };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // Image address
  const avatarName = "avatar-" + data.user.id + Math.random() + avatar.name;
  const avatarAddresss = `${supabaseUrl}/storage/v1/object/public/avatars//${avatarName}`;

  // Upload avatar image
  const { error: avatarUploadError } = await supabase.storage
    .from("avatars")
    .upload(avatarName, avatar);

  if (avatarUploadError) throw new Error(avatarUploadError.message);

  // Update Avatar address in Database
  const { data: avatarUpdate, error: avatarUpdateError } =
    await supabase.auth.updateUser({
      data: { avatar: avatarAddresss },
    });

  if (avatarUpdateError) throw new Error(avatarUpdateError.message);

  return avatarUpdate;
}
