const { Service, Container, publicInternet } = require('@quilt/quilt');

function Kibana(es) {
  this.service = new Service('kibana', [
    new Container('kibana:4',
      [
        '--port', this.port.toString(),
        '--elasticsearch', es.uri(),
      ])]);
  es.addClient(this.service);
  publicInternet.connect(this.port, this.service);
}

Kibana.prototype.deploy = function deploy(depl) {
  depl.deploy(this.service);
};

Kibana.prototype.port = 5601;

exports.Kibana = Kibana;
