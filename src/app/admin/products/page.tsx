import { getCategoriesWithProducts } from '@/actions/categories'
import React from 'react'
import {ProductPageComponent} from '@/app/admin/products/page-component'
import { getProductsWithCategories } from '@/actions/products';
const Products = async() => {

    const categories = await getCategoriesWithProducts();
    const productWithCategories = await getProductsWithCategories();
    // console.log(productWithCategories,"product With -categories");
    
  return <ProductPageComponent categories={categories} productsWithCategories={productWithCategories}/>
}

export default Products