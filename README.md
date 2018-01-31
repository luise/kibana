# Kibana

[kibanaExample.js](kibanaExample.js) contains an example deployment that starts
the Kibana web interface connected to an Elasticsearch cluster. The
Elasticsearch cluster can be deployed using a hosted solution such as Amazon
Elasticsearch.

## Configuration

The Kibana blueprint requires the URL of the Elasticsearch instance to connect
to. Replace the `<ELASTICSEARCH URL>` string in
[kibanaExample.js](./kibanaExample.js) with the appropriate URL.

It may also be necessary to modify the `elasticsearchPort` constant if the
Elasticsearch cluster does not listen on port `443`.

## Running with Amazon-Hosted Elasticsearch

This section will walk through deploying the Kibana blueprint against an
Amazon-hosted Elasticsearch.

### Set Up Kelda

This guide assumes you've installed Kelda. See the Kelda
[Quick Start](http://docs.kelda.io/#quick-start) for instructions.

### Set Up Elasticsearch

To boot the Elasticsearch cluster:
1. Go to the [AWS Elasticsearch dashboard](https://console.aws.amazon.com/es/home?region=us-east-1).
2. Click the "Create a new domain" button.
3. Pick a name for your Elasticsearch domain. This example uses "kelda-test".
4. Select 6.0 as the Elasticsearch version. The Kibana blueprint deploys the
   6.0.1 version of Kibana, so the Elasticsearch version must also be 6.0.
5. Click "Next".
6. The default cluster configuration is fine, so click "Next" to go to the
   access configuration page.
7. Set up the Network Configuration to allow "Public access"
8. Set the domain access policy to "Allow open access to the domain". This
   setting should not be used for production deployments. More fine-grained
   access policies can be configured if Kibana is [deployed with a floating
   IP](http://docs.kelda.io/#how-to-give-your-application-a-custom-domain-name).
9. Click "Confirm" to create the Elasticsearch domain. The "Domain status" will
   be loading for about 10 minutes, after which the Elasticsearch domain will
   be able to be used with Kibana.

### Boot Kibana

The Elasticsearch domain must have finished initializing before Kibana can be
booted. Once the domain is initialized, its URL should be available in the
Amazon Elasticsearch dashboard under the "Endpoint" field.

1. Open [kibanaExample](kibanaExample.js), and modify the
   `elasticsearchURL` constant to be the Elasticsearch URL. For us, the
   URL was https://search-kelda-test-zghtwerana5jgig5qvzhpfr7cm.us-east-1.es.amazonaws.com
   -- your URL will be slightly different.
2. Run `npm install .` to install the blueprint dependencies.
3. Run `kelda run ./kibanaExample.js` to deploy the blueprint.
4. Once `kelda show` shows the Kibana container as running, copy its address
   from the `PUBLIC IP` column, and go to it in the browser.

The Kibana management page should load. If a "Status: Red" page loads instead,
then the Elasticsearch URL is most likely not properly configured.

### Boot Kibana with a Plugin

Kibana plugins can be installed by modifying the `kibanaExample.js` blueprint:

1. Modify the `plugins` constant in [kibanaExample.js](kibanaExample.js) to
   include the desired plugin. For example,
```
const plugins = [
  'https://github.com/kklin/kbn_dotplot/releases/download/6.0.1/kbn_dotplot.zip',
];
```
2. Run `kelda run ./kibanaExample.js` again.
3. Wait until `kelda show` shows the Kibana container as running, and navigate
   to the container's public IP as before. It is expected for the container to
   be in the "building" state for a couple minutes while the plugins are
   downloaded and installed.

#### Kibana Plugin Limitations

Because the Kibana plugin API is not yet stable, many Kibana plugins do not
have releases for the version of Kibana deployed by the blueprint (6.0.1).

Plugin repositories often have their own instructions on how to build their plugin for different versions of Kibana, but the overall process is usually the same:
1. Download the plugin source.
2. Modify the plugin's `package.json` to be the targeted Kibana version (6.0.1).
3. Create a zip archive with `kibana` as the root folder, and the plugin source as a directory. For example, the directory structure of the `kbn_dotplot` archive is:
```
└── kibana
    └── kbn_dotplot
        ├── README.md
        ├── package.json
        ├── index.js
        ... Other files required by the plugin
```
4. Upload the zip archive to a publicly accessible location.

### Try Out Kibana

This section is a quick introduction to using Kibana. It will place data into
Elasticsearch, and visualize it with the dotplot plugin installed in [Boot
Kibana with a Plugin](#boot-kibana-with-a-plugin).

#### Seed Elasticsearch with Data

This section will place some test bank account data into Elasticsearch.

Run the following commands in a terminal. Replace `<Elasticsearch URL>` with
the same URL used in the [Boot Kibana](#boot-kibana) section.

```
$ ELASTICSEARCH_URL=<Elasticsearch URL>

# Create a temporary directory to download the data.
$ workdir=$(mktemp -d)
$ cd ${workdir}

# Download the data.
$ curl -O -L https://download.elastic.co/demos/kibana/gettingstarted/accounts.zip
$ unzip accounts.zip

# Upload it to Elasticsearch.
$ curl -H 'Content-Type: application/x-ndjson' -XPOST "${ELASTICSEARCH_URL}/bank/account/_bulk?pretty" --data-binary @accounts.json

# Remove the temporary directory.
$ cd -
$ rm -rf ${workdir}
```

#### Configure Kibana to Read the Data

Once the example data is uploaded to Elasticsearch, Kibana must be configured
to load it.

1. Go to the Kibana management page. The container's public IP (e.g.
   http://52.53.171.159:5601/) should redirect there automatically.
2. Set the "Index pattern" to `bank*`.
3. Click "Create".

Going to the "Discover" page should now show the bank account information. This information can be filtered in the Search bar with queries such as `balance:>47500`.

#### Visualizing the Data with DotPlot

This section will demonstrate visualizing the bank account information with the
[DotPlot](https://github.com/dlumbrer/kbn_dotplot) plugin. Using this plugin
requires modifying and deploying the Kibana blueprint as described in [Boot
Kibana with a Plugin](#boot-kibana-with-a-plugin).

1. Go to the "Visualize" page.
2. Click "Create a visualization".
3. Click "Dot plot" under "Basic Charts".
4. Select the `bank*` index.
5. Under "Metrics" click "X-Axis", choose "Average" as the Aggregation, and
   "age" as the Field.
6. Click "Add metrics", click "Y-Axis", choose "Average" as the Aggregation,
   and "balance" as the Field.
7. Under "Buckets" click "Field", choose "Terms" as the Aggregation, and "age"
   as the Field.
8. Click the triangle at the top right of the pane to run the visualization. A
   diagram should appear to the right that shows a plot of owner age to account
   balance.

## Kelda-Hosted Elasticsearch

**Note:** The Kelda Elasticsearch blueprint is not compatible with the version
of Kibana deployed by this blueprint. The Kelda Elasticsearch blueprint boots
version 2.4, which is incompatible with Kibana version 6.
