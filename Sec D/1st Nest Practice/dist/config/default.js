"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    rpc: {
        txSending: process.env.RPC_URL_1 || "default_tx_sending_url",
        fallbacks: {
            txSending: [process.env.RPC_URL_2],
        },
    },
});
//# sourceMappingURL=default.js.map