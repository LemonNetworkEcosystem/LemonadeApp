//* Data 2 paste

const FACTORY_ADDRESS = "0x9d045F9bAA77769986871D8e3dD83b2693A1C516";

const WETH_ADDRESS = "0x6b3bd0478DF0eC4984b168Db0E12A539Cc0c83cd";

const TKA_ADDRESS = "0x91bBa9888Cc8cD119F5C81599ECa9fFFAe291ed8";

const TKB_ADDRESS = "0x801FD5391C3AA6cD009C11a76F46bEb9e2C5c2B6";

const ROUTER_ADDRESS = "0x5043fE1FC3302a2D303A86937296fE2bc1FeB7C2";

const SUSHI_ADDRESS = "0xb196798512Ee7F43eb6e79e3FF5e58A01Abd93A0";

const MASTERCHEF_ADDRESS = "0x90eBdc59A930D5F7a3Ab6e3ac761ce2CE8632B25";

const SUSHI_BAR_ADDRESS = "0x4222d8Ec4E204f1A8353C1A9f80C5099466FB162"; //!

const SUSHI_MAKER_ADDRESS = "0xC2B980b1d4C659C830eF45CAE4Cc19cb3B9c6208"; //!

const POOL_UNLOCKER_LMD = "0x30F25D754fA403705d4cd461Ba9FA5853e3F770F";

const FARM_UNLOCKER_LMN_LMD = "0xbc1ec407A3CDABdA316f134FEbb370b8B7B5df44";

const FARM_UNLOCKER_LMN_EWT = "0x64d4198CC2C636663EB2922bfD7907C85535EF69";

const FARM_UNLOCKER_LMD_EWT = "0x5cE240429817356437B9503DF2164050b83Ed091";

//* Data 2 paste

const testingData = {
  tokens: {
    WETH: {
      address: WETH_ADDRESS,
      img: "https://s2.coinmarketcap.com/static/img/coins/200x200/5268.png",
      name: "Energy Web Token",
      symbol: "EWT",
    },
    LMN: {
      address: "0xdBB49BE8562ca6E23B41B3BC7f76b00748EED557", //'0xdBB49BE8562ca6E23B41B3BC7f76b00748EED557',
      img: "https://lemonnetwork.sale/static/media/LMN.0064789a.png",
      name: "Lemon",
      symbol: "LMN",
    },
    LMD: {
      address: SUSHI_ADDRESS,
      img: "https://lemondland.github.io/Landing/static/media/lemonade.692b8da3.svg",
      name: "Lemonade",
      symbol: "LMD",
    },
    USDT: {
      address: "0x387f7D8D3360588a9A0B417F6C5DaAe64450942e",
      img: "https://s2.coinmarketcap.com/static/img/coins/200x200/1.png",
      name: "USDT",
      symbol: "USDT",
    },
    DAI: {
      chainId: 246,
      address: "0x3862F260e94904aaAe628DdF427b1F662652BBD2",
      name: "DAI",
      decimals: 18,
      symbol: "DAI",
      img: "https://raw.githubusercontent.com/carbonswap/assets/master/carbonswap/logo/0x3862F260e94904aaAe628DdF427b1F662652BBD2.png",
    },
    G$: {
      chainId: 246,
      address: "0x41c49ef86f513498D9Be19F4E920a6Afbe8Af4Cb",
      name: "G$",
      decimals: 18,
      symbol: "Gangster Dollar",
      img: "https://gswap.app/static/media/gs.59fc8360.png",
    },

    SMUDGE: {
      address: "0x772543750Ea54c393c2E3BE4Ae48F2616631F38F",
      img: "https://raw.githubusercontent.com/carbonswap/assets/master/carbonswap/logo/0x772543750Ea54c393c2E3BE4Ae48F2616631F38F.png",
      name: "Smudge",
      symbol: "Smudge",
    },

    // WBNB: {
    //   chainId: 246,
    //   address: "0x6eEf0941dDc0dEdcDb92C34752B558030B580d33",
    //   name: "Wrapped BNB",
    //   decimals: 18,
    //   symbol: "WBNB",
    //   img: "https://raw.githubusercontent.com/carbonswap/assets/master/carbonswap/logo/0x6eEf0941dDc0dEdcDb92C34752B558030B580d33.png",
    // },
    UNI: {
      chainId: 246,
      address: "0x74Ff9a96eA3E529332d9a1a7d0aba7A27030F867",
      name: "Uniswap",
      decimals: 18,
      symbol: "UNI",
      img: "https://raw.githubusercontent.com/carbonswap/assets/master/carbonswap/logo/0x74Ff9a96eA3E529332d9a1a7d0aba7A27030F867.png",
    },

    REN: {
      chainId: 246,
      address: "0x84128D6c485753F4921Bf9E06dfED4cd9D06B2e9",
      name: "Republic Token",
      decimals: 18,
      symbol: "REN",
      img: "https://raw.githubusercontent.com/carbonswap/assets/master/carbonswap/logo/0x84128D6c485753F4921Bf9E06dfED4cd9D06B2e9.png",
    },

    TRU: {
      chainId: 246,
      address: "0xa208d8aAc0a342597d76960BC7eC1aC0F02b7119",
      name: "Truebit",
      decimals: 18,
      symbol: "TRU",
      img: "https://raw.githubusercontent.com/carbonswap/assets/master/carbonswap/logo/0xa208d8aAc0a342597d76960BC7eC1aC0F02b7119.png",
    },

    xSUSO: {
      chainId: 246,
      address: "0x1C41d2223dc95605fc4395294e65f170A4Fb1b40",
      name: "Susu Party",
      decimals: 18,
      symbol: "xSUSU",
      img: "https://raw.githubusercontent.com/carbonswap/assets/master/carbonswap/logo/0x1C41d2223dc95605fc4395294e65f170A4Fb1b40.png",
    },

    XRT: {
      chainId: 246,
      address: "0xE4DebcA83E6E120C19c55DB6Fd03673ceAbCD42A",
      name: "Robonomics",
      decimals: 9,
      symbol: "XRT",
      img: "https://raw.githubusercontent.com/carbonswap/assets/master/carbonswap/logo/0xE4DebcA83E6E120C19c55DB6Fd03673ceAbCD42A.png",
    },

    UBT: {
      chainId: 246,
      address: "0xb705DC3500fC74746Da38710caA390504D46AA15",
      name: "UniBright",
      decimals: 8,
      symbol: "UBT",
      img: "https://raw.githubusercontent.com/carbonswap/assets/master/carbonswap/logo/0xb705DC3500fC74746Da38710caA390504D46AA15.png",
    },

    MRPH: {
      chainId: 246,
      address: "0xDe8DD08550D68Ca51354542DB4083e37A32e7598",
      name: "Morpheus.Network",
      decimals: 4,
      symbol: "MRPH",
      img: "https://raw.githubusercontent.com/carbonswap/assets/master/carbonswap/logo/0xDe8DD08550D68Ca51354542DB4083e37A32e7598.png",
    },
    MIST: {
      chainId: 246,
      address: "0x913C4B2a3602258089f529bC44720B0D5B62B770",
      name: "Alchemist",
      decimals: 18,
      symbol: "MIST",
      img: "https://raw.githubusercontent.com/carbonswap/assets/master/carbonswap/logo/0x913C4B2a3602258089f529bC44720B0D5B62B770.png",
    },

    LYXe: {
      chainId: 246,
      address: "0xde248F25E724028eb06Ec8cBD7373013Ab16Cfd5",
      name: "LUKSO Token",
      decimals: 18,
      symbol: "LYXe",
      img: "https://raw.githubusercontent.com/carbonswap/assets/master/carbonswap/logo/0xde248F25E724028eb06Ec8cBD7373013Ab16Cfd5.png",
    },

    renBTC: {
      chainId: 246,
      address: "0xcCf4e983B930B97F9cC0d2A20E66AFb781537cFc",
      name: "renBTC",
      decimals: 8,
      symbol: "renBTC",
      img: "https://raw.githubusercontent.com/carbonswap/assets/master/carbonswap/logo/0xcCf4e983B930B97F9cC0d2A20E66AFb781537cFc.png",
    },

    FEI: {
      chainId: 246,
      address: "0x092b1Ab693BB7F4eaA77709170394190E6A27C2F",
      name: "Fei USD",
      decimals: 18,
      symbol: "FEI",
      img: "https://raw.githubusercontent.com/carbonswap/assets/master/carbonswap/logo/0x092b1Ab693BB7F4eaA77709170394190E6A27C2F.png",
    },

    SUSU: {
      chainId: 246,
      address: "0x9cd9CAECDC816C3E7123A4F130A91A684D01f4Dc",
      name: "Susu Token",
      decimals: 18,
      symbol: "SUSU",
      img: "https://raw.githubusercontent.com/carbonswap/assets/master/carbonswap/logo/0x9cd9CAECDC816C3E7123A4F130A91A684D01f4Dc.png",
    },
    GRT: {
      chainId: 246,
      address: "0x931bAD405C204b27c107D6e62594E74d9e9227f7",
      name: "Graph Token",
      decimals: 18,
      symbol: "GRT",
      img: "https://raw.githubusercontent.com/carbonswap/assets/master/carbonswap/logo/0x931bAD405C204b27c107D6e62594E74d9e9227f7.png",
    },

    LINK: {
      chainId: 246,
      address: "0xB75776e562Fea80bc94a1f57ED8337bc575E051B",
      name: "ChainLink",
      decimals: 18,
      symbol: "LINK",
      img: "https://raw.githubusercontent.com/carbonswap/assets/master/carbonswap/logo/0xB75776e562Fea80bc94a1f57ED8337bc575E051B.png",
    },

    wBTC: {
      chainId: 246,
      address: "0x7f8a0AdD824c125D88a51c15814A9a34e5238b88",
      name: "Wrapped BTC",
      decimals: 18,
      symbol: "wBTC",
      img: "https://raw.githubusercontent.com/carbonswap/assets/master/carbonswap/logo/0x7f8a0AdD824c125D88a51c15814A9a34e5238b88.png",
    },

    OCEAN: {
      chainId: 246,
      address: "0x593122AAE80A6Fc3183b2AC0c4ab3336dEbeE528",
      name: "Ocean Token",
      decimals: 18,
      symbol: "OCEAN",
      img: "https://raw.githubusercontent.com/carbonswap/assets/master/carbonswap/logo/0x593122AAE80A6Fc3183b2AC0c4ab3336dEbeE528.png",
    },

    ALBT: {
      chainId: 246,
      address: "0xA41eC761EE36c5986F7C47F80173f63fD039261d",
      name: "AllianceBlock Token",
      decimals: 18,
      symbol: "ALBT",
      img: "https://raw.githubusercontent.com/carbonswap/assets/master/carbonswap/logo/0xA41eC761EE36c5986F7C47F80173f63fD039261d.png",
    },

    USDC: {
      chainId: 246,
      address: "0x9DaD43ee9E09837aeAca21799c88613e8E7c67dd",
      name: "USD Coin",
      decimals: 6,
      symbol: "USDC",
      img: "https://raw.githubusercontent.com/carbonswap/assets/master/carbonswap/logo/0x9DaD43ee9E09837aeAca21799c88613e8E7c67dd.png",
    },

    // USDT:{
    //   chainId: 246,
    //   address: '0x387f7D8D3360588a9A0B417F6C5DaAe64450942e',
    //   name: 'Tether USD',
    //   decimals: 6,
    //   symbol: 'USDT',
    //   img: 'https://raw.githubusercontent.com/carbonswap/assets/master/carbonswap/logo/0x387f7D8D3360588a9A0B417F6C5DaAe64450942e.png,

    // },
  },

  swap: {
    router: {
      address: ROUTER_ADDRESS,
    },
    factory: {
      address: FACTORY_ADDRESS,
    },
  },

  sushi: {
    sushiMaker: {
      address: SUSHI_MAKER_ADDRESS,
    },
    sushiBar: {
      address: SUSHI_BAR_ADDRESS,
    },
    masterChef: {
      address: MASTERCHEF_ADDRESS,
    },
  },

  poolUnlock: {
    LMD: {
      address: POOL_UNLOCKER_LMD,
    },
  },

  farmUnlock: {
    LMN_LMD: {
      address: FARM_UNLOCKER_LMN_LMD,
    },
    LMN_EWT: {
      address: FARM_UNLOCKER_LMN_EWT,
    },
    LMD_EWT: {
      address: FARM_UNLOCKER_LMD_EWT,
    },
  },

  null: {
    address0: "0x0000000000000000000000000000000000000000",
  },
};

export default testingData;
