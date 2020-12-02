# Advent of Code `2020`

This is a collection of my personal solutions to the coding puzzles
for [Advent of Code 2020][aoc2020].

## Solutions

The actual solutions are found in the [`src/algorithms`](src/algorithms) folder.

### In the spirit of gross overengineering

A huge shitton of this codebase is scaffolding to run the actual solutions.
Please don't mind the cruft.

## Running

```bash
yarn # :: or npm install
yarn link # :: or npm link

# :: the process command is `aoc`
aoc
```

## Benchmarks

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

---

[twitter][twitter] &middot; [website][website]

[aoc2020]: https://adventofcode.com/2020
[twitter]: https://twitter.com/techlifemusic
[website]: https://richardneililagan.com
[graviton]: https://aws.amazon.com/ec2/graviton
