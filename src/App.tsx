import "./App.scss";
import Header from "./components/header";
import TrendingTags from "./components/trendingTags";
import PostContainer from "./components/posts";
import AddPostButton from "./components/addPostButton";

function App() {
  return (
    <div className="App">
      <Header />
      <PostContainer />
      <TrendingTags />
      <AddPostButton />
    </div>
  );
}

export default App;
