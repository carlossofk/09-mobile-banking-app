import { generateDinHeader } from "@/src/core/utils/generateDinHeader";
import axios from "axios";
import { useState } from "react";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const requestData = {
      dinHeader: generateDinHeader(),
      dinBody: { email, password },
    };

    try {
      setLoading(true);
      const response = await axios.post(
        "http://3.145.213.103:8080/api/auth/authenticate",
        requestData
      );

      return response.data;
    } catch (error) {
      setLoading(false);
      setError(error as Error);
      throw error;
    }
  };

  const register = async ({
    firstName,
    lastName,
    email,
    password,
  }: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    const requestData = {
      dinHeader: generateDinHeader(),
      dinBody: { firstName, lastName, email, password, role: "ROLE_USER" },
    };

    try {
      setLoading(true);
      const response = await axios.post(
        "http://3.145.213.103:8080/api/auth/register",
        requestData
      );

      return response.data;
    } catch (error) {
      setLoading(false);
      setError(error as Error);
      throw error;
    }
  };

  return {
    login,
    register,

    loading,
    error,
  };
};
