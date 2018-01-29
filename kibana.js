const { Container, publicInternet, allowTraffic } = require('kelda');

const port = 5601;

class Kibana extends Container {
  constructor(esURL) {
    super('kibana', 'kibana:4', {
      command: [
        '--port', port.toString(),
        '--elasticsearch', esURL,
      ],
    });
    allowTraffic(publicInternet, this, port);
  }
}

exports.Kibana = Kibana;
