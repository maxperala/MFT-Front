// I'm using Tampere.Finland brand colors from Visit Tampere
export const colors = {
  main_red: "#AE1E20",
  light_warm_red: "#eb5e58",
  warm_red: "#c83e36",
  sand: "#f1eeeb",
  white: "#fff",
  grey: "#686872",
  yellow: "#f4d240",
  amber: "#c29a48",
  blue: "#29549a",
  dirty_white: "#f2f1e9",
  black: "black",
};

// The current palette is kinda ... bad. So we try these new colors to standardize across the app
export const colors_new = {
  black: "#001219",
  teal: "#005F73",
  bright_teal: "#0A9396",
  light_blue: "#94D2BD",
  beige: "#E9D8A6",
  yellow: "#EE9B00",
  brown: "#CA6702",
  gold: "#f4d240",
  orange: "#BB3E03",
  red: "#AE2012",
  light_red: "#eb5e58",
  dark_red: "#9B2226",
  dirty_white: "#f2f1e9",
};

export const colorsTamagui = {
  background: {
    primary: "#FF6F61", // Soft Coral
    secondary: "#FFFFFF", // White
  },
  text: {
    primary: "#FFFFFF", // White (on dark backgrounds)
    secondary: "#333333", // Deep Charcoal (on light backgrounds)
    muted: "#686872", // Gray for placeholders or subtle text
  },
  button: {
    primary: "#FFD700", // Golden Yellow (Primary action like "Register")
    secondary: "#C83E36", // Brick Red (Secondary action like "Allow Location Access")
    textPrimary: "#333333", // Text for buttons on yellow background
    textSecondary: "#FFFFFF", // Text for buttons on red background
  },
  accent: {
    success: "#4CAF50", // Teal Green for success
    info: "#0077B6", // Cool Blue for hover or focus states
    error: "#D32F2F", // Red for error states
  },
  border: {
    primary: "#686872", // Deep Gray for inputs and general borders
  },
};

export default colors;
