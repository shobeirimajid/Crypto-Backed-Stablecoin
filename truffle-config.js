/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * trufflesuite.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

const HDWalletProvider = require('@truffle/hdwallet-provider');
const { key, projectId, api_keys } = require('./secrets.json');
// const fs = require('fs');
// const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  plugins: ['truffle-plugin-verify', 'truffle-contract-size'],
  api_keys: {
    etherscan: '4R2GG4ABQQEWKXAA9W547M4UQXP3TZUP4Y',
    polygonscan: 'B67JZC62SHAGBKX3T4I3RM23MR6KYCIAYZ',
    aurorascan: 'N6U25RYGE6UB39YC28CBVJBG1H1TCMFETZ ',
    bscscan: 'F61QTTC7T2PFCGH3ADEWD9YUX4E55BQY77',
    ftmscan: 'TN6482VHCR1RKKIFE6BNVA8RDVHNT1DJUU',
    satoshiscan: '1fed8bdfbe214caa9346d560a62a46b0',
    cronoscan: 'DD9UFSMC9ANUUEMGR11WBHRJCM8PBDS8H1',
    arbiscan: 'IDSM5BWWXN3B12N4QW7DQC7KSWXA3V2XRB',
    snowtrace: 'GPESGUKTA7S9FRMY4APBDX92E455YC3Z3B',
  },
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

  networks: {
    // Useful for testing. The `development` name is special - truffle uses it by default
    // if it's defined here and no other network is specified at the command line.
    // You should run a client (like ganache-cli, geth or parity) in a separate terminal
    // tab if you use this network and you must also set the `host`, `port` and `network_id`
    // options below to some value.
    //
     development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
     },
     dashboard: {
      port: 24012,
      network_id: 5,
      host: "localhost"
     },
     rsktestnet: {
      provider: () => new HDWalletProvider(privkey, `https://public-node.testnet.rsk.co`),
      network_id: 31,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
     },
     rsk: {
      provider: () => new HDWalletProvider(privkey, `https://public-node.rsk.co`),
      network_id: 30,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
     },
     matictestnet: {
      provider: () => new HDWalletProvider(privkey, `https://rpc-mumbai.maticvigil.com/v1/`),
      network_id: 80001,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
     },
     matic: {
      provider: () => new HDWalletProvider(privkey, `https://polygon-rpc.com`),
      network_id: 137,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
     },
     avaxtestnet: {
      provider: () => new HDWalletProvider(privkey, `https://api.avax-test.network/ext/bc/C/rpc`),
      network_id: 43113,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
     },
     avax: {
      provider: () => new HDWalletProvider(privkey, `https://api.avax.network/ext/bc/C/rpc`),
      network_id: 43114,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
     },
     cronostestnet: {
      provider: () => new HDWalletProvider(privkey, `https://cronos-testnet-3.crypto.org:8545/`),
      network_id: 338,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
     },
     cronos: {
      provider: () => new HDWalletProvider(privkey, `https://evm-cronos.crypto.org`),
      network_id: 25,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
     },
     bsctestnet: {
      provider: () => new HDWalletProvider(privkey, `https://data-seed-prebsc-1-s1.binance.org:8545`),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
     },
     bsc: {
      provider: () => new HDWalletProvider(privkey, `https://bsc-dataseed1.binance.org`),
      network_id: 56,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
     },
     satoshitestnet: {
      provider: () => new HDWalletProvider(privkey, `https://rpc.test.btcs.network/`),
      network_id: 1115,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
     },
     celotestnet: {
      provider: () => new HDWalletProvider(privkey, `https://alfajores-forno.celo-testnet.org`),
      network_id: 44787,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
     },
     celo: {
      provider: () => new HDWalletProvider(privkey, `https://forno.celo.org`),
      network_id: 42220,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
     },
     auroratest: {
      provider: () => new HDWalletProvider(privkey, `https://testnet.aurora.dev:443`),
      network_id: 1313161555,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
     },
     aurora: {
      provider: () => new HDWalletProvider(privkey, `https://mainnet.aurora.dev:443`),
      network_id: 1313161554,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
     },
     ftmtestnet: {
      provider: () => new HDWalletProvider(privkey, `https://rpc.testnet.fantom.network/`),
      network_id: 0xfa2,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
     },
     ftm: {
      provider: () => new HDWalletProvider(privkey, `https://rpc.ftm.tools/`),
      network_id: 250,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
     },
     kcctestnet: {
      provider: () => new HDWalletProvider(privkey, `https://rpc-testnet.kcc.network`),
      network_id: 322,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
     },
     kcc: {
      provider: () => new HDWalletProvider(privkey, `https://rpc-mainnet.kcc.network`),
      network_id: 321,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
     },
    // Another network with more advanced options...
    // advanced: {
    // port: 8777,             // Custom port
    // network_id: 1342,       // Custom network
    // gas: 8500000,           // Gas sent with each transaction (default: ~6700000)
    // gasPrice: 20000000000,  // 20 gwei (in wei) (default: 100 gwei)
    // from: <address>,        // Account to send txs from (default: accounts[0])
    // websocket: true        // Enable EventEmitter interface for web3 (default: false)
    // },
    // Useful for deploying to a public network.
    // NB: It's important to wrap the provider as a function.
     mainnet: {
      provider: () => new HDWalletProvider(key, api_keys, `https://mainnet.infura.io/v3/${projectId}`),
      network_id: 1,
      gas: 8000000,       
      gasPrice: 120000000000,
      from: "0xef4101Da076f96214EDE97e98BFddD375b396536",        
      confirmations: 2,    
      timeoutBlocks: 200,  
      skipDryRun: false     
     },
     //ropsten: {
     // provider: () => new HDWalletProvider(key, api_keys, `https://ropsten.infura.io/v3/${projectId}`),
     // network_id: 3,       // Ropsten's id
     // gas: 5500000,        // Ropsten has a lower block limit than mainnet
     // confirmations: 2,    // # of confs to wait between deployments. (default: 0)
     // timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
     // skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
     //},
     //kovan: {
     // provider: () => new HDWalletProvider(key, api_keys, `https://kovan.infura.io/v3/${projectId}`),
     // network_id: 42,       // Ropsten's id
     // gas: 5500000,        // Ropsten has a lower block limit than mainnet
     // confirmations: 2,    // # of confs to wait between deployments. (default: 0)
     // timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
     // skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
     //},
     //rinkeby: {
     // provider: () => new HDWalletProvider(key, api_keys, `https://rinkeby.infura.io/v3/${projectId}`),
     // network_id: 4,       // Ropsten's id
     // gas: 5500000,        // Ropsten has a lower block limit than mainnet
     // confirmations: 2,    // # of confs to wait between deployments. (default: 0)
     // timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
     // skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
     //},
     goerli: {
      provider: () => new HDWalletProvider(key, api_keys, `https://goerli.infura.io/v3/${projectId}`),
      network_id: 5,       // Ropsten's id
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
     },
     //kiln: {
     // provider: () => new HDWalletProvider(key, api_keys, `https://goerli.infura.io/v3/${projectId}`),
     // network_id: 1337802, // Ropsten's id
     // gas: 5500000,        // Ropsten has a lower block limit than mainnet
     // confirmations: 2,    // # of confs to wait between deployments. (default: 0)
     // timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
     // skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
     //},
    // Useful for private networks
    // private: {
    // provider: () => new HDWalletProvider(mnemonic, `https://network.io`),
    // network_id: 2111,   // This network is yours, in the cloud.
    // production: true    // Treats this network as if it was a public net. (default: false)
    // }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.7",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  },

  // Truffle DB is currently disabled by default; to enable it, change enabled:
  // false to enabled: true. The default storage location can also be
  // overridden by specifying the adapter settings, as shown in the commented code below.
  //
  // NOTE: It is not possible to migrate your contracts to truffle DB and you should
  // make a backup of your artifacts to a safe location before enabling this feature.
  //
  // After you backed up your artifacts you can utilize db by running migrate as follows: 
  // $ truffle migrate --reset --compile-all
  //
  // db: {
    // enabled: false,
    // host: "127.0.0.1",
    // adapter: {
    //   name: "sqlite",
    //   settings: {
    //     directory: ".db"
    //   }
    // }
  // }
};
