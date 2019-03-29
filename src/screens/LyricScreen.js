import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  Animated,
  Slider,
  PanResponder,
  Dimensions,
  StyleSheet,
  Image
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { Colors, textStyles } from "../assets/styles";
import Images from "../assets/images/images";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

class LyricScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.animation = new Animated.ValueXY({ x: 0, y: SCREEN_HEIGHT - 80 });
  }

  render() {
    const animatedHeight = {
      transform: this.animation.getTranslateTransform()
    };

    return (
      <Animated.View style={{ flex: 1, backgroundColor: Colors.themeRed }}>
        <Animated.View
          style={[
            {
              position: "absolute",
              left: 0,
              right: 0,
              height: SCREEN_HEIGHT,
              backgroundColor: Colors.white,
              zIndex: 2
            },
            animatedHeight
          ]}
        >
          <Animated.View
            style={{
              height: 100,
              borderTopWidth: 1,
              borderTopColor: Colors.themeBlue,
              flexDirection: "row"
            }}
          >
            <View
              style={{
                flexDirection: "row",
                flex: 4,
                paddingVertical: 10
              }}
            >
              <Animated.View style={{ width: 32, height: 32, marginLeft: 10 }}>
                <Image
                  source={Images.gym}
                  style={{ flex: 1, width: null, height: null }}
                  resizeMode="cover"
                />
              </Animated.View>
              <Animated.Text
                numberOfLines={1}
                style={[
                  textStyles.textMedium,
                  { color: Colors.black, paddingLeft: 10, paddingTop: 3, flex:3 }
                ]}
              >
                Rowdy BabyRowdy BabyRowdy BabyRowdy BabyRowdy Baby
              </Animated.Text>
              <Animated.View style={{flex:1, flexDirection:'row',justifyContent: 'space-around',paddingTop: 3}}>
                <Ionicons name='md-play' style={{fontSize:24, color:Colors.black}}/>
                <Ionicons name='md-pause' style={{fontSize:24, color:Colors.black}}/>
              </Animated.View>
            </View>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    );
  }
}
export default LyricScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red"
  }
});
