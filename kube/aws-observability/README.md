# `aws-observability`

Native support for [Fluent Bit][fluentbit] for cluster-wide logging in EKS on Fargate
can be enabled.
This allows pods running on an EKS on Fargate cluster to be able to ship logs
to a destination of their choice (e.g. [CloudWatch][cloudwatch],
[S3][s3], or [Elasticsearch][elasticsearch])
**without having to use a sidecar to proxy it for them**.

To enable Fluent Bit log shipping, a [`ConfigMap`][configmap] with Fluent Bit configuration
has to be applied to the cluster. At the moment, this has to be done from a namespace
called `aws-observability` as a hard requirement.

---

[configmap]: ./fluentbit-configmap.yaml
[fluentbit]: https://fluentbit.io
[cloudwatch]: https://aws.amazon.com/cloudwatch
[s3]: https://aws.amazon.com/s3
[elasticsearch]: https://aws.amazon.com/elasticsearch-service
