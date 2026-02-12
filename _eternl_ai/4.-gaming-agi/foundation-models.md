---
permalink: /eternl_ai/4.-gaming-agi/foundation-models/
layout: single
author_profile: false
sidebar:
  nav: "eternl_ai"
---

# Foundation Models

## Background

Our Gaming AGI utilizes Multimodal Large Language Models ("MLLMs") as the [foundation model](https://research.ibm.com/blog/what-are-foundation-models) of our framework. These MLLMs are adept at processing and integrating multiple types of data inputs, enhancing the system's contextual understanding and responsiveness. Simultaneously, these models serve as the cognitive backbone on which all actions within the system are based.&#x20;

The concept of foundation models is not exclusive to LLMs and MLLMs. They are expected to evolve, incorporating a broader array of advanced models tailored for better capabilities and performance in diverse scenarios. The modular nature of our framework ensures it always stands at the forefront of AI developments, in and out of LLMs. &#x20;

## Foundation Models

The advent of foundation models marks a significant milestone in the evolution of artificial intelligence, introducing a new era of versatile and powerful AI capabilities. Trained on extensive datasets, these models have set new standards for understanding and generating human-like text, offering unprecedented opportunities for innovation across diverse fields. The significance of our eternl.ai foundation models can be summarized by three concepts:

### **1. Emergence**

Emergence refers to the phenomenon where a system's behavior arises implicitly rather than being explicitly programmed. Foundation models have led to surprising emergent skills. This significantly benefits the users by permitting in-context learning, in which the model can be adapted to a downstream task simply by providing it with a prompt, an emergent property that was neither specifically trained for nor anticipated to arise. However, as emergent behaviors are not directly encoded into the model, they can lead to unpredictable outputs and failure modes.

We address this challenge by providing a comprehensive [prompt learning framework](foundation-models.md#prompt-engineering-and-prompt-learning) designed to harness and refine these emergent capabilities. It minimizes unpredictable behaviors and optimizes the model's emergent skills for game developers' unique needs, ensuring safer and more targeted outcomes within the context.

### **2. Homogenization**

Homogenization indicates the standardization of approaches in constructing machine learning systems for various applications. Foundation models have also led to an unprecedented level of homogenization: Almost all state-of-the-art NLP models are now adapted from one of a few foundation models (e.g.[ GPT3.5](https://openai.com/blog/gpt-3-5-turbo-fine-tuning-and-api-updates),[ LLaMa](https://llama.meta.com/), etc.). While this homogenization produces high leverage, it simultaneously poses a risk by potentially causing all AI systems to share the same problematic biases inherent in a few foundation models. \
\
To this end, we are customizing its approach for game development contexts. By adjusting the[ training process](foundation-models.md#knowledge-patchers) and [data selection](foundation-models.md#what-about-data), the model becomes more attuned to the unique needs and scenarios encountered in game design. This selective emphasis on game-relevant data and examples allows the model to refine its learning process, enhancing beneficial outcomes while diminishing the impact of undesirable biases. Furthermore, our plan is to implement [human feedback mechanisms](foundation-models.md#reinforcement-learning-from-human-feedback-rlhf) for game developers, enabling them to contribute to the model's evolution and ensure it delivers fair and advantageous support to the gaming industry.

### **3. Multimodality**

Humans rely on all senses (sight, hearing, touch, taste, and smell) to interpret the world around us. In a similar vein, multimodal learning aims to mimic human data processing by merging inputs from various modalities. This integration allows these models to gain a deeper understanding of data, revealing new insights and supporting numerous applications.\
\
Our Gaming AGI distinguishes itself further by being inherently multimodal, integrating image, text, and audio data. This multimodal approach enhances the AI's understanding and generation capabilities, providing a richer, more nuanced interaction with game content. Our research, including[ Holla et al. (2024)](https://ojs.aaai.org/index.php/AAAI/article/view/27989),[ Wahed et al. (2024)](https://openaccess.thecvf.com/content/WACV2024/html/Wahed_Fine-Grained_Alignment_for_Cross-Modal_Recipe_Retrieval_WACV_2024_paper.html), and more, positions us at the forefront of multimodal research.

## MLLM Component

### 1. Prompt Engineering & Prompt Learning

Prompt engineering involves crafting detailed instructions to steer generative AI systems toward producing specific outcomes. Despite generative AI's aim to replicate human-like output, it necessitates precise guidance to ensure the quality and relevance of its creations. This process entails selecting the optimal combination of formats, wording, and symbols to enhance the AI's interaction with users. There are three parts of our Gaming AGI model prompts:

1. Just as any other dialogue system that can understand all natural languages, Prothemeus has a freeform input window that can take any input from the user, breaking down language barriers and providing an intuitive and comfortable user experience.&#x20;
2. Following the[ Chain-of-Thought](https://arxiv.org/abs/2201.11903), we aim to segment complicated, multi-stage issues into smaller, intermediate steps, allowing for the allocation of additional computational effort to tasks that demand deeper reasoning. However, instead of generating continuous language sentences where the decomposition of thoughts is left ambiguous, Our Gaming AGI first composes multiple reasoning paths over thoughts and frames any problem as a search over a tree, where each node represents a partial solution with the input and the sequence of thoughts so far. This[ Tree-of-Thought](https://arxiv.org/pdf/2305.10601.pdf) method gives our Gaming AGI several benefits: i) Modularity: The base LM, as well as the thought decomposition, generation, evaluation, and search procedures, can all be varied independently. ii) Adaptability: Different problem properties, LM capabilities, and resource constraints can be accommodated. And iii) Convenience. No extra training is needed.
3. Our Gaming AGI models a prompt’s context words with learnable vectors, which takes advantage of the differentiable nature of neural networks. Previous prompt learning methods fine-tune prompts with training data in the same way they finetune model parameters (e.g.[ Context Optimization](https://arxiv.org/pdf/2109.01134.pdf)). However, the effectiveness of learned prompts is confined to the distribution and tasks represented in the training data, which, notably, is unavailable for zero-shot tasks. Our Gaming AGI employs a test-time prompt tuning approach, adjusting the prompt in real-time with only the provided test example. This method enables zero-shot generalization, eliminating the need for task-specific training data or annotations.

Building on this foundation, we empower users by offering a comprehensive suite of prompt templates specifically designed for easy integration into game development workflows. These templates are crafted to cater to users at all levels of technical proficiency, ensuring that the advanced capabilities of our AI model are accessible to all.

### 2. Multimodal Parameter-Efficient Fine-Tuning (M-PEFT)

#### 2.1. Fine-tuning is Not a Panacea

Current foundation models, despite their impressive capabilities, face notable performance thresholds in complex tasks. Fine-tuning models with task-specific data is a common approach to improve model performances. However, it comes with its own limitations: 1) _High Computational Demand_ – current foundation models are gigantic even for fine-tuning 2) _Catastrophic Forgetting_ – a model loses previously learned information upon learning new data. 3) _Dependency on Pre-trained Model Quality_– the success of fine-tuning heavily depends on the quality and relevance of the pre-trained model.

#### 2.2. Multimodal Parameter-Efficient Fine-Tuning (M-PEFT)

Parameter-Efficient Fine Tuning (PEFT) addresses the _High Computational Demand_ issue by only fine-tuning a small number of (extra) model parameters while freezing most parameters of the pretrained models, thereby greatly decreasing the computational and storage costs. In addition to the aforementioned prompt learning, our Gaming AGI employs additional multimodal PEFT methods (e.g.[ MoLE: Mixture of LoRA Experts](https://openreview.net/forum?id=uWvKBCYh4S)), which enables LoRA-like weight injection without requiring additional architectural changes.

The aforementioned prompt learning plus the multimodal PEFT enable game developers to seamlessly integrate and optimize AI functionalities across various game development areas with reduced computational and storage burdens.

### 3. Ability Patchers

Ability patchers address _Catastrophic Forgetting_ and _Dependency on Pre-trained Model Quality_ by embedding domain-specific insights directly into the model’s architecture. This approach allows for a more nuanced and comprehensive adaptation of the model to the intricacies of game development and player interaction, leading to AI-generated elements that are not only contextually appropriate but also richly detailed and inherently aligned with the game's unique universe. This method surpasses the superficial adjustments possible through fine-tuning, unlocking new potentials in AI-driven game development for creating more immersive and engaging gaming experiences.

Current Ability Patcher library includes

1. Event reasoning – enhance natural language understanding with detailed character lore and player histories, Ability patchers facilitate the generations of complex quests and storylines that are deeply integrated with the game's context.
2. Dynamic soundscaping – improve audio signal processing to dynamically adjust game soundscapes and music in response to gameplay and environmental changes, creating a more immersive and emotionally resonant auditory experience.
3. Voice cloning – enhance speech synthesis techniques to create or capture realistic, character-specific voice outputs that can mimic emotional states and dialogue variations, offering personalized and expressive voice interactions
4. Vision-language alignment – augment image synthesis techniques to create highly detailed and contextually appropriate images, textures, and materials, enhancing the visual richness of game worlds.
5. 3D vision-language alignment – augment asset creation tools with comprehensive design principles, aesthetic guidelines, and thematic consistency rules, automating high-quality asset production
6. Motion analysis – Ability patchers can refine motion analysis algorithms by incorporating nuanced motion capture data, allowing for the generation of more lifelike and responsive character animations that accurately reflect both the physical laws and the emotional subtleties of movement.

Ability patchers extend far beyond these specific instances, offering the potential to revolutionize a wide array of task-specific performances within the realm of game development. Whether it's improving narrative depth, enhancing auditory environments, creating more lifelike characters, or any other area of game development, ability patchers, as a part of our Gaming AGI, stand as a cornerstone technology for pushing the boundaries of what's possible in AI-driven game creation. Our Gaming AGI is committed to releasing more variants that ensure developers can continue to create more immersive, engaging, and emotionally resonant gaming experiences.

### 4. Retrieval-Augmented Generation (RAG)

In the gaming community, foundation models often need to address highly specific questions in different contexts/worldviews. [RAG](https://arxiv.org/pdf/2005.11401v4.pdf), a strategy for improving the quality of ML model responses by grounding the model on external sources of knowledge to supplement the models' internal knowledge, allows developers to control and change information sources for changing requirements or cross-functional usage. In addition, they can also restrict sensitive or irrelevant information retrieval and ensure appropriate responses.

Our Gaming AGI employs modular RAG structures where the overall framework is divided into distinct modules, each with a specific function (e.g., retrieval module, generation module, evaluation module, etc). This realization of modularity allows the individual modules to be optimized and updated independently. Therefore, as the community of our AI Game Hub grows, our foundation model can quickly adapt to diverse  knowledge bases, quicker searching algorithms, better integration layers, etc.

### 5. Reinforcement Learning from Human Feedback (RLHF)

Following the recent success of ChatGPT, we further improved our Gaming AGI by adding the RLHF component. Game developers often encounter tasks that are complex, ill-defined, or difficult to specify. Defining what constitutes "good games" or "good content" can be subjective and multifaceted, often requiring human intuition and creativity. Leveraging the collective wisdom of our community, RLHF empowers the system to learn from human feedback, allowing it to iteratively improve and adapt its strategies based on real-time evaluations and preferences.

## What about Data?

On a technical level, [transfer learning](https://www.geeksforgeeks.org/ml-introduction-to-transfer-learning/) is what makes foundation models possible, but scale is what makes them powerful. Scale requires three ingredients: i) improvements in computer hardware — e.g., GPU throughput and memory have increased 10× over the last four years; ii) the development of more efficient model architectures that leverage the parallelism of the hardware to train much more expressive models than before; and iii) the availability of much more training data.

The importance of the availability of data and the ability to harness it cannot be underestimated.[ Self-supervised learning](https://ai.meta.com/blog/self-supervised-learning-the-dark-matter-of-intelligence/) emerges as a pivotal approach in this context, as it allows pretraining tasks on unannotated data. However, good data still matters for task-specific or topic-specific jobs. Our AI Game Hub provides an organic community for fostering data that is accurate, comprehensive, reliable, relevant, and timely for the gaming world.



