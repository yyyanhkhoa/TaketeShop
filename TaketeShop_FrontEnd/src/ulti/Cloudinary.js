import RNFS from 'react-native-fs';

export const uploadImagesToCloudinary = (photos) => {
  const images = [];

//   const upload = async () => {
//     for (const photo of photos) {
//       const data = new FormData();

//       await RNFS.readFile(photo.path, 'base64').then(uri => {
//         data.append('file', uri);
//         data.append('upload_preset', 'TaketeShop');
//         data.append('cloud_name', 'taketeshop');
//         fetch('https://api.cloudinary.com/v1_1/italyqb/image/upload', {
//           method: 'POST',
//           body: data,
//           headers: {
//             Accept: 'application/json',
//             'Content-Type': 'multipart/form-data',
//           },
//         })
//           .then(res => res.json())
//           .then(data => {
//             images.push(data.url);
//             console.log(data);
//           })
//           .catch(err => {
//             console.log(err);
//           });
//       });
//     }
//   };

//   await upload();
  return images;
};
