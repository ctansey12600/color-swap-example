import React, { useState } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { colorsData } from "./assets/data";

// Within GlobalStyle values are set for colors and tag selectors to carry out if no other value is entered
// Props are set up for color, background, primary, and secondary that can be changed based on the isDarkMode state
const GlobalStyle = createGlobalStyle`
:root {
  --steel-blue: #4D7EA8;
  --web-gray: #828489;
  --heliotrope-gray: #9E90A2;
  --light-steel-blue: #B6C2D9;
  --raisin-black: #272932;
  --color: ${(props) => props.theme.color};
  --background: ${(props) => props.theme.backgroundColor};
  --primary: ${(props) => props.theme.primary};
  --secondary: ${(props) => props.theme.secondary};
}
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body {
  font-family: "Martel", regular;
  font-size: 18px;
  color: ${(props) => props.theme.color};
  background-color: ${(props) => props.theme.backgroundColor}
}
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  width: 1235px;
  gap: 50px;
}
ul {
  list-style-type: none;
}
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding: 30px 0px;
`;

const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 32px;
  gap: 8px;
  width: 364px;
  height: 88px;
  color: ${(props) => props.theme.color};
  background: ${(props) => props.theme.primary};
  border-style: none;
  border-radius: 8px;
  font-family: "Martel";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  &:hover {
    background-color: ${(props) => props.theme.secondary};
    color: ${(props) => props.theme.backgroundColor};
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 100px;
  width: 500px;
  height: 500px;
  h2 {
    font-family: "Martel";
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    line-height: 44px;
  }
  h4 {
    font-family: "Martel";
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 32px;
  }
`;

// Values are set that can be switched based on the state of isDarkMode
// Depending on the state, the props will be passed to the GlobalStyles
const lightTheme = {
  backgroundColor: "#B6C2D9",
  color: "#B6C2D9",
  primary: "#9E90A2",
  secondary: "#828489",
};

const darkTheme = {
  backgroundColor: "#272932",
  color: "#272932",
  primary: " #4D7EA8",
  secondary: "#B6C2D9",
};

//When an id is even, the background will render as the primary prop
const Even = styled.li`
  background: ${(props) => props.theme.primary};
`;
// When an id is odd, the background will render as the secondary prop color
const Odd = styled.li`
  background: ${(props) => props.theme.secondary};
`;

function App() {
  // Call State to set a value for dark mode that can switched based on user-click
  const [isDarkMode, setIsDarkMode] = useState(true);
  // When user clicks button, the state of isDarkMode switches to its opposite state
  // When isDarkMode is equal to true (dark mode), isDarkMode will switch to off (light mode)
  const onToggleDarkMode = () => {
    setIsDarkMode((isDarkMode) => !isDarkMode);
  };
  // When an array of data is entered, the array is mapped through, so that each data point is checked
  // When each data point goes through, a list item is made that is styled so that the color of cards alternates
  const cardCollection = colorsData.map((colorData) => {
    const details = (
      <Card key={colorData.id}>
        <h2>{colorData.colorName}</h2>
        <h4>Swatch Code: {colorData.colorCode}</h4>
      </Card>
    );
    // If an object has an even id, it is given the color's styled by the even component
    // If an object has an odd id, it is given the color's styled by the odd component
    if (colorData.id % 2 === 0) {
      return <Even key={colorData.id}>{details}</Even>;
    } else {
      return <Odd key={colorData.id}>{details}</Odd>;
    }
  });
  // After each item is sorted through, card Collection returns an array of of list

  // The text of button to toggle on/off color modes needs to switch depending on the current state
  // Below the button text is loaded based on the state of isDarkMode,
  // When dark mode is true (on), the button will say "light"
  // When dark mode is false (off), the button will read "dark"
  const buttonTextContent = isDarkMode ? "Light" : "Dark";

  return (
    // The ThemeProvider is loaded from styled-components to switch between
    // lightTheme and darkTheme provided colors based on the state of isDarkMode
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      {/* GlobalStyle is loaded from styled-components to give context of styles the complete application */}
      <GlobalStyle />
      <Container>
        <section>
          {/* When the button is clicked, the onToggleDarkMode function is triggered */}
          <Button onClick={onToggleDarkMode}>{buttonTextContent}</Button>
          <ul>{cardCollection}</ul>
          {/* The array of list is then rendered into an unordered list */}
        </section>
      </Container>
    </ThemeProvider>
  );
}

export default App;
