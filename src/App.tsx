import "./App.scss";
import Header from "./components/header";
import TrendingTags from "./components/trendingTags";
import PostContainer from "./components/posts";

function App() {
  return (
    <div className="App">
      <Header />
      <PostContainer/>
      <TrendingTags />
    </div>
  );
}

export default App;
