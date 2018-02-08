const kelda = require('kelda');
const Kibana = require('./kibana.js').Kibana;

// Installing plugins can take a while, so using a larger machine greatly speeds
// up the boot time. Installing a plugin on m3.large takes about 5 minutes,
// while m3.medium takes about 10 minutes.
const baseMachine = new kelda.Machine({ provider: 'Amazon', size: 'm3.large' });
const infra = new kelda.Infrastructure(baseMachine, baseMachine);

const elasticsearchURL = '<ELASTICSEARCH URL>';
const elasticsearchPort = 443;
const elasticsearchURLWithPort = `${elasticsearchURL}:${elasticsearchPort}`;

const plugins = [];

const kibana = new Kibana(elasticsearchURLWithPort, plugins);
kelda.allowTraffic(kibana, kelda.publicInternet, elasticsearchPort);
kibana.deploy(infra);
