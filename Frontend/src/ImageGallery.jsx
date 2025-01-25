// import React, { useEffect } from 'react';
// import axios from 'axios';

// const ImageGallery = ({ query, counter, setCounter, page, setPage }) => {
//   const [photos, setPhotos] = React.useState([]);
//   const [pexelsPhotos, setPexelsPhotos] = React.useState([]);

//   const unsplashConfig = {
//     headers: {
//       Authorization: 'Client-ID QMm0cFjUe4-_ul5-M4hY2FqCWf2OcYKkcWTu7F0BLsM',
//     },
//     params: {
//       query: query,
//       per_page: 15,
//       page,
//     },
//   };

//   const pexelsConfig = {
//     headers: {
//       Authorization: 'RQnBtW9fGN1eXPMKAfIYko15tJqTpfd7G1w8Evef3Y4EQAE1vFPieo5L',
//     },
//     params: {
//       query: query,
//       per_page: 40,
//     },
//   };

//   const fetchImages = async () => {
//     try {
//       if (counter < 3) {
//         const response = await axios.get(
//           'https://api.unsplash.com/search/photos',
//           unsplashConfig
//         );
//         setPhotos((prevPhotos) => [...prevPhotos, ...response.data.results]);
//       } else if (counter < 6) {
//         const response = await axios.get(
//           'https://api.pexels.com/v1/search',
//           pexelsConfig
//         );
//         setPexelsPhotos(response.data.photos);
//       }
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   useEffect(() => {
//     fetchImages();
//   }, [page]);

//   const handleNext = () => {
//     setPage(page + 1);
//     setCounter(counter + 1);
//   };

//   return (
//     <div
//       style={{
//         display: 'grid',
//         gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
//         gap: '16px',
//         padding: '20px',
//         marginTop: '20px',
//       }}
//     >
//       {photos.map((photo) => (
//         <div
//           key={photo.id}
//           style={{
//             width: '100%',
//             borderRadius: '10px',
//             overflow: 'hidden',
//             boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//           }}
//         >
//           <img
//             src={photo.urls.raw}
//             alt={photo.alt_description}
//             style={{
//               width: '100%',
//               height: '200px',
//               objectFit: 'cover',
//               borderRadius: '10px',
//             }}
//           />
//         </div>
//       ))}
//       {pexelsPhotos.map((photo) => (
//         <div
//           key={photo.id}
//           style={{
//             width: '100%',
//             borderRadius: '10px',
//             overflow: 'hidden',
//             boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//           }}
//         >
//           <img
//             src={photo.src.original}
//             alt={photo.alt}
//             style={{
//               width: '100%',
//               height: '200px',
//               objectFit: 'cover',
//               borderRadius: '10px',
//             }}
//           />
//         </div>
//       ))}
//       <button
//         onClick={handleNext}
//         style={{
//           marginTop: '20px',
//           padding: '10px 20px',
//           borderRadius: '5px',
//           backgroundColor: '#000',
//           color: '#fff',
//           border: 'none',
//           cursor: 'pointer',
//         }}
//       >
//         Load Next Page
//       </button>
//     </div>
//   );
// };

// export default ImageGallery;
