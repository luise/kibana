const { Infrastructure, Machine } = require('kelda');
const Elasticsearch = require('@kelda/elasticsearch').Elasticsearch;
const Kibana = require('./kibana.js').Kibana;

const clusterSize = 2;

const baseMachine = new Machine({ provider: 'Amazon' });
const infra = new Infrastructure(
  baseMachine,
  baseMachine.replicate(clusterSize));

const es = new Elasticsearch(clusterSize);
es.deploy(infra);
const kib = new Kibana(es.uri());
es.addClient(kib);
kib.deploy(infra);
