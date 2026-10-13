import axios, { AxiosError } from "axios";
import { HttpException } from "@nestjs/common";

export function throwAxiosHttpException(
  error: unknown,
  fallbackMessage = "External API error",
): never {
  if (axios.isAxiosError(error) && error.response) {
    const axiosError = error as AxiosError;
    const status = axiosError.response?.status || 500;
    const data: any = axiosError.response?.data || {};
    const description = data.description || data.message || fallbackMessage;

    throw new HttpException(
      {
        statusCode: status,
        message: description,
        original: data,
      },
      status,
    );
  }

  // Fallback: unknown error → generic 500
  throw new HttpException(
    {
      statusCode: 500,
      message: fallbackMessage,
    },
    500,
  );
}
