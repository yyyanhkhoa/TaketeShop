// const SQLpool = require("../../database/connectSQL");

// const updateRecommenderDatabase = () => {};

// const getProductsWithRating = () => {
//   let command = "";
//   let utilityMatrix = [];
//   let products = [];
//   let users = [];
//   let tempArr;
//   try {
//     SQLpool.getConnection(async (err, connection) => {
//       if (err) throw err;
//       //get ProductID, UserID and Rating
//       // command = "SELECT Product.id, GROUP_CONCAT(Comment.user_id) as user_id FROM Product LEFT JOIN Comment ON Product.id = Comment.product_id GROUP BY Product.id;";
//       command = `SELECT Comment.user_id, GROUP_CONCAT(CONCAT(Product.id," "), CONCAT(Comment.rating)) as products FROM Product LEFT JOIN Comment ON Product.id = Comment.product_id GROUP BY Comment.user_id;`;
//       await connection.query(command, (error, result) => {
//         if (error) throw error;
//         users = result.map((item) => {
//           return {
//             userID: item.user_id,
//             products: () => {
//               tempArr = item.products.split(",");
//               return tempArr.map((item) => {
//                 return { productID: item[0], rating: item[1] };
//               });
//             },
//           };
//         });
//       });
//       command = "Select Product.id from Product";
//       await connection.query(command, (error, result) => {
//         if (error) throw error;
//         products = result;
//       });
//       connection.release();
//     });

//   } catch (err) {
//     console.log(err);
//   }
// };

// // connection.query(command, (error, result) => {
// //     if (error) throw error
// // })
