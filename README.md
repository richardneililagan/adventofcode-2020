# Advent of Code `2020`

This is a collection of my personal solutions to the coding puzzles
for [Advent of Code 2020][aoc2020].

## Solutions

The actual solutions are found in the [`src/algorithms`](src/algorithms) folder.

## Running

```bash
yarn # :: or npm install
yarn link # :: or npm link

# :: the process command is `aoc`
aoc
```

---

## In the spirit of gross overengineering

A huge shitton of this codebase is scaffolding to run the actual solutions.
Please don't mind the cruft.

### Docker

Included is a `Dockerfile` that builds the codebase into an image meant for quick
answers or profiling.

As it stands, you can execute it, providing a (3-digit) `PROBLEM_ID` and a `DIFFICULTY`
(either **easy** or **hard**), and it'll just go.

```bash
docker build -t richardneililagan/aoc2020:latest .

# :: docker run <image> <PROBLEM_ID> <DIFFICULTY>
docker run --rm richardneililagan/aoc2020 001 easy
> 001 easy 786811 0.007324444 0
# :: PROBLEM_ID DIFFICULTY ANSWER TIME_TAKEN JUST_A_ZERO
```

### Kubernetes

This codebase includes a script to spin up a [Kubernetes][k8s] cluster on
[Amazon EKS][eks] using the [AWS Fargate][fargate] configuration.

[A script][eksscript] is included that will (should?) spin up your Kubernetes cluster
on AWS. Note that the manifest files included are hard-coded to use my images ---
however, there's really only one place that is used, and that is on the
benchmarking deployment manifest.

> **Note to self**: make the image name dynamic.

Just be sure you change it up!

Once you have a cluster up, you can set up the deployment:

```bash
kubectl apply -f ./kube/benchmarking/profiler-deployment.yaml
```

The cluster as configured will ship logs to an [Amazon Kinesis Firehose][firehose]
delivery stream, which then should allow me to gather metrics from the solutions
into some nice visualizations.

> TODO: Metrics collection + projection

> TODO: Metrics visualizations

### Why?

Why not?

---

### Benchmarks

```bash
yarn benchmark # :: or npm run benchmark
```

Benchmarks are run on an AWS EC2 `c6g.xlarge` [Graviton2][graviton] instance, with Node v14.15.
Numbers reported are averaged 90p across 100 runs.

> Because of Node's behavior with `async`/`await`, numbers below are a bit skewed.
> The reference timestamp occurs before an `await`, and it takes a bit of time before
> Node goes back to that process to complete it after the `await` completes.
> The more processes in iteration, that larger this time seemingly is.
>
> I'm open to suggestions on how to better benchmark the solutions!

Times in seconds.

|                                 | Part 1                | Part 2                |
| ------------------------------- | --------------------- | --------------------- |
| Day 01: **Report Repair**       | `0.04378231011458334` | `0.05122632686458333` |
| Day 02: **Password Philosophy** | `0.10018808907777771` | `0.08998614430000001` |
| Day 03: **Toboggan Trajectory** | `0.05089637265555557` | `0.06285037628888888` |

---

[twitter][twitter] &middot; [website][website]

[aoc2020]: https://adventofcode.com/2020
[twitter]: https://twitter.com/techlifemusic
[website]: https://richardneililagan.com
[graviton]: https://aws.amazon.com/ec2/graviton
[eksscript]: ./kube/initcluster.sh
[k8s]: https://kubernetes.io
[eks]: https://aws.amazon.com/eks
[fargate]: https://aws.amazon.com/fargate
[firehose]: https://aws.amazon.com/kinesis/data-firehose
