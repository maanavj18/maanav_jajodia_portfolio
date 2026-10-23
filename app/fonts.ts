import localFont from "next/font/local";

export const cooperHewitt = localFont({
  src: [
    { path: "./fonts/cooper-hewitt/CooperHewitt-Thin.woff2", weight: "100", style: "normal" },
    { path: "./fonts/cooper-hewitt/CooperHewitt-Light.woff2", weight: "300", style: "normal" },
    { path: "./fonts/cooper-hewitt/CooperHewitt-Book.woff2", weight: "400", style: "normal" },
    { path: "./fonts/cooper-hewitt/CooperHewitt-BookItalic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/cooper-hewitt/CooperHewitt-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-cooper-hewitt",
  display: "swap",
});