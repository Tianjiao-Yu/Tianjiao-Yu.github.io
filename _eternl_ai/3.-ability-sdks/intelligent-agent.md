---
title: ""
permalink: /eternl_ai/3.-ability-sdks/intelligent-agent/
layout: single
author_profile: false
sidebar:
  nav: "eternl_ai"
order: 8
---


# Intelligent Agent

**Intelligent Agent** SDKs ignite any avatar, NPC, monster, or collectible to be an agent possessing AI-elevated interactive ability and gameplay intelligence. They enable human-like agents that form more immersive, dynamic, and sophisticated relationships with players. &#x20;

## **Agent NFT Standards**

An agent is presented as an NFT, which stores a dataset containing the agent's identity, personality, and access rights of special abilities. The dataset and game data, such as the current location, are used as input to an ability SDK for ability generation.&#x20;

```python
{
  "agentId": "d3767ab4-2907-4407-b8ac-c11a0dcbe337",
  "sexuality": "male",
  "personality": [6, 7, 5, 3, 8, 1, 4, 7, 8, 7, 3, 2, 5, 2, 6, 1, 8, 6, 3, 7, 1, 3, 7, 8]
  "profilePicture": "",
  "accessRight": ["rag-worldview-greekmyth01", "weight-ability-aiAssistant"],
  "description": "https://www.example.com/file/d3767ab4-2907-4407-b8ac-c11a0dcbe337.json"
}

```

1. **Agent ID:** NFT series and item #.
2. **Sexuality:** male, female, or others such as homosexual, transgender, etc.
3. **Personality:** 24 traits that define an agent's character.
4. **Profile Picture:** stored in a decentralized storage location.
5. **Access Right:** rights to use special RAG and model weights as an input to our Gaming AGI.
6. **Description:** pointed to a decentralized storage and revisable at the holder's discretion.
   * **Backstory:** A description of the character, including but not limited to worldview, background, identity, and circumstances, to provide a setup for an interactive role-play. In a game, this section is overwritten to be cohesive with the in-game identity.
   * **Profile Picture:** An alternative profile picture is to be used over the NFT default.
   * **Appearance:** Facial features, expressions, and outfits (free or NFTs, permissionless UGC).
   * **Voice Print:** Standard selections from our library and NFTs from permissionless UGC.
   * **Dialogue Style:** Standard selections from chat abilities and access rights of RAG UGC.

## **Personality System**

An agent's personality influences how it carries out abilities, generating personality-distinct responses and human-like interactions. For example, when combating an AI monster, a player observes subtleties about the monster's reactions, formulates hypotheses, and dynamically adjusts strategies.&#x20;

The personality system contains 24 traits under the five categories below.&#x20;

<table><thead><tr><th width="136"></th><th width="122">Category</th><th width="122">Trait 1</th><th width="121">Trait 2</th><th width="128">Trait 3</th><th width="125">Trait 4</th><th width="144">Trait 5</th></tr></thead><tbody><tr><td>Cognitive</td><td>Creativity</td><td>Curiosity</td><td>Candidness</td><td>Aesthetics</td><td>Awareness</td><td>Academic Zeal</td></tr><tr><td>Emotional</td><td>Love</td><td>Zest</td><td>Kindness</td><td>Gratitude</td><td>Hope</td><td>Humor</td></tr><tr><td>Physical</td><td>Bravery</td><td>Endurance</td><td>Prudence</td><td>Will Power</td><td></td><td></td></tr><tr><td>Social</td><td>Sociability</td><td>Teamwork</td><td>Fairness</td><td>Leadership</td><td>Compassion</td><td></td></tr><tr><td>Spiritual</td><td>Honesty</td><td>Modesty</td><td>Spirituality</td><td></td><td></td><td></td></tr></tbody></table>

## **Intelligent Agent Ability**

The current agent ability offerings include chatting, combating, and navigating abilities. Each ability SDK comprises various specifications, which can be mixed and matched to execute abilities in diverse ways.&#x20;

Looking ahead, we are committed to continuously expanding our offerings by broadening the range of available abilities and specifications and introducing genre-specific abilities, such as equipment searching and grenade dropping in FPS.

### **1. Chat Ability**

The chat ability SDK equips agents with the ability to engage in tailored interactions specified by functionality, dialogue style, and worldview. Our Gaming AGI is fine-tuned by relevancy for each specification. The result is an agent that speaks naturally shows a distinct personality and stays relevant to the context.

#### **Chat Ability - Specification**

1. **Purpose:** conversational purposes on top of the default casual chat.
   * Storytelling: engaging narratives with emotional depth and vivid descriptions
   * Negotiation: a strategic dialogue about compromise and win-win outcomes to resolve disputes.
   * Instruction: clear, concise, and step-by-step guidance tailored to the learner's pace.
   * Console: empathetic responses designed to provide comfort and reassurance.
2. **Dialogue Style:** the display of emotions and personality. Personalities can be mapped to styles.
   * Introvert: reserved, concise, and thoughtful responses, and prefer meaningful topics.
   * Humorous: wit, irony, and playfulness to engage and entertain in a mood-lightening manner.
   * Pessimistic: negative and discouraging, and focus on the downsides of a situation.
   * Classy: refined elegance, employing sophisticated vocabulary and polished manners.
   * Heroic: bravery and altruism, focusing on inspirational and motivational speech.
3. **Worldview:** context relevancy and avoid deviations from worldviews. Two solutions are offered:
   * Economical: Our Worldview [RAG](../4.-gaming-agi/foundation-models.md#id-4.-retrieval-augmented-generation-rag) Library contains databases for prompt input and output management, ensuring whitelisting and blacklisting for appropriateness.
   * Performance: on top of the RAG library, a game developer can provide a worldview script to augment training data, annotated in our standards, for relevancy fine-tuning.&#x20;

<pre class="language-python"><code class="lang-python"># pseudo code
from eternl.ai.chat import (
    create_dialogue,
    create_response,
    DialogueType,
    DialogueStyle,
    DialogueResponseDTO
)
<strong>
</strong><strong>chat(
</strong>    ChatType.console,
    ChatStyle.introvert,
    world_id,
    agent_id,
    CharacterInfo,
    LocationInfo,
    QuestInfo
)

print(chat)
{
"status": "success",
"statusCode": 200,
"data": {
"chatId": "1bb83fbf-aad7-4348-95c2-e2898bf991c1"
"chat": "here goes the story"
}
</code></pre>

**Chat Ability - Implementation**

Existing large language models ("LLMs") have demonstrated exceptionally high performance in natural language capabilities. However, for the same reason for both triumph and downfall, the next-token prediction model design underperforms in context relevancy and output control. To enhance capabilities, we have adopted the following strategies:

* [**Prompt-engineering**](../4.-gaming-agi/foundation-models.md#id-1.-prompt-engineering-and-prompt-learning) **for output control:** ensure the output follows the specific standards of the standardized input requests from the ability SDK.&#x20;
* [**Fine-tuning**](../4.-gaming-agi/foundation-models.md#id-2.2.-multimodal-parameter-efficient-fine-tuning-m-peft) **for contextual performance:** use relevant training data corresponding to each component for fine-tuning.&#x20;
* [**Ability patcher**](../4.-gaming-agi/foundation-models.md#id-3.-ability-patchers) **to improve relevancy:** enhance attention mechanisms to be more precise and contextually aware related to conversations.&#x20;

**Chat Ability - Outlook for extending dialogues to actions**

Initially, the chat ability SDK focuses on dialogues in diversified contexts, and our goal is to expand the boundary from dialogues to action-based interactions, such as completing a transaction. These interactions can happen among players-to-agents or agents-to-agents, forming an autonomous social interaction system to develop a self-operating game world.&#x20;

### **2. Combat Ability**

The combat ability SDK is underpinned by [reinforcement learning](/broken/pages/nT51dp9a6lpYuZnPOhl0#id-3.3-breakthrough-action-advising-reinforcement-learning) ("RL") models, which enable an agent to combat strategically and distinctively. Instead of building an invincible agent, our purpose is to amplify game intricacy and unlock game design possibilities by enabling human-like (not god-like) combat processes.

#### **Combat Ability - Specification**

1. **Goal**
   * **Annihilation:** Eliminate every player team(s) and wait for times of vulnerability.
   * **Hit and Run:** Attack at vulnerabilities and value cost performance.
   * **Resource Extraction:** Slow opponents' economic progression by resources.
   * **Balance:** Assist the weaker side in maintaining an overall balance.
2. **Style**
   * **Aggressive:** prioritize attacks and quick advances rather than self-protection.
   * **Calculative:** perform extensive risk assessments and act only when success is highly probable.
   * **Collaborative:** prioritize team success even at the expense of self-sacrifices.
   * **Deceptive:** randomize actions to confuse and seek strategic opportunities.

#### **Combat Ability - Implementation**

For the combat ability SDK, RL is employed, where goals and styles are achieved by a combination of reward functions, with weights adjusted to prioritize behaviors. This method enables an agent to optimize strategies dynamically for goal-oriented actions. Two demonstrations are as below.

* **Hit and Run:** an agent receives a high punishment for being taken down, and the punishment increases according to the damage it has incurred or the resources it has extracted before it dies. The design is to ensure a dynamic evaluation of cost-performance of actions.
* **Balance:** an agent has an increasing reward function in relation to time the combat takes, and has a reward function for taking down any player. The design is to incentivize initiating a combat but help the weaker side to make the game last longer.&#x20;
* **Aggressive:** an agent has a deteriorating reward function in relation to time. The longer time the agent takes to reach a goal, the less reward it is granted. The design is to incentivize the agent to take action faster than later.
* **Collaborative:** an agent has a reward function for team success. Note that initially, only a single-agent game is adopted, meaning that despite multiple entities in the combat, the agent only makes decisions based on the current state without "predicting" reactions of the counterparties.&#x20;

#### **Combat Ability - Outlook**

A RL model is intricately tied to the action space and environment settings in which it operates. The close coupling means that alterations to parameters may undermine performance, leading to decreased efficacy and necessitating additional training. To achieve relative adaptability, our strategy is expanding the RL library to encompass more scenarios while mitigate the coupling challenges.&#x20;

### **3. Navigate Ability**

The navigate ability SDK is underpinned by RL and enables an agent to navigate according to goals and formats. Navigation is an important feature not only by itself but also in pairing with other abilities. Some use cases are as followed:

* **Pairing with combat abilities:** the navigate ability guides an agent to move within a map before the combat ability SDK is triggered when an opponent is detected within a distance. Mixing navigate and combat components enables another layer of complexity and dynamics.&#x20;
* **Pairing with game actions:** the navigate ability enables an agent to complete more actions across environments. For example, an trader NPC voyages between towns, buying goods in one location and selling in another, which adds depth and realism to the game’s economic system.
* **Enabling AI Assistant**: the navigate ability is vital for AI agents tasked with managing player avatars, especially when players are offline. These agents must be capable of traversing different environments autonomously, such as traveling back to town to replenish supplies.

#### **Navigate Ability - Specification**

1. Modes
   * Guarding: ensuring the safety of a specified area or entity by maintaining vigilance.
   * Predating: seeking out and approaching targets for capture or confrontation.
   * Hiding: avoiding encounters and hiding in locations without players, prioritizing survival.
   * Voyaging: traveling across extensive areas to discover or reach specific destinations.
2. Formats
   1. Efficiently: approaching the destination in the fastest way.
   2. Cautiously: approaching the destination avoiding encounters.&#x20;

#### **Navigate Ability - Implementation**

Similar to the combat ability, RL is employed, where modes and formats are achieved by a combination of reward functions, with weights adjusted to prioritize behaviors. To improve training efficiency, the optimized route is not prioritized, and a discrete state plus cluster-based location spots are employed to simplify the setup.&#x20;

#### **Navigate Ability - Outlook**

Navigation is crucial for enabling agents to be equipped with new actions available across game environments. Our goal is to both expand game actions to pair with navigation, such as traverse to extract resources, replenish supplies, or engage in comparison shopping after negotiations, and to expand genre-specific use cases such as navigating to discover opponents in MOBA or FPS. &#x20;
