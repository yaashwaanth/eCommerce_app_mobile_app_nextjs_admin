// Check if user is authenticated and if user is an admin

import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";



export default async function AuthLayout({children}: Readonly<{children: ReactNode}>) {
    const supabase = createClient();

    const {data : authData} = await (await supabase).auth.getUser();
     console.log(authData,"autD");
     
    if(authData?.user){
        // const {data,error} = (await supabase).from('users').select("*").eq('id',authData.user.id).single();
        const {data,error}= await (await supabase).from('users').select("*").eq('id',authData.user.id).single();
        
        if(error || !data ){
            console.log(error,"Error fetching user data");
            return
        }
        console.log(data,"data");
        
        
        if(data.type === 'ADMIN') return redirect('/admin')

    }

    return <>
    {children}
    </>
}