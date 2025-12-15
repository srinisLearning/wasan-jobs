"use server";

import supabaseConfig from "@/config/supabase-config";

export const uploadFile = async (file: File) => {
  try {
    const uniqueFileName = `${Date.now()}-${file.name}`;
    const path = `resumes/${uniqueFileName}`;
    const uploadResponse = await supabaseConfig.storage
      .from("default")
      .upload(path, file);
    if (uploadResponse.error) {
      throw new Error(uploadResponse.error.message);
    }

    const urlResponse = supabaseConfig.storage
      .from("default")
      .getPublicUrl(path);

    const url = urlResponse.data.publicUrl;

    return {
      success: true,
      data: url,
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
    };
  }
};
