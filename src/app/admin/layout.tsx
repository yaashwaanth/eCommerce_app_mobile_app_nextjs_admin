import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { RenderMounted } from '@/components/render-mounted';
import { ADMIN } from '@/constants/contants';
import { createClient } from '@/supabase/server';
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react'

export default async function AdminLayout({children}:Readonly<{children: ReactNode}>){

    // Todo: check user is authenticated and type is admin

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
        
        
        if(data.type !== ADMIN) return redirect('/')
  return (
   <RenderMounted>
    <Header/>
    <main className='min-h-[calc(100svh-128px)] py-3'> {children}</main>
    <Footer/>
    </RenderMounted>
  )
}
}