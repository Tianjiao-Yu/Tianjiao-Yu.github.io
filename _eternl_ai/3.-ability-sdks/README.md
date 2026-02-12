---
title: ""
permalink: /eternl_ai/3.-ability-sdks/
layout: single
author_profile: false
sidebar:
  nav: "eternl_ai"
---

# 3. Ability SDKs

Our Gaming AGI empowers game developers to produce AI game experiences at low technical barriers and costs. Game developers incorporate ability SDKs into their game code base, which interact with our Gaming AGI to generate AI game experiences for players. &#x20;

## Overview

### 1. Flow Chart

<figure><img src="../.gitbook/assets/image (17).png" alt=""><figcaption></figcaption></figure>

The workflow starts with developers supplying game backend data to the Ability SDKs in the game engine. The SDK translates the data into requests, consolidates on-chain data about an AI agent, and delivers them to our Gaming AGI. Our Gaming AGI processes these requests to generate responses and revert back to the SDK for execution, providing immersive and dynamic player experiences.

### 2. Accessibility

**Our ability SDKs are easy to integrate** into conventional game production. Developers adopt a [standardized and game-compatible input structure](../4.-gaming-agi/#id-2.-current-components) for AI output trained for relevancy and performance. No AI knowledge is required to use our ability functions. &#x20;

**Our ability SDKs are free to use**. Game developers only pay for inferencing costs connected to supervised-learning-based interactions from their players, competitively priced by our [Compute Network](../5.-compute-network/). The sole requirement is launching the game on our [AI Game Hub](../2.-ecosystem/scaling-of-game-hub.md).

### **3. Ability**&#x20;

The same ability can be carried out distinctly by different AI agents—with different identities, personalities, and ability accesses—and by different specifications as requested in the SDKs.&#x20;

* **Agent Identity** influences the execution of an ability through backstory and personality. For example, a courageous agent tends to trigger more dangerous adventures.    &#x20;
* **Function Specification** defines the functional execution of an ability. For example, the combat function can be [specified for the goal of Hit and Run](intelligent-agent.md#id-2.-combat-ability) rather than Annihilation. &#x20;

### **4. Engineer Priority**

Our development roadmap is as below

#### 4.1. Stage One: AI Companion

Building an AI companion is our highest engineering priority as we aim to create the "Alexa for Gaming." Our objective is to transform AI-human interactions within gaming environments, enabling players to control their AI companions using text, voice, or command keys.&#x20;

Player inputs are processed by our Gaming AGI, which classifies the intent and maps it to a corresponding action in our action library. This setup not only enhances direct AI-enabled interaction but also deepens AI participation in gameplay, introducing new formats such as voice-commanding AI entities in competitive PvP games like FPS.&#x20;

It is important to note that modules and actions can be utilized independently, allowing game developers to implement NPCs and adversaries using selected parts of the action library.

#### 4.2. Stage Two: Expansion of Action Library

The initial action library includes simple actions, some of which are hardcoded abilities, such as movement, item collection, and basic navigation in static environments. Our ongoing plan is to continually expand the action library, enabling our AI to execute a broader array of actions. These enhancements include:

* **Complex Behaviors:** By leveraging our technological advantage in Reinforcement Learning, we empower our AI with complex behaviors. This includes combat with varied objectives and navigating dynamic environments where, for example, the AI optimizes a route to evade moving obstacles. These capabilities are first introduced in our Intelligent Agent SDKs.
* **Genre-Specific Actions:** While our initial focus is on versatile actions applicable across various games and genres—such as chatting, moving, and combating—we also plan to develop capabilities specific to certain genres. These might include throwing grenades to a targeted location, choosing the appropriate weapons for collaborative modes, or smart group battling of AI entities in games such as auto-chess.

Our ultimate goal is to prepare for the expected development of AGI within the next 2-3 years. We aim to equip this AGI with our comprehensive action library, ensuring that its sophisticated perception capabilities are matched by versatile and potent action abilities within games.

**4.3. Stage Three: Dynamic World** &#x20;

Eternal.ai aims to incorporate LLM text and graphical capabilities in a variety of gameplay contexts, forming a LLM-based game environment infrastructure layer. In the beginning, it would be generative narratives or pictures describing certain gameplays, such as a combat, a social encounter, or an adventure. But in the future, as MLLM developers, these text and graphical generative content can be upgraded to videos, animations, and 3D actions.   &#x20;

Currently, the Dynamic World SDKs are a lower development priority due to the immaturity of related technologies. However, we will establish an early foothold with text and graphical-based functions to capitalize on the rapidly developing trend in multimodal large language models (MLLMs).

### **5. Current Offerings**

Our offerings focus on versatile functionalities categorized into two product lines—[**Intelligent Agent**](intelligent-agent.md) and [**Dynamic World**](dynamic-world.md).&#x20;

1. **Intelligent Agent** functions ignite any avatar, NPC, monster, or collectible to be an agent possessing AI-powered interactive ability and gameplay intelligence. They enable human-like agents that form more immersive, dynamic, and sophisticated relationships with players. &#x20;
2. **Dynamic World** functions ignite game environments to be dynamic and self-evolving and respond to player actions in real-tim&#x65;**.** They enable non-static environments to hold more meanings and player connections to enhance social and emotional attachment. &#x20;

<table><thead><tr><th width="235">Ability SDKs</th><th>Description</th></tr></thead><tbody><tr><td><strong>Intelligent Agent</strong></td><td></td></tr><tr><td>Chat</td><td>Chat by contextual functions and dialogue styles.</td></tr><tr><td>Combat</td><td>Combat by goals and styles .</td></tr><tr><td>Navigate</td><td>Navigate by modes.</td></tr><tr><td><strong>Dynamic World</strong></td><td></td></tr><tr><td>Narrative</td><td>Generate narratives for gameplay events and by personality. </td></tr><tr><td>*Dynamic Storylines</td><td>Generate sequential contents and states players drive. </td></tr><tr><td>*Self-Operating World</td><td>Generate self-operating worlds driven by AI and player actions.</td></tr></tbody></table>

&#x20; \* indicates use cases of the narrative ability sdk.&#x20;



