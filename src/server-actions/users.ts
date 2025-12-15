"use server";

import supabaseConfig from "@/config/supabase-config";
import { IUser } from "@/interfaces";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const registerUser = async (payload: Partial<IUser>) => {
  try {
    // step 1 : check if user already exists
    const usersExists = await supabaseConfig
      .from("user_profiles")
      .select("*")
      .eq("email", payload.email);
    if (usersExists.error) {
      throw new Error(usersExists.error.message);
    }

    if (usersExists.data && usersExists.data.length > 0) {
      throw new Error("User with this email already exists");
    }

    // step 2 : hash the password
    payload.password = await bcrypt.hash(payload.password || "", 10);

    // step 3 : insert the user into database
    const insertUser = await supabaseConfig
      .from("user_profiles")
      .insert([payload]);

    if (insertUser.error) {
      throw new Error(insertUser.error.message);
    }

    return {
      success: true,
      message: "User registered successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const loginUser = async (payload: Partial<IUser>) => {
  try {
    // step 1 : fetch the user from database
    const usersResponse = await supabaseConfig
      .from("user_profiles")
      .select("*")
      .eq("email", payload.email);
    if (usersResponse.error || usersResponse.data.length === 0) {
      throw new Error("User not found");
    }

    // step 1 : compare the password and role
    const user = usersResponse.data[0];
    if (user.role !== payload.role) {
      throw new Error("Invalid role selected");
    }

    const isPasswordValid = await bcrypt.compare(
      payload.password || "",
      user.password || ""
    );
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    // step 3 : generate JWT token and return response
    const dataTobeSigned = {
      id: user.id,
      email: user.email,
    };

    const token = jwt.sign(dataTobeSigned, process.env.JWT_SECRET!, {
      expiresIn: "3d",
    });

    return {
      success: true,
      message: "Login successful",
      data: token,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getLoggedInUser = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      throw new Error("No token found");
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    if (!decoded || !decoded.email) {
      throw new Error("Invalid token");
    }

    const usersResponse = await supabaseConfig
      .from("user_profiles")
      .select("*")
      .eq("email", decoded.email);

    if (usersResponse.error || usersResponse.data.length === 0) {
      throw new Error("User not found");
    }

    const user = usersResponse.data[0];
    delete user.password; // remove password before returning user object

    return {
      success: true,
      data: user,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
