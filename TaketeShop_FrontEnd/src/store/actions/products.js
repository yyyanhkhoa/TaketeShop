import ImageModel from '../../models/image/imageModel';
import CategoryModel from '../../models/product/CategoryModels';
import ProductItemsModel from '../../models/product/ProductItemsModel';
import ProductModel from '../../models/product/ProductModel';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const UPDATE_FAV_PRODUCT = 'UPDATE_FAV_PRODUCT';
export const SET_CURRENT_PRODUCTS = 'SET_CURRENT_PRODUCTS';
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SET_PRODUCTS_WITH_SEARCHKEY = 'SET_PRODUCTS_WITH_SEARCHKEY';
export const UPDATE_PRODUCTS = 'UPDATE_PRODUCTS';
export const PAGING_PRODUCTS = 'PAGING_PRODUCTS';
export const PAGING_WISHLIST_PRODUCTS = 'PAGING_WISHLIST_PRODUCTS';
export const PAGING_DISCOUNT_PRODUCTS = 'PAGING_DISCOUNT_PRODUCTS';
export const PAGING_BEST_SELLER_PRODUCTS = 'PAGING_BEST_SELLER_PRODUCTS';
export const PAGING_RECOMMENDER_PRODUCTS = 'PAGING_RECOMMENDER_PRODUCTS';
export const SET_DISCOUNT_PRODUCTS = 'SET_DISCOUNT_PRODUCTS';
export const SET_WISHLIST_PRODUCTS = 'SET_WISHLIST_PRODUCTS';
export const SET_BEST_SELLER_PRODUCTS = 'SET_BEST_SELLER_PRODUCTS';
export const SET_RECOMMENDER_PRODUCTS = 'SET_RECOMMENDER_PRODUCTS';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const UPDATE_PAGE = 'UPDATE_PAGE';
export const SET_UNIT = 'SET_UNIT';

export const fetchProducts = ({field, value, filter, sort, page}) => {
  return async dispatch => {
    try {
      const fieldConvert = field ? `field=${field}&` : '';
      const valueConvert = value ? `value=${value}&` : '';
      const filterConvert = filter ? `filter=${filter}&` : '';
      const sortConvert = sort ? `sort=${sort}&` : '';
      const pageConvert = page ? `page=${page}&` : '';

      const response = await fetch(
        'http://localhost:5000/product/all?' +
          fieldConvert +
          valueConvert +
          filterConvert +
          sortConvert +
          pageConvert,
      );

      if (response.error) {
        throw new Error(response.msg);
      }

      const resData = await response.json();
      const loadedProducts = [];

      for (const key in resData) {
        const images = [];
        if (!resData[key].images) {
          images.push(
            new ImageModel(
              -1,
              'https://vanhoadoanhnghiepvn.vn/wp-content/uploads/2020/08/112815953-stock-vector-no-image-available-icon-flat-vector.jpg',
            ),
          );
        } else {
          const arrImage = resData[key].images.split(',');
          for (const image in arrImage) {
            const tempImage = arrImage[image].split(' ');
            images.push(new ImageModel(tempImage[0], tempImage[1]));
          }
        }

        loadedProducts.push(
          new ProductModel({
            productID: resData[key].id,
            categoryID: resData[key].category_id,
            unitID: resData[key].unit_id,
            userID: resData[key].user_id,
            name: resData[key].name,
            category: resData[key].category_name,
            description: resData[key].descriptions,
            price: resData[key].price,
            quantity: resData[key].quantity,
            unit: resData[key].unit,
            discount: resData[key].discount,
            sold: resData[key].sold,
            image: images,
            createTime: resData[key].create_time,
            updateTime: resData[key].update_time,
          }),
        );
      }
      dispatch({type: SET_PRODUCTS, products: loadedProducts});
    } catch (err) {
      // send to custom analytics server
      console.log(err);
      throw err;
    }
  };
};
export const fetchProductWithBannerID = bannerID => {
  return async dispatch => {
    try {
      const response = await fetch(
        'http://localhost:5000/product/productlist/banner/' + bannerID,
      );
      if (response.error) {
        throw new Error(response.msg);
      }
      const resData = await response.json();
      const loadedProducts = [];
      for (const key in resData) {
        const images = [];
        if (!resData[key].images) {
          images.push(
            new ImageModel(
              -1,
              'https://vanhoadoanhnghiepvn.vn/wp-content/uploads/2020/08/112815953-stock-vector-no-image-available-icon-flat-vector.jpg',
            ),
          );
        } else {
          const arrImage = resData[key].images.split(',');
          for (const image in arrImage) {
            const tempImage = arrImage[image].split(' ');
            images.push(new ImageModel(tempImage[0], tempImage[1]));
          }
        }
        loadedProducts.push(
          new ProductModel({
            productID: resData[key].id,
            categoryID: resData[key].category_id,
            unitID: resData[key].unit_id,
            userID: resData[key].user_id,
            name: resData[key].name,
            category: resData[key].category_name,
            description: resData[key].descriptions,
            price: resData[key].price,
            quantity: resData[key].quantity,
            unit: resData[key].unit,
            discount: resData[key].discount,
            sold: resData[key].sold,
            image: images,
            createTime: resData[key].create_time,
            updateTime: resData[key].update_time,
          }),
        );
      }
      dispatch({type: SET_PRODUCTS, products: loadedProducts});
    } catch (err) {
      // send to custom analytics server
      console.log(err);
      throw err;
    }
  };
};
export const fetchWishListProducts = ({userID, page}) => {
  const pageConvert = page ? `page=${page}&` : '';
  return async dispatch => {
    try {
      const response = await fetch(
        `http://localhost:5000/wishlist/user/${userID}?${pageConvert}`,
      );

      if (response.error) {
        throw new Error(response.msg);
      }

      const resData = await response.json();
      const loadedProducts = [];

      for (const key in resData) {
        const images = [];
        if (!resData[key].images) {
          images.push(
            new ImageModel(
              -1,
              'https://vanhoadoanhnghiepvn.vn/wp-content/uploads/2020/08/112815953-stock-vector-no-image-available-icon-flat-vector.jpg',
            ),
          );
        } else {
          const arrImage = resData[key].images.split(',');
          for (const image in arrImage) {
            const tempImage = arrImage[image].split(' ');
            images.push(new ImageModel(tempImage[0], tempImage[1]));
          }
        }

        loadedProducts.push(
          new ProductItemsModel({
            productID: resData[key].id,
            categoryID: resData[key].category_id,
            name: resData[key].name,
            unit: resData[key].unit,
            category: resData[key].category_name,
            description: resData[key].descriptions,
            price: resData[key].price,
            quantity: resData[key].quantity,
            discount: resData[key].discount,
            image: images[0].image,
          }),
        );
      }
      dispatch({type: SET_WISHLIST_PRODUCTS, products: loadedProducts});
    } catch (err) {
      // send to custom analytics server
      console.log(err);
      throw err;
    }
  };
};
export const fetchDiscountProducts = ({page}) => {
  const pageConvert = page ? `page=${page}&` : '';
  return async dispatch => {
    try {
      const response = await fetch(
        'http://localhost:5000/product/all?filter=discount&sort=DESC&' +
          pageConvert,
      );

      if (response.error) {
        throw new Error(response.msg);
      }

      const resData = await response.json();
      const loadedProducts = [];

      for (const key in resData) {
        const images = [];
        if (!resData[key].images) {
          images.push(
            new ImageModel(
              -1,
              'https://vanhoadoanhnghiepvn.vn/wp-content/uploads/2020/08/112815953-stock-vector-no-image-available-icon-flat-vector.jpg',
            ),
          );
        } else {
          const arrImage = resData[key].images.split(',');
          for (const image in arrImage) {
            const tempImage = arrImage[image].split(' ');
            images.push(new ImageModel(tempImage[0], tempImage[1]));
          }
        }
        loadedProducts.push(
          new ProductModel({
            productID: resData[key].id,
            categoryID: resData[key].category_id,
            unitID: resData[key].unit_id,
            userID: resData[key].user_id,
            name: resData[key].name,
            category: resData[key].category_name,
            description: resData[key].descriptions,
            price: resData[key].price,
            quantity: resData[key].quantity,
            unit: resData[key].unit,
            discount: resData[key].discount,
            sold: resData[key].sold,
            image: images,
            createTime: resData[key].create_time,
            updateTime: resData[key].update_time,
          }),
        );
      }
      dispatch({type: SET_DISCOUNT_PRODUCTS, products: loadedProducts});
    } catch (err) {
      // send to custom analytics server
      console.log(err);
      throw err;
    }
  };
};
export const fetchBestSellerProducts = ({page}) => {
  const pageConvert = page ? `page=${page}&` : '';

  return async dispatch => {
    try {
      const response = await fetch(
        'http://localhost:5000/product/all?filter=sold&sort=DESC&' +
          pageConvert,
      );

      if (response.error) {
        throw new Error(response.msg);
      }

      const resData = await response.json();
      const loadedProducts = [];

      for (const key in resData) {
        const images = [];
        if (!resData[key].images) {
          images.push(
            new ImageModel(
              -1,
              'https://vanhoadoanhnghiepvn.vn/wp-content/uploads/2020/08/112815953-stock-vector-no-image-available-icon-flat-vector.jpg',
            ),
          );
        } else {
          const arrImage = resData[key].images.split(',');
          for (const image in arrImage) {
            const tempImage = arrImage[image].split(' ');
            images.push(new ImageModel(tempImage[0], tempImage[1]));
          }
        }

        loadedProducts.push(
          new ProductModel({
            productID: resData[key].id,
            categoryID: resData[key].category_id,
            unitID: resData[key].unit_id,
            userID: resData[key].user_id,
            name: resData[key].name,
            category: resData[key].category_name,
            description: resData[key].descriptions,
            price: resData[key].price,
            quantity: resData[key].quantity,
            unit: resData[key].unit,
            discount: resData[key].discount,
            sold: resData[key].sold,
            image: images,
            createTime: resData[key].create_time,
            updateTime: resData[key].update_time,
          }),
        );
      }
      dispatch({type: SET_BEST_SELLER_PRODUCTS, products: loadedProducts});
    } catch (err) {
      // send to custom analytics server
      console.log(err);
      throw err;
    }
  };
};
export const fetchRecommenderProducts = id => {
  return async dispatch => {
    try {
      const response = await fetch(
        'http://localhost:5000/product/recommender/' + id,
      );

      if (response.error) {
        throw new Error(response.msg);
      }

      const resData = await response.json();
      const loadedProducts = [];

      for (const key in resData) {
        console.log(resData[key].id);
        const images = [];
        if (!resData[key].images) {
          images.push(
            new ImageModel(
              -1,
              'https://vanhoadoanhnghiepvn.vn/wp-content/uploads/2020/08/112815953-stock-vector-no-image-available-icon-flat-vector.jpg',
            ),
          );
        } else {
          const arrImage = resData[key].images.split(',');
          for (const image in arrImage) {
            const tempImage = arrImage[image].split(' ');
            images.push(new ImageModel(tempImage[0], tempImage[1]));
          }
        }

        loadedProducts.push(
          new ProductModel({
            productID: resData[key].id,
            categoryID: resData[key].category_id,
            unitID: resData[key].unit_id,
            userID: resData[key].user_id,
            name: resData[key].name,
            category: resData[key].category_name,
            description: resData[key].descriptions,
            price: resData[key].price,
            quantity: resData[key].quantity,
            unit: resData[key].unit,
            discount: resData[key].discount,
            sold: resData[key].sold,
            image: images,
            createTime: resData[key].create_time,
            updateTime: resData[key].update_time,
          }),
        );
      }

      dispatch({type: SET_RECOMMENDER_PRODUCTS, products: loadedProducts});
    } catch (err) {
      // send to custom analytics server
      console.log(err);
      throw err;
    }
  };
};
export const fetchCategory = () => {
  return async dispatch => {
    // any async code you want!
    try {
      const response = await fetch('http://localhost:5000/category/all');

      if (response.error) {
        throw new Error(response.msg);
      }

      const resData = await response.json();
      const loadedProducts = [];

      for (const key in resData) {
        loadedProducts.push(
          new CategoryModel(
            resData[key].id,
            resData[key].name,
            resData[key].discount,
            resData[key].image,
            resData[key].create_time,
            resData[key].update_time,
          ),
        );
      }

      dispatch({type: SET_CATEGORIES, categories: loadedProducts});
    } catch (err) {
      // send to custom analytics server
      console.log(err);
      throw err;
    }
  };
};
export const fetchProductsWithCategoryID = ({value, filter, sort, page}) => {
  return async dispatch => {
    try {
      const valueConvert = value ? `value=${value}&` : '';
      const filterConvert = filter ? `filter=${filter}&` : '';
      const sortConvert = sort ? `sort=${sort}&` : '';
      const pageConvert = page ? `page=${page}&` : '';

      const response = await fetch(
        'http://localhost:5000/product/productlist?' +
          valueConvert +
          filterConvert +
          sortConvert +
          pageConvert,
      );
      if (response.error) {
        throw new Error(response.msg);
      }

      const resData = await response.json();
      const loadedProducts = [];

      for (const key in resData) {
        const images = [];
        if (!resData[key].images) {
          images.push(
            new ImageModel(
              -1,
              'https://vanhoadoanhnghiepvn.vn/wp-content/uploads/2020/08/112815953-stock-vector-no-image-available-icon-flat-vector.jpg',
            ),
          );
        } else {
          const arrImage = resData[key].images.split(',');
          for (const image in arrImage) {
            const tempImage = arrImage[image].split(' ');
            images.push(new ImageModel(tempImage[0], tempImage[1]));
          }
        }
        loadedProducts.push(
          new ProductModel({
            productID: resData[key].id,
            categoryID: resData[key].category_id,
            unitID: resData[key].unit_id,
            userID: resData[key].user_id,
            name: resData[key].name,
            category: resData[key].category_name,
            description: resData[key].descriptions,
            price: resData[key].price,
            quantity: resData[key].quantity,
            unit: resData[key].unit,
            discount: resData[key].discount,
            sold: resData[key].sold,
            image: images,
            createTime: resData[key].create_time,
            updateTime: resData[key].update_time,
          }),
        );
      }
      dispatch({type: SET_PRODUCTS, products: loadedProducts});
    } catch (err) {
      // send to custom analytics server
      console.log(err);
      throw err;
    }
  };
};
export const updateProductsWithCategoryID = ({value, filter, sort, page}) => {
  return async dispatch => {
    try {
      const valueConvert = value ? `value=${value}&` : '';
      const filterConvert = filter ? `filter=${filter}&` : '';
      const sortConvert = sort ? `sort=${sort}&` : '';
      const pageConvert = page ? `page=${page}&` : '';

      const response = await fetch(
        'http://localhost:5000/product/productlist?' +
          valueConvert +
          filterConvert +
          sortConvert +
          pageConvert,
      );
      if (response.error) {
        throw new Error(response.msg);
      }

      const resData = await response.json();
      const loadedProducts = [];

      for (const key in resData) {
        const images = [];
        if (!resData[key].images) {
          images.push(
            new ImageModel(
              -1,
              'https://vanhoadoanhnghiepvn.vn/wp-content/uploads/2020/08/112815953-stock-vector-no-image-available-icon-flat-vector.jpg',
            ),
          );
        } else {
          const arrImage = resData[key].images.split(',');
          for (const image in arrImage) {
            const tempImage = arrImage[image].split(' ');
            images.push(new ImageModel(tempImage[0], tempImage[1]));
          }
        }
        loadedProducts.push(
          new ProductModel({
            productID: resData[key].id,
            categoryID: resData[key].category_id,
            unitID: resData[key].unit_id,
            userID: resData[key].user_id,
            name: resData[key].name,
            category: resData[key].category_name,
            description: resData[key].descriptions,
            price: resData[key].price,
            quantity: resData[key].quantity,
            unit: resData[key].unit,
            discount: resData[key].discount,
            sold: resData[key].sold,
            image: images,
            createTime: resData[key].create_time,
            updateTime: resData[key].update_time,
          }),
        );
      }
      if (loadedProducts.length) {
        const arr = [];
        loadedProducts.map(item => arr.push(item.productID));
        console.log(arr);
        dispatch({type: UPDATE_PRODUCTS, products: loadedProducts});
      } else updatePage(page - 1);
    } catch (err) {
      // send to custom analytics server
      console.log(err);
      throw err;
    }
  };
};
export const fetchProductsWithSearchKeyWords = ({
  value,
  filter,
  sort,
  page,
}) => {
  return async dispatch => {
    try {
      const valueConvert = value ? `value=${value}&` : '';
      const filterConvert = filter ? `filter=${filter}&` : '';
      const sortConvert = sort ? `sort=${sort}&` : '';
      const pageConvert = page ? `page=${page}&` : '';
      const response = await fetch(
        'http://localhost:5000/product/search?' +
          valueConvert +
          filterConvert +
          sortConvert +
          pageConvert,
      );
      if (response.error) {
        throw new Error(response.msg);
      }

      const resData = await response.json();
      const loadedProducts = [];

      for (const key in resData) {
        const images = [];
        if (!resData[key].images) {
          images.push(
            new ImageModel(
              -1,
              'https://vanhoadoanhnghiepvn.vn/wp-content/uploads/2020/08/112815953-stock-vector-no-image-available-icon-flat-vector.jpg',
            ),
          );
        } else {
          const arrImage = resData[key].images.split(',');
          for (const image in arrImage) {
            const tempImage = arrImage[image].split(' ');
            images.push(new ImageModel(tempImage[0], tempImage[1]));
          }
        }
        loadedProducts.push(
          new ProductModel({
            productID: resData[key].id,
            categoryID: resData[key].category_id,
            unitID: resData[key].unit_id,
            userID: resData[key].user_id,
            name: resData[key].name,
            category: resData[key].category_name,
            description: resData[key].descriptions,
            price: resData[key].price,
            quantity: resData[key].quantity,
            unit: resData[key].unit,
            discount: resData[key].discount,
            sold: resData[key].sold,
            image: images,
            createTime: resData[key].create_time,
            updateTime: resData[key].update_time,
          }),
        );
      }
      dispatch({type: SET_PRODUCTS_WITH_SEARCHKEY, products: loadedProducts});
    } catch (err) {
      // send to custom analytics server
      console.log(err);
      throw err;
    }
  };
};
export const fetchProductDetail = id => {
  return async dispatch => {
    try {
      const response = await fetch(`http://localhost:5000/product/${id}`);
      if (response.error) {
        throw new Error(response.msg);
      }
      const resData = await response.json();
      //Convert Res.images into array
      const images = [];
      const arrImage = resData[0].images.split(',');
      for (const image in arrImage) {
        const tempImage = arrImage[image].split(' ');
        images.push(new ImageModel(tempImage[0], tempImage[1]));
      }
      const product = new ProductModel({
        productID: resData[0].id,
        categoryID: resData[0].category_id,
        unitID: resData[0].unit_id,
        userID: resData[0].user_id,
        name: resData[0].name,
        category: resData[0].category_name,
        description: resData[0].descriptions,
        price: resData[0].price,
        quantity: resData[0].quantity,
        unit: resData[0].unit,
        discount: resData[0].discount,
        sold: resData[0].sold,
        image: images,
        createTime: resData[0].create_time,
        updateTime: resData[0].update_time,
      });

      dispatch({type: SET_CURRENT_PRODUCTS, product: product});
    } catch (error) {
      console.log(err);
      throw err;
    }
  };
};
export const updateFavProduct = ({userID, token, productID, liked}) => {
  return async dispatch => {
    const productIDConvert = productID ? `productID=${userID}&` : '';
    const userIDConvert = userID ? `userID=${userID}&` : '';
    console.log(liked);
    try {
      if (liked) {
        await fetch(
          `http://localhost:5000/wishlist/item?${userIDConvert}${productIDConvert}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              authorization: 'Bearer ' + token,
            },
            // }).then(() => console.log('Delete from Wishlist'));
          },
        );
        dispatch({type: UPDATE_FAV_PRODUCT});
      } else {
        await fetch(`http://localhost:5000/wishlist/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + token,
          },
          body: JSON.stringify({
            userID: userID,
            productID: productID,
          }),
        }).then(() => console.log('Add to Wishlist'));
        dispatch({type: UPDATE_FAV_PRODUCT});
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};
export const fetchUnit = () => {
  return async dispatch => {
    try {
      const response = await fetch(`http://localhost:5000/product/unit`);
      if (response.error) {
        throw new Error(response.msg);
      }
      const resData = await response.json();
      const loadedUnits = [];

      for (const key in resData) {
        loadedUnits.push({
          id: resData[key].id,
          name: resData[key].name,
        });
      }

      dispatch({type: SET_UNIT, units: loadedUnits});
    } catch (error) {
      console.log(err);
      throw err;
    }
  };
};

export const createProduct = ({
  token,
  categoryID,
  userID,
  name,
  descriptions,
  price,
  quantity,
  discount,
  unitID,
}) => {
  return async dispatch => {
    // any async code you want!
    try {
      await fetch('http://localhost:5000/product/addWthImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({
          name: name,
          descriptions: descriptions,
          price: price,
          quantity: quantity,
          unitID: unitID,
          discount: discount,
          categoryID: categoryID,
          userID: userID,
        }),
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};
export const updateProductByProductID = ({
  token,
  productID,
  categoryID,
  userID,
  name,
  descriptions,
  price,
  quantity,
  unitID,
  discount,
}) => {
  return async dispatch => {
    try {
      await fetch(`http://localhost:5000/product/update/${productID}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({
          categoryID: categoryID,
          userID: userID,
          name: name,
          descriptions: descriptions,
          price: price,
          quantity: quantity,
          unitID: unitID,
          discount: discount,
        }),
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};
export const updatePage = page => {
  return async dispatch => {
    dispatch({type: UPDATE_PAGE, page: page});
  };
};
