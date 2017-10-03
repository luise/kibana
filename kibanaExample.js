const { createDeployment, Machine } = require('@quilt/quilt');
const Elasticsearch = require('@quilt/elasticsearch').Elasticsearch;
const Kibana = require('./kibana.js').Kibana;

const clusterSize = 2;

const deployment = createDeployment({});
const baseMachine = new Machine({ provider: 'Amazon' });
deployment.deploy(baseMachine.asMaster());
deployment.deploy(baseMachine.asWorker().replicate(clusterSize));

const es = new Elasticsearch(clusterSize);
es.deploy(deployment);
const kib = new Kibana(es);
kib.deploy(deployment);
