// 1.리엑트를 시작한다.
import React from "react";

// 2. 필요한 컴포넌트를 리엑트네이티브에서 가져온다.
import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

// 3.컴포넌트를 사용한다. (class)
class CommonBtn extends React.Component {
  //App.js에서 호출할 때, props를 전달해줄 것을 예상하고 미리 받는 로직을 작성해준다.
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.txt}>{this.props.children}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0a3d62",
    width: width / 3,
    height: 30,
    borderRadius: 10
  },
  txt: { color: "#fff" }
});

// 4. 외부에서 사용할 수 있도록 export한다.
export default CommonBtn;
