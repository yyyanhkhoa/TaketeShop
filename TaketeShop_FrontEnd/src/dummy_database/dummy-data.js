import BannerModel from "../models/banner/BannerModel";
import ProductItemsModel from "../models/product/ProductItemsModel";
import ProductModel from '../models/product/ProductModel'

export const IMAGE_TEMP=[
  'https://images.unsplash.com/photo-1609109238958-eb5130c99873?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  'https://myfoodbook.com.au/sites/default/files/styles/car_na/public/recipe_photo/Easy_As_Aussie_Seafood_Platter_vert%20copy.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Plateau_van_zeevruchten.jpg/300px-Plateau_van_zeevruchten.jpg',
  'https://www.gettyimages.pt/gi-resources/images/Homepage/Hero/PT/PT_hero_42_153645159.jpg',
]

export const NO_IMAGE = 'https://res.cloudinary.com/taketeshop/image/upload/v1653878104/TaketeShop/Default_Images/istockphoto-1216251206-170667a_i3yvem.jpg';

export const DEFAULT_PRODUCT = {
  productID: 0,
  categoryID: 0,
  unitID: 0,
  userID: 0,
  name: 'Lỗi sản phẩm',
  category: 'Lỗi ngành hàng',
  description: 'Lỗi đánh giá sản phẩm',
  price: 99999,
  quantity: 100,
  unit: 0,
  discount: 0,
  liked: false,
  sold: 0,
  image: [NO_IMAGE],
  createTime: new Date(),
  updateTime: new Date(),
}