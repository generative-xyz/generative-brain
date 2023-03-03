async function sendBtcRequest(method, params) {
  const paramsStr = `[${params.join(sep=',')}]`;
  
  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: `{"jsonrpc":"2.0","id":1,"method":"${method}","params":${paramsStr}}`
  };
  
  try {
    const response = await fetch('https://ancient-crimson-rain.btc.discover.quiknode.pro/c268fb026303ae8443f785200f2ea4b82f0082dd', options);
    const data = await response.json();
    return data.result;
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function getLatestBlock() {
  return sendBtcRequest('getblockcount', []);
}

async function getBlockStats(blockId) {
  return sendBtcRequest('getblockstats', [blockId]);
}