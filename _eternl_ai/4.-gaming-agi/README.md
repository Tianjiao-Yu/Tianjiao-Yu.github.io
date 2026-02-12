# 4. Gaming AGI

Our Gaming AGI starts with a model framework that deeply integrates multimodal large language models ("MLLMs") with a Reinforcement Learning Model Library ("RLML"). This approach produces immersive, dynamic, and sophisticated AI game experiences through AI agents or game worlds. &#x20;

## **R\&D Guiding Principles**

As AI evolves towards AGI, a critical need is emerging within the gaming industry: seamless integration of the advanced intelligence. This involves not only enabling natural interactions between AI and players but also equipping AGI entities with the capability to perform complex actions within games.&#x20;

Our R\&D guideline is to develop technologies that remain valuable assuming the era of AGI is to arrive within 2 years, and our R\&D priorities include:&#x20;

1. Developing a player-ai interaction system that maps players' intentions to a library of AI actions.&#x20;
2. Expanding the action library consisting of simple actions and RL-based complex actions.&#x20;
3. LLM components migratable to latest LLMs and essential to a complete product experience. &#x20;

As the era of AGI approaches and as MLLMs continue to advance, we aim to ground the "omniscient" LLM-based AGI into the "omnipotent" RL-based action library. This integration aims to create a unified general intelligence that perceives, strategizes, executes, and learns in a dynamic gaming world. &#x20;

## **Technology Overview**

<figure><img src="../.gitbook/assets/image (15).png" alt=""><figcaption></figcaption></figure>

### **1. Framework Design**

Our framework consolidates the abilities for agents to see, hear, speak, think, learn, decide, and act into a unified general intelligence that understands and reacts to dynamic game contexts.

* MLLMs equip our Gaming AGI with cognitive and generative capabilities. The former enables our Gaming AGI to see, hear, and think for contextual understanding of gameplays. The latter enables it to respond in data types, including text, audio, image, and foreseeably, video, 3D object, and action animation.
* RLML equips our Gaming AGI with decision-making and action capabilities. It enables our Gaming AGI to optimize state-to-state decisions and react to dynamic gaming contexts for diversified purposes. Our Gaming AGI continues to "learn" capabilities as our RL Library expands.&#x20;

The integration focuses on layering action-based learning atop cognitive functions. The contextual knowledge from MLLMs can inform RL decision-making processes, reducing the sample inefficiency and allowing them to interpret complex inputs, and reason about the world in human-like ways.&#x20;

Moving forward, the integration shifts towards fully grounding MLLMs within RL frameworks. This process of grounding perception in decisions and actions creates a unified intelligence that processes complex scenarios and actions within one system. This is when the Gaming AGI Framework transforms into a real Gaming AGI. Our team's research on multimodality and LLM grounding is in the [Publication & Patent](publication-and-patent.md#id-2.-multimodality-and-llm-grounding) section.&#x20;

### **2. Alexa for Gaming**

\[TBU]

### **3. Other Components** &#x20;

Below components are designed to enhance gaming-specific task performance.&#x20;

1. **Prompt Engineering & Prompt Learning** enables our Gaming AGI to understand standardized input for specific outcomes, improving integrability and output control for game developers.  &#x20;
2. **Multimodal Parameter-Efficient Fine-Tuning** enables fine-tuning a small number of model parameters, enhancing the cost-efficiency and the performance of gaming-related tasks. &#x20;
3. **Ability Patchers** enhances game-specific capabilities and performance, such as event reasoning, dynamic soundscaping, voice cloning, for more immersive and dynamic game experiences.  &#x20;
4. **RAG** grounds MLLMs on external sources of knowledge for changing requirements or cross-functional usage, ameliorating problems such as hallucination.&#x20;
5. **Reinforcement Learning from Human Feedback ("RLHF")** empowers the system to learn from player feedback and iteratively improve based on real-time evaluations and preferences.
6. **Transfer Learning of RL** transfers knowledge from trained RL agents to untrained agents in similar but not identical settings. This helps us achieve higher versatility of our RL models.

## Propositions

<table><thead><tr><th width="366">AI Limitations in Gaming Applications</th><th>Our Propositions</th></tr></thead><tbody><tr><td><p><strong>Large training datasets are required.</strong> </p><p>Fine-tuning for task-specific improvements requires large and well-labeled training datasets—hundreds or thousands of hours for scrubbing and labelling.</p></td><td>1/ <strong>AI Game Hub as an organic community to</strong><a href="./#what-about-data"> <strong>foster data</strong></a> that are accurate, comprehensive, reliable, relevant, and timely for gaming.<br>2/ <strong>Multimodal Parameter-Efficient Fine-Tuning</strong> for task-specific fine-tuning efficiency. </td></tr><tr><td><strong>Massive compute resources are required.</strong> <br><a href="https://research.ibm.com/blog/what-are-foundation-models">Foundation models</a> (e.g. LLMs) are trained on a vast array of unlabeled data for high task adaptability with minimal fine-tuning. These models expand in size to assimilate, leading to highly costly fine-tuning.</td><td>1/ Our <strong>Compute Network</strong> facilitates access to reliable and affordable compute resources. <br>2/ <strong>Multimodal Parameter-Efficient Fine-Tuning</strong> enables efficient adaptation of large models by fine-tuning only <a href="./#multimodal-parameter-efficient-fine-tuning-m-peft">a small number of (extra) model parameters</a></td></tr><tr><td><strong>Limited accessibility and usability of AI.</strong>  <br>AI models lack uniform standards, which complicate their integrations into game production workflows. RL models require unique sets of environment setups while LLM interactions are prompt-based.  </td><td>1/ <strong>Prompt engineering &#x26; prompt learning</strong> enables our ability SDKs to take standardized and game-compatible input for Gaming AGI output trained for game contexts.<br>2/ <strong>End-to-end solutions</strong> designed for game experiences powered by both MLLM and RL.</td></tr><tr><td><strong>Current AI does not meet developer needs.</strong> <br>Prevailing AI models are mostly general-purposed and are limited in game tasks such as limited: memory, reasoning, output resolution, action capability, 3D generation capability, and animation productivity.   </td><td><p>1/ <a href="./#ability-patchers"><strong>Ability patchers</strong></a> adopts SOTA concepts to  tackle common limitations, such as embedding task-specific models into the MLLMs.<br>2/ <strong>RAG</strong> ameliorates problems such as memory.</p><p>3/ <strong>Integrated framework</strong> that enables it to see, hear, speak, think, learn, decide, and act. </p></td></tr><tr><td><strong>AI hallucination</strong>—AI models detect patterns or objects not perceivable by human observers. This may result in nonsensical, irrelevant, or inaccurate outputs that disrupt game immersiveness.</td><td>1/ <a href="https://arxiv.org/pdf/2005.11401v4.pdf"><strong>RAG</strong></a> ensures context and worldview appropriateness by grounds models on external sources of knowledge.<br><br></td></tr><tr><td><strong>Lack of adaptability of RL agents.</strong> to settings out of the training environments. The close coupling means that AI actions are hardly versatile to new games. </td><td>1/ <a href="rl-model-library.md#enhance-rl-training-efficiency">Enhancing RL training efficiency with transfer learning and MLLM grounding</a>.<br>2/ <a href="rl-model-library.md#identify-versatile-but-simple-rl-training-setups">Identifying versatile but simple RL environment setups for gaming applications</a>. </td></tr></tbody></table>

