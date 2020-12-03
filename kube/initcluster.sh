#!/usr/bin/env bash

# :: initializes an EKS Fargate cluster on AWS.

# :: IMPORTANT:
#    This k8s cluster is configured to send pod log records to a Kinesis Firehose
#    delivery stream named `aoc2020-benchmarking`.
#    Ensure that this delivery stream is created.
#    https://ap-southeast-1.console.aws.amazon.com/firehose/home?#/wizard/nameAndSource

# :: IMPORTANT:
#    Ensure `eksctl`, `kubectl`, `jq`, and the `aws` CLI tools are on your machine.
if ! [[ -x "$(command -v kubectl)" && -x "$(command -v eksctl)" && -x "$(command -v jq)" && -x "$(command -v aws)" ]]; then
  echo "This script requires kubectl, eksctl, jq, and aws."
  exit 1
fi

# :: ---

# :: TODO programatically create the Kinesis Firehose delivery stream

# :: Create an EKS Fargate cluster
eksctl create cluster -f ./aoc2020-cluster.yaml

# :: Apply the FluentBit ConfigMap to enable cluster-wide log shipping
kubectl apply -f ./aws-observability/fluentbit-configmap.yaml

# :: Create the benchmarking namespace for us to play around in
kubectl apply -f ./benchmarking/namespace.yaml

# :: retrieve the pod execution role created for the cluster's Fargate profile
EXEC_ROLE_ARN=$(aws eks describe-fargate-profile \
  --cluster-name aoc2020 \
  --fargate-profile-name aoc2020fp | \
  jq -r '.fargateProfile.podExecutionRoleArn'
)

# :: create an AWS IAM policy allowing sending logs to CloudWatch,
#    and attach that to the pod execution role above
POLICY_ARN=$(aws iam create-policy \
  --policy-name aoc2020fluentbitfargate \
  --policy-document file://aws-observability/iampermissions.json | \
  jq -r '.Policy.Arn' \
)

echo "Execution Role ARN is: $EXEC_ROLE_ARN"
echo "Policy ARN is: $POLICY_ARN"

aws iam attach-role-policy \
  --policy-arn $POLICY_ARN \
  --role-name ${EXEC_ROLE_ARN##*/} 
