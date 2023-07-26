import { styled } from "styled-components";
import { useTheme } from "./context/themeContext";
import Header from "./components/Header";

function App() {
  const theme = useTheme();
  return (
    <AppStyled theme={theme}>
      <Header />
    </AppStyled>
  );
}

export default App;
const AppStyled = styled.div`
  min-height: 100vh;
  background-color: ${(props) =>
    props.theme.colorBg1}; //accsessing value passded as props
`;
