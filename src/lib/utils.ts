import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function rock(r: string) {
  return r
}

export function tru(r: string) {
  return r
}

export function trugt(r: string) {
  return r
}