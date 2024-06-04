import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getAuth = () =>
  typeof window === 'undefined' ? null : JSON.parse(localStorage.getItem("yt-assistant-auth") || '""');

export const setAuth = (data: any) =>
  typeof window === 'undefined' ? null : localStorage.setItem("yt-assistant-auth", JSON.stringify(data));
