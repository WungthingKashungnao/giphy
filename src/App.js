import { styled } from "styled-components";
import { useTheme } from "./context/themeContext";
import Header from "./components/Header";
import Button from "./components/Button";
import { useGlobal } from "./context/global";
import Trending from "./components/Trending";
import { useState } from "react";
import { render } from "@testing-library/react";
import Random from "./components/Random";

function App() {
  const theme = useTheme(); //accessing useTheme context
  const [rendered, setRendered] = useState("trending"); //state for categories fo giff's
  const { getRandom } = useGlobal();

  // fucntion to change between different categories of giff's
  const content = () => {
    switch (rendered) {
      case "trending":
        return <Trending />;
      case "liked":
        return <Trending />;
      case "random":
        return <Random />;
      case "search":
        return <Trending />;
      default:
        return <Trending />;
    }
  };

  return (
    <AppStyled theme={theme}>
      <Header />
      <div className="fetch-btns">
        <Button
          name={"Liked"}
          icon={<i className="fa-solid fa-heart"></i>}
          onClick={() => setRendered("liked")}
        />
        <Button
          name={"Trending Gifs"}
          icon={<i className="fa-solid fa-arrow-trend-up"></i>}
          onClick={() => setRendered("trending")}
        />
        <Button
          name={"Random Gif"}
          icon={<i className="fa-solid fa-shuffle"></i>}
          onClick={() => {
            setRendered("random");
            getRandom();
          }}
        />
      </div>
      <main>{content()}</main>
    </AppStyled>
  );
}

export default App;
const AppStyled = styled.div`
  min-height: 100vh;
  background-color: ${(props) =>
    props.theme.colorBg1}; //accsessing value passded as props

  .fetch-btns {
    display: flex;
    justify-content: center;
    gap: 4rem;
    margin-top: 4rem;
    margin-bottom: 2rem;
  }
  main {
    padding: 2rem 8rem;
  }
`;
