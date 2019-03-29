import React, { Component } from "react";
import { View, Text, Animated, PanResponder, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

class Sample extends Component {
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

    return (
      <Animated.View>
        <Text onPress={() => this.open()}>press</Text>
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[
            {
              flex: 1,
              backgroundColor: "red",
              position: "absolute",
              left: 0,
              right: 0,
              height: SCREEN_HEIGHT
            },
            animatedHeight
          ]}
        >
          <View
            style={{
              height: 90,
              backgroundColor: "black"
            }}
          />
        </Animated.View>
      </Animated.View>
    );
  }
}
export default Sample;
