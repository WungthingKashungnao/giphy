import { styled } from "styled-components";
import { useTheme } from "./context/themeContext";
import Header from "./components/Header";
import Button from "./components/Button";
import { useGlobal } from "./context/global";
import Trending from "./components/Trending";

function App() {
  const theme = useTheme(); //accessing useTheme context

  return (
    <AppStyled theme={theme}>
      <Header />
      <div className="fetch-btns">
        <Button name={"Liked"} icon={<i className="fa-solid fa-heart"></i>} />
        <Button
          name={"Trending Gifs"}
          icon={<i className="fa-solid fa-arrow-trend-up"></i>}
        />
        <Button
          name={"Random Gif"}
          icon={<i className="fa-solid fa-shuffle"></i>}
        />
      </div>
      <main>
        <Trending />
      </main>
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
