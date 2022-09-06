import { Story, Mint, MyNFT } from "../pages";

// import { Route } from '../types/Route';

const routes = [
  {
    key: "router-mint",
    title: "MINT",
    description: "Mint",
    component: <Mint/>,
    path: "/",
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: "router-story",
    title: "STORY",
    description: "Story",
    component: <Story/>,
    path: "/story",
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: "mynfts",
    title: "MY NFTs",
    description: "My NFT Info",
    component: <MyNFT/>,
    path: "/mynfts",
    isEnabled: true,
    appendDivider: true,
  },
];

export default routes;
