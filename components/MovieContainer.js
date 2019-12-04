import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";

class MovieContainer extends React.Component {
  //props를 받을 준비를 하자
  constructor(props) {
    super(props);
  }

  render() {
    return (
      // 전달 데이터가 4개가 필요함
      <View key={this.props.id} style={styles.box}>
        <TouchableOpacity>
          {/* 길이가 20보다 크면 20 + ....
            아니면 그냥 title */}
          <Text style={styles.title}>{this.props.title}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.vote}>★{this.props.vote}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          {/* 배열을 이용하면 스타일을 여러가지 줄수있음 */}
          <Text style={[styles.release, styles.release2]}>
            {this.props.release}
          </Text>
        </TouchableOpacity>

        <Image
          style={{ width: 120, height: 180 }}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${this.props.poster}`
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    margin: 10,
    backgroundColor: "#dff9fb",
    borderRadius: 15,
    padding: 10
  },
  title: { fontWeight: "bold" },
  vote: {
    color: "grey"
  },
  release: { color: "red" },
  release2: { marginTop: 5 }
});

export default MovieContainer;
