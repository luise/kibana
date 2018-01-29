# Kibana

[kibanaExample.js](kibanaExample.js) contains an example deployment that starts
the Kibana web interface connected to an Elasticsearch cluster. The
Elasticsearch cluster can be deployed using a hosted solution such as Amazon
Elasticsearch.

## Configuration

The Kibana blueprint requires the URL of the Elasticsearch instance to connect
to. Replace the `<ELASTICSEARCH URL>` string in
[kibanaExample.js](./kibanaExample.js) with the appropriate URL.

It may be necessary to may also be necessary to modify the `elasticsearchPort`
constant if the Elasticsearch cluster does not listen on port `443`.
