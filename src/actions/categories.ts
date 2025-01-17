'use server'
import { CategoriesWithProductsResponse } from "@/app/admin/categories/categories.types";
import { CreateCategorySchema, CreateCategorySchemaServer, UpdateCategorySchema } from "@/app/admin/categories/create-category.schema";
import { createClient } from "@/supabase/server";
import slugify from "slugify"
const supabase = createClient();


export const getCategoriesWithProducts = async (): Promise<CategoriesWithProductsResponse> => {
    const {error,data} = await(await supabase).from('category').select("*,products: product(*)")
    .returns<CategoriesWithProductsResponse>();

    if(error){
        throw new Error(`Error fetching categories: ${error}`)
    }
    return data || []
}

export const imageUploadHandler = async(FormData: FormData) => {
    if(!FormData) return;

    const fileEntry = FormData.get('file')

    if(!(fileEntry instanceof File)) throw new Error("Expected a file")

    const fileName = fileEntry.name;


    try {
        const {data,error} = await(await supabase).storage.from('app-images').upload(fileName,fileEntry,{
            cacheControl: '3600',
            upsert:false
        });

        if(error){
            console.log('Error uploading iamge: ', error);
            throw new Error("Error uploading image")
        }
        const {data: {publicUrl}} = await (await supabase).storage.from('app-images').getPublicUrl(data.path)

        return publicUrl;
    } catch (error) {
        console.log('Error uploading iamge: ', error);
        throw new Error("Error uploading image")
        
    }
}



export const createCategory = async({imageUrl,name}: CreateCategorySchemaServer) =>{
        const slug = slugify(name,{lower:true})

        const {data,error} = await(await supabase).from('category').insert({
            name,
            imageUrl,
            slug
        })

        if(error){
            console.log('Error creating category: ', error);
        throw new Error("Error creating category")
        }

        return data;
}


export const updateCategory = async ({
    imageUrl,
    name,
    slug,
  }: UpdateCategorySchema) => {
    console.log(slug,"name");
    
    const supabase = createClient();
    const { data, error } =  await(await supabase).from('category').update({ name, imageUrl }).match({ slug });
  
    if (error) throw new Error(`Error updating category: ${error.message}`);
  
    // revalidatePath('/admin/categories');
  
    return data;
  };

export const deleteCategory = async(id:number) => {
    const {error} = await(await supabase).from('category').delete().match({id});

    if(error){
        console.log('Error deleting category: ', error);
    throw new Error("Error deleting category")
    }
}