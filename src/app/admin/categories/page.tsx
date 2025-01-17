import { getCategoriesWithProducts } from '@/actions/categories'
import React from 'react'
import CategoryPageComponent from "@/app/admin/categories/CategoryPageComponent";


const Categories = async() => {
    // Fetch Categories
    const categories = await getCategoriesWithProducts()
    console.log(categories,"cat");
    
  return <CategoryPageComponent categories={categories}/>
}

export default Categories