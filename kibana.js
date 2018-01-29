const { Container, publicInternet, allowTraffic } = require('kelda');

const image = 'docker.elastic.co/kibana/kibana-oss:6.0.1';
const port = 5601;

class Kibana extends Container {
  constructor(esURL) {
    super('kibana', image, {
      env: {
        SERVER_PORT: port.toString(),
        ELASTICSEARCH_URL: esURL,
      },
    });
    allowTraffic(publicInternet, this, port);
  }
}

exports.Kibana = Kibana;
