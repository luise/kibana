const {createDeployment, Machine} = require("@quilt/quilt");
var Elasticsearch = require("@quilt/elasticsearch").Elasticsearch;
var Kibana = require("./kibana.js").Kibana;

var clusterSize = 2;

var deployment = createDeployment({});
var baseMachine = new Machine({provider: "Amazon"});
deployment.deploy(baseMachine.asMaster());
deployment.deploy(baseMachine.asWorker().replicate(clusterSize));

var es = new Elasticsearch(clusterSize);
var kib = new Kibana(es).public();
deployment.deploy([es, kib]);
