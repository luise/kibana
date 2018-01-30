FROM docker.elastic.co/kibana/kibana-oss:6.0.1
{{#plugins}}
RUN kibana-plugin install {{{.}}}
{{/plugins}}
