const kelda = require('kelda');
const Kibana = require('./kibana.js').Kibana;

const baseMachine = new kelda.Machine({ provider: 'Amazon' });
const infra = new kelda.Infrastructure(baseMachine, baseMachine);

const elasticsearchURL = '<ELASTICSEARCH URL>';
const elasticsearchPort = 443;
const elasticsearchURLWithPort = `${elasticsearchURL}:${elasticsearchPort}`;

const kibana = new Kibana(elasticsearchURLWithPort);
kelda.allowTraffic(kibana, kelda.publicInternet, elasticsearchPort);
kibana.deploy(infra);
