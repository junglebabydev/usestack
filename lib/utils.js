import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines class names using clsx and tailwind-merge for optimal Tailwind CSS class handling
 * @param {...(string|Object|Array)} inputs - Class names, objects, or arrays to combine
 * @returns {string} Combined and optimized class names
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
