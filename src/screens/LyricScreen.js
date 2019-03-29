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
    this.animation = new Animated.ValueXY({ x: 0, y: SCREEN_HEIGHT - 114 });
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        this.animation.extractOffset();
      },
      onPanResponderMove: (event, gestureState) => {
        this.animation.setValue({ x: 0, y: gestureState.dy });
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.moveY > SCREEN_HEIGHT - 114) {
          Animated.spring(this.animation.y, {
            toValue: 0,
            tension: 1
          }).start();
        } else if (gestureState.moveY < 114) {
          Animated.spring(this.animation.y, {
            toValue: 0,
            tension: 1
          }).start();
        } else if (gestureState.dy < 0) {
          Animated.timing(this.animation.y, {
            toValue: -SCREEN_HEIGHT + 114,
            tension: 9,
            duration:300
          }).start();
        } else if (gestureState.dy > 0) {
          Animated.timing(this.animation.y, {
            toValue: SCREEN_HEIGHT - 114,
            tension: 9,
            duration:300
          }).start();
        }
      }
    });
  }

  open = () => {
    Animated.timing(this.animation.y, {
        toValue: 0,
        tension: 9,
        duration:300
      }).start();
  };

  render() {
    const animatedHeight = {
      transform: this.animation.getTranslateTransform()
    };

    animatedImageHeight = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 114],
      outputRange: [200, 32],
      extrapolate: "clamp"
    });

    animatedTextOpacity = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 500, SCREEN_HEIGHT - 114],
      outputRange: [0, 0, 1],
      extrapolate: "clamp"
    });

    animatedImageMarginLeft = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 114],
      outputRange: [SCREEN_WIDTH / 2 - 100, 10],
      extrapolate: "clamp"
    });

    animatedHeaderHeight = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 114],
      outputRange: [SCREEN_HEIGHT / 2, 90],
      extrapolate: "clamp"
    })

    console.log(this.animation.y);
    return (
      <Animated.View style={{ flex: 1, backgroundColor: Colors.white }}>
      <Text onPress={()=>this.open()}>Hai</Text>
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[
            {
              position: "absolute",
              left: 0,
              right: 0,
              height: SCREEN_HEIGHT,
              backgroundColor: Colors.white,
              zIndex: 2,
              elevation: 10
            },
            animatedHeight
          ]}
        >
          <Animated.View
            style={{
              height: animatedHeaderHeight,
              borderTopWidth: 1,
              borderTopColor: Colors.lightGrey,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                flex: 4,
                alignItems: 'center',
              }}
            >
              <Animated.View
                style={{
                  width: animatedImageHeight,
                  height: animatedImageHeight,
                  marginLeft: animatedImageMarginLeft,
                  elevation:20,
                  backgroundColor: 'white',
                }}
              >
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
                  {
                    color: Colors.black,
                    paddingLeft: 10,
                    paddingTop: 3,
                    flex: 3,
                    opacity: animatedTextOpacity
                  }
                ]}
              >
                Rowdy BabyRowdy BabyRowdy BabyRowdy BabyRowdy Baby
              </Animated.Text>
              <Animated.View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-around",
                  paddingTop: 3,
                  opacity:animatedTextOpacity
                }}
              >
                <Ionicons
                  name="md-play"
                  style={{ fontSize: 24, color: Colors.black }}
                />
                <Ionicons
                  name="md-pause"
                  style={{ fontSize: 24, color: Colors.black }}
                />
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
