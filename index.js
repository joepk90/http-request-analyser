const nettime = require('nettime')

const origin = process.env.npm_config_url ? process.env.npm_config_url  : 'https://www.google.com';

const getTimings = async () => {

  let result;

  try {
    result = await nettime(origin);
  } catch(error) {
    console.error(error)
    return
  }

  let {timings} = result;

  let {socketOpen, dnsLookup, tcpConnection, tlsHandshake, firstByte, contentTransfer, socketClose} = timings;

  let waiting = nettime.getDuration([0, 0], timings.firstByte)
  let downloading = nettime.getDuration(timings.firstByte, timings.contentTransfer)

  console.log('URL: origin: ' + origin)
  console.log('---')
  console.log('Each timing indicates the time at which the process completed:')
  console.log('Socket Opened:', nettime.getMilliseconds(socketOpen) + 'ms')
  console.log('DNS Lookup:', nettime.getMilliseconds(dnsLookup) + 'ms')
  console.log('TCP Connection:', nettime.getMilliseconds(tcpConnection) + 'ms')
  console.log('TLS Handshake:', nettime.getMilliseconds(tlsHandshake) + 'ms')
  console.log('First Byte:', nettime.getMilliseconds(firstByte) + 'ms')
  console.log('Content Transfered:', nettime.getMilliseconds(contentTransfer) + 'ms')
  console.log('Socket Closed:', nettime.getMilliseconds(socketClose) + 'ms')
  console.log('---')
  console.log('Duration Statistics:')
  console.log('Waiting for the response:', nettime.getMilliseconds(waiting) + 'ms')
  console.log('Downloading the content (first byte to content transferred):', nettime.getMilliseconds(downloading) + 'ms')
  
}

getTimings();