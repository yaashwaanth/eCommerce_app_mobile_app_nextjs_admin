'use server'

import { createClient } from "@/supabase/server"
import { revalidatePath } from "next/cache";
import { sendNotification } from "./notifications";

const supabase = createClient();

export const getOrdersWithProducts = async () =>{
    const {data,error} = await(await supabase).from('orders').select("*,order_items:order_item(*,product(*)),user(*)").order('created_at',{ascending: false})

    if(error){
      throw new Error(error.message);
    }

    return data;
}

export const updateOrderStatus = async(orderId: number,status:string) => {
    const {error} = await(await supabase).from('orders').update({status}).eq('id',orderId)
    if(error) throw new Error(error.message)
    const {data:{session}}  = await(await supabase).auth.getSession();
    const userId = session?.user.id!;
    await sendNotification(userId,status + ' 🚀')
    revalidatePath('/admin/orders')

}