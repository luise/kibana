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

## Kelda-Hosted Elasticsearch

**Note** The Kelda Elasticsearch blueprint is not compatible with the version
of Kibana deployed by this blueprint. The Kelda Elasticsearch blueprint boots
version 2.4, which is incompatible with Kibana version 6.
