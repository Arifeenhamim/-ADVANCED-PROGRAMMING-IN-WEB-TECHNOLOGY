export default () => ({
  rpc: {
    txSending: process.env.RPC_URL_1 || "default_tx_sending_url",
    fallbacks: {
      txSending: [process.env.RPC_URL_2],
    },
  },
});
