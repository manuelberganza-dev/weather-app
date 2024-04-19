import { ReactNode } from "react";

export default function Error({ children }: {children: ReactNode}) {
    return (
        <>
            <p className="bg-white text-red-700 text-center font-bold p-2 rounded my-4">
                {children}
            </p>
        </> 
    )
}