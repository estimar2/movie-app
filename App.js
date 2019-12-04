import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from "react-native";
import CommonBtn from "./components/CommonBtn";
import { movies } from "./api/movies";
import MovieContainer from "./components/MovieContainer";

class App extends React.Component {
  //state : 변경되면 화면을 재시작 한다.
  state = {
    viewPopular: null,
    viewNowPlaying: null,
    popularBtn: false,
    nowPlayingBtn: false,
    loading: false
  };

  //componentDidMount는 render()후 자동으로 실행되는 function
  //async 는 await랑 짝궁
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
      nowPlaying = nowPlaying.data.results;

      this.setState({
        viewPopular: popular,
        viewNowPlaying: nowPlaying,
        loading: true
      });
    }
  };

  //loading이 false면 -> 아무것도 하지마
  //.map를 사용하려면 .map다음 최상단 컴포넌트에게 key값이 있어야함

  // 버튼 누를는 것
  // onPress    === onClick -> 누르자마자 실행
  // onPressOut === After click -> 누르고 때면 실행

  //_clickPopularBtn()이면 즉시 실행되지만 없으면 action이 작동되어야 실행됨
  render() {
    const {
      viewPopular,
      viewNowPlaying,
      popularBtn,
      nowPlayingBtn,
      loading
    } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.btnArea}>
          <TouchableOpacity onPress={this._clickPopularBtn}>
            <Text>Popular Movie</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this._clickNowPlayingBtn}>
            <Text> NowPlaying Movie</Text>
          </TouchableOpacity>
          {/*runtime Error : 버그
          해결방법 : 1. redux :: state를 모든 js가 사용할 수 있게 만들어주는 기능
                              :: 사용하고 싶은 곳에서만 전역변수가 된다.
                    2. context:API :: state를 모든 js가 API처럼 사용할 수 있게 만드는 기능
          */}
        </View>

        <ScrollView>
          {popularBtn ? (
            loading ? (
              viewPopular.map(movie => (
                <MovieContainer
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  vote={movie.vote_average}
                  release={movie.release_date}
                  poster={movie.poster_path}
                />
              ))
            ) : (
              <Text>Loading ...</Text>
            )
          ) : null}

          {nowPlayingBtn ? (
            loading ? (
              viewNowPlaying.map(movie => (
                <MovieContainer
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  vote={movie.vote_average}
                  release={movie.release_date}
                  poster={movie.poster_path}
                />
              ))
            ) : (
              <Text>Loading ...</Text>
            )
          ) : null}
        </ScrollView>
      </View>
    );
  }

  _clickPopularBtn = () => {
    this.setState({
      popularBtn: true,
      nowPlayingBtn: false
    });
  };

  _clickNowPlayingBtn = () => {
    this.setState({
      nowPlayingBtn: true,
      popularBtn: false
    });
  };
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
    flexDirection: "row",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee"
  }
});

export default App;
