import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const getErrorMessage = (error: FetchBaseQueryError | SerializedError | undefined): string => {
  if (error && typeof error === 'object') {
    if ('data' in error) {
      const fetchError = error as FetchBaseQueryError & { data?: { message: string } };
      return fetchError.data?.message || 'Unknown Fetch error';
    } else if ('message' in error) {
      const serializedError = error as SerializedError;
      return serializedError.message || 'Unknown Serialized error';
    }
  }
  return "";
};