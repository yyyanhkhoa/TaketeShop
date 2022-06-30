import React from 'react';
import { View, Image, StyleSheet, document } from 'react-native'

function ImageShow() {

    const images = ["../../assets/images/logo1.png",
        "../../assets/images/logo2.png",
        "../../assets/images/logo3.png"];
    const [currentImage, setCurrentImage] = React.useState();

    const switchImage = () => {
        if (currentImage < images.length - 1) {
            setCurrentImage(currentImage + 1);
        } else {
            setCurrentImage(currentImage = 0);
        }
        return currentImage;
    }
    const componentDidMount = () => {
        setInterval(switchImage, 2000);
    }
    return (
        <Image style={styles.logo}
            src={images[currentImage]}
        //alt="cleaning images"                
        />

    );


}
const styles = StyleSheet.create({
    // imageContainer: {
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    logo: {
        width: 400,
        height: 320,
    },
});
//ReactDOM.render(<ImageShow />, document.getElementById("root"));


export default ImageShow;