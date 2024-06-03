import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getAuth = () =>
  JSON.parse(localStorage.getItem("yt-assistant-auth") || '""');

export const setAuth = (data: any) =>
  localStorage.setItem("yt-assistant-auth", JSON.stringify(data));
