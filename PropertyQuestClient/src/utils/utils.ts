import { AxiosError } from "axios";
export const isValidationError = (msg: string) => msg === "Validation Error";

export const getErrorMessage = (e: unknown) => {
  if (e instanceof AxiosError) {
    return (
      e?.response?.data?.error?.message ??
      e?.response?.data?.error?.code ??
      e?.response?.data?.message ??
      e?.message
    );
  } else if (e instanceof Error) {
    return e.message;
  } else {
    return "[unknown error]: please try again";
  }
};

export const getValidationErrors = (e: unknown) => {
  const reasonUnknown = "Validation failed for unknown reasons";
  if (e instanceof AxiosError) {
    const errors = e?.response?.data?.error?.details ?? [];

    if (!Object.keys(errors).length) {
      return typeof e?.response?.data?.error === "string"
        ? e?.response?.data?.error
        : reasonUnknown;
    }

    const errorList: string[] = [];
    Object.keys(errors).forEach((key) => {
      const error = errors[key];
      if (error._errors) {
        errorList.push(`${key}: ${error._errors.join(", ")}`);
      }
    });

    console.log({ errorList });

    return errorList.join(", ");
  } else {
    return reasonUnknown;
  }
};

export const TransactionBgColors = {
  PAID: "green.200",
  PENDING: "blue.200",
  CANCELLED: "red.200",
};

export const vibrateDevice = (duration: number) => {
  if (window.navigator.vibrate) {
    window.navigator.vibrate(duration);
  }
};

export const formatAmount = (amount: number | string, decimal = true) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    currencyDisplay: "symbol",
    minimumFractionDigits: decimal ? 2 : 0,
  }).format(Number(amount));
};

export const formatDate = (date: string | Date | undefined) => {
  if (!date) return "";
  if (typeof date === "string") return date.split("T")[0];
  if (date instanceof Date) return date.toISOString().split("T")[0];
  return "";
};

export const getAvatarUrl = (avatar?: string) =>
  avatar ? `${process.env.NEXT_PUBLIC_API_HOST}/assets/avatar/${avatar}` : "";

export const getFileUrl = (file?: string) =>
  file ? `${process.env.NEXT_PUBLIC_API_HOST}/assets/img/${file}` : "";

export const getPropertyImagesUrl = (file?: string) =>
  file
    ? `${process.env.NEXT_PUBLIC_API_HOST}/assets/propertyimages/${file}`
    : "";

export const getFloorPhotoUrl = (file?: string) =>
  file
    ? `${process.env.NEXT_PUBLIC_API_HOST}/assets/propertyfloorimages/${file}`
    : "";

export const getImportedFileUrl = (userId: string, filename: string) =>
  filename
    ? `${process.env.NEXT_PUBLIC_API_HOST}/assets/records/${userId}/${filename}`
    : "";

export const JSONSafeParse = (data: unknown): Record<string, unknown> => {
  let result = data;
  const MAX_ATTEMPTS = 5;

  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    if (!result) return {};

    if (typeof result === "object" && !Array.isArray(result)) {
      return result as Record<string, unknown>;
    }

    if (typeof result === "string") {
      try {
        result = JSON.parse(result);
      } catch (error) {
        console.error("[logger]: Error parsing JSON", error, result);
        return {};
      }
    } else {
      // not a string or object
      return {};
    }
  }

  console.warn("[logger]: Max parse attempts reached", result);
  return {};
};

// Function to format property type for display
export const formatPropertyType = (type: string): string => {
  return type
    .split(/[_/]/) // Split by underscore or forward slash
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
