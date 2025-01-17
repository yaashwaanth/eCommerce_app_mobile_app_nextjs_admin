import { createClient } from "@/supabase/server";
import { QueryData } from "@supabase/supabase-js";

const supabase = createClient();

const ordersWithProductsQuery = supabase.from('orders').select('*, order_items:order_item(*, product(*)), user(*)')
  .order('created_at', { ascending: false });


  export type OrdersWithProducts = QueryData<typeof ordersWithProductsQuery>