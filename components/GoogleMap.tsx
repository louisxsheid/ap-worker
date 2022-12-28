// Display static google map from a map string (in San Diego)
// NOT IDEAL
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import MapView from 'react-native-maps';


const GoogleMap = ({ mapString }: any) => {

    // const iframeString = `<iframe
    // referrerPolicy="no-referrer-when-downgrade"
    // src={https://www.google.com/maps/embed/v1/place?key=AIzaSyDsE1smyGbgOiWFRivXxIOm04dqKqDeuhA&q=${mapString},San+Diego+California} allowFullScreen} />`
    
    return (
        <MapView provider='google'    initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}/>
    );
};
// style={{border:0, width: "100%", height: "100%", borderRadius: 10}}
const styles = StyleSheet.create({
    map: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
    }
});

export default GoogleMap;
