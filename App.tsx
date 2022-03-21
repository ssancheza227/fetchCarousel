/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {useState, useEffect} from 'react';
 import {
   Image,
   StyleSheet,
   View,
   FlatList,
   Dimensions,
   Platform
 } from 'react-native';
 
 const {width, height} = Dimensions.get('screen');
 const imageWidth = width * 0.8;
 const imageHeight = height * 0.7;
 const isAndroid = Platform.OS === 'android';
 
 const App = () => {
   const [images, setImages] = useState([]);
 
   const getImages = async () => {
     try {
       const response = await fetch(
         'https://api.nasa.gov/mars-photos/api/v1/rovers/Opportunity/photos?sol=10R&page=1&api_key=g1UcSIDFCRvIF3kaTdJwpHHbYQpWfV1MnM8ag0vs',
       );
       const data = await response.json();
       setImages(data.photos);
     } catch {
       console.log('Error in fetch');
     }
   };
 
   useEffect(() => {
     getImages();
   }, []);
 
   return (
       <FlatList
         data={images}
         extraData={(item:any, index:number) => index.toString()}
         horizontal
         pagingEnabled
         renderItem={({item}:any) =>
           <View style={styles.itemContainer}>
             <Image source={{uri: isAndroid ? item.img_src : item.img_src.replace('http','https')}} style={styles.itemImg}/>
           </View>          
         }
       />
   );
 };
 
 const styles = StyleSheet.create({
   itemContainer: {
     width: width,
     justifyContent: 'center',
     alignItems: 'center'
   },
   itemImg: {
     width: imageWidth,
     height: imageHeight,
     resizeMode: 'cover',
     borderRadius: 20
   }
 });
 
 export default App;
