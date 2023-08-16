import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const getUserRoleIdFromSelect = (value: string) =>{
    switch(value){
        case 'undergraduate':
            return 1;
        case 'graduate':
            return 2;
        case 'instructor':
            return 3;
    }
}