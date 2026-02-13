---
title: ""
permalink: /eternl_ai/4.-gaming-agi/rl-model-library/
layout: single
author_profile: false
sidebar:
  nav: "eternl_ai"
order: 12
---



# RL Model Library

## Background

[Reinforcement Learning](https://www.cs.toronto.edu/~vmnih/docs/dqn.pdf) (RL) is a branch of machine learning where an agent learns to make sequences of decisions in a complex and often dynamic environment. Unlike supervised learning and unsupervised learning that learn from datasets, RL learns from the environment in the form of rewards or penalties. The agent explores the environment through trial and error, gradually improving its decision-making policies to achieve long-term goals.

The benefit is that RL agents have high capability to execute highly fine-grained actions, making them adept at handling complex tasks with precise control—for example, DeepMind dominates GO World Champion. However, a significant limitation is the lack of adaptability of RL agents. Each RL model is typically tailored to a specific set of tasks and environments, meaning that the skills and strategies they develop are not easily transferable to other contexts.&#x20;

## Our R&D Focus

We aim to mitigate this unadaptability issue by:&#x20;

1. Enhancing RL training efficiency with transfer learning and grounding foundation models.
2. Identifying versatile but simple RL environment setups for gaming applications.&#x20;

Our goal is to swiftly develop a Reinforcement Learning Model Library ("RLML") that encompasses a diverse range of gaming environments, equipping our Gaming AGI with robust and relatively generalized decision-making and action capabilities.

## Enhance RL Training Efficiency

To enhance RL training efficiency, Eternl.ai:&#x20;

* Leverage [transfer learning](https://www.geeksforgeeks.org/ml-introduction-to-transfer-learning/)—use a RL model trained on one task is used as the starting point for another model on a second task. This approach can significantly reduce training time for RL agents in environments that are different yet share underlying similarities.&#x20;
* Leverage our foundation models as functional approximators to improve RL training efficiency. Analogously, this is to ground "experience" and "cognition" from LLMs into RL agents, enabling RL training to commence with "reasonable" initial observations rather than exhausting every trial-and-error possibility. In particular, it helps:
  * Efficiently explore sparse-reward environments
  * Reuse collected data to bootstrap the learning of new tasks sequentially
  * Schedule learned skills to solve novel tasks
  * Learn from observation of expert agents

Our team's research on the above subjects are in the [Publication & Patent](publication-and-patent.md) section for reference. Highlights of our technical implementations are as below.&#x20;

### 1. Explainable Action Advising

Action advising is a common approach where a knowledgeable "advisor" selectively provides guidance or suggestions to an RL agent in the form of recommended actions or state-action pairs. This guidance aims to accelerate the learning process of the RL agent by directing it towards more effective strategies. However, it poses challenges for the agent when faced with unfamiliar situations. Following our research[ Guo et al. (2023) a](http://sophieyueguo.com/file/icra23.pdf), we introduce Explainable Action Advising, in which the teacher provides action advice as well as associated explanations indicating why the action was chosen. This allows the student to self-reflect on what it has learned, enabling advice generalization and leading to improved sample efficiency and learning performance.

### 2. Introspective Action Advising

Following our research[ Guo et al. (2023) b](http://sophieyueguo.com/file/collas23.pdf), introspective action advising is the transfer learning between tasks based on action advising, in which a teacher trained in a source task actively guides a student’s exploration in a target task. Through introspection, the teacher is capable of identifying when advice is beneficial to the student and should be given, and when it is not. This approach empirically shows improved performance.

### 3. General World Models

A[ world model](https://worldmodels.github.io/) is an AI system that builds an internal representation of an environment and uses it to simulate future events within that environment. Research in world models has so far been focused on very limited and controlled settings (e.g. like those of[ video games](https://worldmodels.github.io/)). We provide a fitting community for the overarching goal of advancing world models, which aims to cultivate robust representations capable of simulating a broad spectrum of situations and interactions reminiscent of all domains of games. These domains include continuous and discrete actions, visual and low-dimensional inputs, 2D and 3D worlds, different data budgets, reward frequencies, and reward scales.

### 4. Language-Centric Agents

Following[ Di Palo, Norman, et al (2023)](https://arxiv.org/pdf/2307.09668.pdf), we empower RL agents by leveraging the remarkable capabilities of foundation models for environment understanding, task comprehension, and decision-making solely through language. This can be decomposed as 1) using VLMs (e.g.[ CLIP](https://arxiv.org/pdf/2103.00020.pdf)) for bridging vision and language. 2) Reasoning through natural language with LLMs, 3) Grounding instructions into actions using a language-conditioned policy network, and 4) Collect & Infer Learning Paradigm

## Identify Versatile but Simple RL Training Setups

### 1. Versatility

A versatile use case in RL training refers to a setup that can be applied across a wide range of games and genres. Leveraging transfer learning, the environment setups of the versatile use case can be different yet share underlying similarities for optimal training efficiency. Building RL for versatile use cases enables us to serve more games with less models.&#x20;

For example, a combat ability is versatile because most games require combats, and combat logic for many games is similar—4 or 8 directional movements, basic attack of range, and skill attacks of range.&#x20;

### 2. Simplicity

A simple use case involves a setup that players do not demand extensive optimization of an agent. For example, players do not expect an AI-powered voyaging to be completed in the most optimized steps—being marginally faster or slower has nearly no impact in player experience. Training RL agents in a simpler setup significantly reduces the required training time.&#x20;

### 3. Potential of RL Adaptability in Gaming&#x20;

* **Optimization is not the goal:** The purpose of RL agents in gaming is to build fun game experiences, which more often than not require diversified and human-like reactions rather than perfect optimization. The focus of acting distinctly rather than low fault tolerance significantly reduces the RL training time. &#x20;
* **Versatility is common in gaming:** Combat and navigation are highly versatile across games and even across genres. Movements are directional and by distances; attacks are more often than not basic or skill attacks; navigations are mostly by a confined list of purposes. If we limit the scope to genre-specific, there are more use cases such as weapon collection in FPS. &#x20;
* **Environment parameter engineering enables diversified strategies of the same RL models:** By incorporate trait-influenced rules into the environment setup, AI agent of distinct traits can be trained to act distinctly using the same action space and environment setup



