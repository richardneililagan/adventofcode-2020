#!/usr/bin/env bash

# :: initializes an EKS Fargate cluster on AWS.

# :: IMPORTANT:
#    Ensure `eksctl`, `kubectl`, and the `aws` CLI tools are on your machine.
if ! [[ -x "$(command -v kubectl)" && -x "$(command -v eksctl)" && -x "$(command -v aws)" ]]; then
  echo "This script requires kubectl, eksctl, and aws."
  exit 1
fi

# :: Create an EKS Fargate cluster
eksctl create cluster --name testcluster --fargate

# :: Create a dedicated namespace for the benchmarking pods
#    and a Fargate profile for the namespace.
#    Pods created in this namespace will be run on Fargate as a result.    
kubectl create namespace aoc2020-benchmarking
eksctl create fargateprofile \
  --namespace aoc2020-benchmarking \
  --cluster testcluster \
  --name aoc2020-benchmarking

# :: Create an IAM OIDC for this cluster
eksctl utils associate-iam-oidc-provider \
  --cluster testcluster \
  --approve

# :: Create an IAM role and Kubernetes service account
#    for Fluentd to use. This should allow Fluentd to send logs to CloudWatch.
eksctl create iamserviceaccount \
  --name benchmarkingserviceaccount \
  --namespace aoc2020-benchmarking \
  --cluster testcluster \
  --attach-policy-arn arn:aws:iam::aws:policy/CloudWatchAgentServerPolicy \
  --approve
