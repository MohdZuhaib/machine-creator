const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: { main: "#0D0D20" },
          secondary: {
            main: "#0D0D20",
            light: "#171727",
            contrastText: "#ffff",
          },

          text: {
            primary: "#FFC0CB",
            secondary: "#85282b",
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: "#6a328c",
          },

          background: {
            default: "#fcff4f",
            paper: "#fcff4f",
          },
          text: {
            primary: "#fcff4f",
            secondary: "#4ff0ff",
          },
        }),
  },
});
export default getDesignTokens;
