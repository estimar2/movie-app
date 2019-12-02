import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CommonBtn from "./components/CommonBtn";
import { movies } from "./api/movies";

class App extends React.Component {
  //state : 변경되면 화면을 재시작 한다.
  state = {
    viewPopular: null,
    loading: false
  };

  //componentDidMount는 render()후 자동으로 실행되는 function
  componentDidMount = async () => {
    //async - await :: await이 완료될 때까지 기다려!
    let popular, NowPlaying;

    //try : 실행해!
    //getPopular 를 할떄까지 기다려줘 => popular = await movies.getPopular();
    try {
      popular = await movies.getPopular();
      nowPlaying = await movies.getNowPlaying();
    } catch (error) {
      alert("영화 데이터를 가져오는데 실패!");
      console.log(error);
      //만약 에러가 나면 너가 잡아줘
    } finally {
      //정상 구동하든, 에러나든, 마지막에 나를 거쳐
      //loading이 true라면 앞에꺼 실행, 아니라면  뒤에꺼 실행
      popular = popular.data.results;

      this.setState({
        viewPopular: popular,
        loading: true
      });
    }
  };

  //loading이 false면 -> 아무것도 하지마
  //loading이 true로 바뀌면
  render() {
    const { viewPopular, loading } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.btnArea}>
          <CommonBtn>Popular Movie</CommonBtn>
          <CommonBtn>NowPlaying Movie</CommonBtn>
        </View>
        {loading ? (
          viewPopular.map(movie => <Text>{movie.title}</Text>)
        ) : (
          <Text>Loading ...</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 50
  },
  btnArea: {
    flexDirection: "row"
  }
});

export default App;
