const kelda = require('kelda');
const Kibana = require('./kibana.js').Kibana;

const baseMachine = new kelda.Machine({ provider: 'Amazon' });
const infra = new kelda.Infrastructure(baseMachine, baseMachine);

const elasticsearchURL = '<ELASTICSEARCH URL>';
const elasticsearchPort = 443;
const elasticsearchURLWithPort = `${elasticsearchURL}:${elasticsearchPort}`;

const kib = new Kibana(elasticsearchURLWithPort);
kelda.allowTraffic(kib, kelda.publicInternet, elasticsearchPort);
kib.deploy(infra);
