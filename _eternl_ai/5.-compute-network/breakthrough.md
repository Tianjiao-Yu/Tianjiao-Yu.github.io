---
title: ""
permalink: /eternl_ai/5.-compute-network/breakthrough/
layout: single
author_profile: false
sidebar:
  nav: "eternl_ai"
---


# Breakthrough

## Model Distillation

To accommodate AI models on standard gaming computers, we utilize model distillation techniques to address the significant computational demands of these models. After training the large, complex foundation models, we "distill" their capabilities into smaller, more deployable versions. This process involves a careful balance between model size and performance, which varies across different models. For instance, DistilBERT serves as a benchmark in this approach, achieving a 40% reduction in model size while preserving 97% of its language understanding capabilities. This technique ensures that even players with relatively modest hardware can contribute to and benefit from our Compute Network.

## Model Quantization

Quantization is a technique that reduces a model's size by transforming its numerical representation from a high-precision floating-point format to a lower-precision format, such as 16-bit or 8-bit floating-point (FP) or integer (INT). This process substantially decreases the model's footprint and accelerates inference speed, all while preserving its accuracy. Furthermore, quantization boosts model efficiency by lowering memory bandwidth requirements and improving cache usage. In practice, Large Language Models (LLMs) have been shown to sustain high performance levels with quantization levels above 3-bit. To adapt to various scenarios, our Gaming AGI applies a minimum of 4-bit quantization, ensuring an optimal balance between model compactness and operational efficiency.

## Model Obfuscation

Operating AI models on trustless compute supplier nodes presents significant cybersecurity challenges, including risks of user data breaches and unauthorized model access. To address these issues, our Gaming AGI utilizes a tailored end-to-end model obfuscation tool. This tool incorporates a suite of obfuscation strategies, such as Parameter Encapsulation, Neural Structure Obfuscation, and the introduction of Shortcut and Extra Layer Injections, among others.

These strategies are meticulously designed to protect the model without altering the accuracy of its predictions. The additional processing time required for these obfuscated models is remarkably low, with the most intensive obfuscation techniques increasing runtime by an average of just about 1%. Despite the high memory demands associated with advanced models, our approach efficiently manages to keep the memory overhead to a modest increase of up to 20%, thus ensuring the methods' effectiveness without significantly impacting model performance.

## Proof of Inference

To ensure the reliability and accuracy of the inferencing process, our Compute Network deeply integrates a proof of inference module into the model inferencing workflow. This module generates a sequence of unique secret codes associated with specific tasks at different stages of the inferencing. The Distributor Node verifies these secret codes to ensure the integrity of the outputs returned by compute suppliers. To add an extra layer of protection, the Distributor Node randomly assigns quality-check tasks to compute suppliers, and the inferencing outputs will be validated by the Distributor Node. In instances where the Distributor Node detects any attempts by compute suppliers to exploit the system with incorrect outputs, it will be swiftly exclude them from the Compute Network, upholding the system’s overall security and reliability.
