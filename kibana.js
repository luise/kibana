const kelda = require('kelda');
const Mustache = require('mustache');
const path = require('path');
const fs = require('fs');

const port = 5601;
const dockerfilePath = path.join(__dirname, 'Dockerfile');
const dockerfileTemplate = fs.readFileSync(dockerfilePath, { encoding: 'utf8' });

class Kibana extends kelda.Container {
  constructor(esURL, plugins = []) {
    const dockerfile = Mustache.render(dockerfileTemplate, { plugins });
    const image = new kelda.Image({ name: 'kelda-kibana', dockerfile });
    super({
      name: 'kibana',
      image,
      env: {
        SERVER_PORT: port.toString(),
        ELASTICSEARCH_URL: esURL,
      },
    });
    kelda.allowTraffic(kelda.publicInternet, this, port);
  }
}

exports.Kibana = Kibana;
