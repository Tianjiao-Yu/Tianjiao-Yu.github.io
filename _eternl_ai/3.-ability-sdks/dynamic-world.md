# Dynamic World

**Dynamic World** SDKs transform game environments into dynamic, evolving spaces that react in real-time to player actions. These SDKs enable environments that are more meaningful and foster stronger connections with players, enhancing both social and emotional engagement.

Currently, the Dynamic World SDKs are a lower development priority due to the immaturity of related technologies. However, we will establish an early foothold with text and graphical-based functions to capitalize on the rapidly developing trend in multimodal large language models (MLLMs).

## **Positioning for the Mega Trend**

### **1. Opportunity**

Currently, large language models (LLMs) are mainly focused on text and graphical outputs, which limits their visual impact. However, the capabilities of MLLMs, such as generative animations, 3D objects, and 3D environments, are advancing rapidly. The integration of these technologies into diverse gaming environments is an inevitable and accelerating trend.

Until the turning point arrives, our strategy is to stay at the forefront and position for the mega opportunity of AI gaming—being the first to deliver platform tools that enable immersive, dynamic, and visually stunning game worlds to our players.

### **2. Strategy**

Eternal.ai aims to incorporate LLM text and graphical capabilities in a variety of gameplay contexts, forming a LLM-based game environment infrastructure layer. In the beginning, it would be generative narratives or pictures describing certain gameplays, such as a combat, a social encounter, or an adventure. But in the future, as MLLM developers, these text and graphical generative content can be upgraded to videos, animations, and 3D actions.   &#x20;

At the current stage, the Dynamic World product line is not a high engineering priority and offers only basic functions, especially at customers' requests. However, our team will continue to dedicate R\&D resources in this product line given its strategic importance. &#x20;

## **Dynamic World SDKs**

Currently, the dynamic world product line only includes narrative ability as an AI generative function, and two use cases built upon narrative ability.&#x20;

### **1. Narrative Ability**

The narrative ability function produces generated AI textual and graphic content that describes a gameplay event, and the purpose is to promote **content-driven experiences** that strengthen a player's connections with as well as emotional and social attachment to the game world.    &#x20;

#### **Content Ability - Specification**

1. **Gameplay**
   * **Adventure:** generate a story that describes a player's adventure, covering how he entered the quest, with whom he adventured, who he defeated, and what he acquired as the reward.  &#x20;
   * **Acquisition:** generate a storyline about how a player acquired a collectible, and the storyline can be included as an item description or used as a backstory if the item is an agent.   &#x20;
   * **Friendship:** generate a storyline about establishment of social connections, such as via dungeon fighting. This can be minted as a memory NFT and tagged in a player's social graph.  &#x20;
   * **Combat:** generate a storyline about a combat, and it rationalizes cold metrics, such as misses or a critical hits, by descriptions of how an attack is being missed.      &#x20;
2. **Personality:** an agent personality influences the content being generated. For example, an introvert does not initiate a conversation for a friendship narrative, and a brave agent makes audacious decisions in an adventure story.&#x20;

**Narrative Ability - Implementation**

The implementation strategy of the content ability function is similar to **that of the chat ability**, focusing on unleashing the power of LLMs and improving performance by prompt engineering, fine-tuning, and ability patchers, such as improving **event reasoning** and writing style.&#x20;

**Narrative Ability - Outlook**

The narrative ability function is our attempt to insert LLM infrastructure into gameplay contexts in relation to positioning for the maturity of multimodal AI. We envision that in the future, the generated storylines mentioned above can be presented in the format of videos, animations, and game graphics. These contents, optionally minted as NFTs, become the memory database of a player's digital identity and in-game experiences.

### **2. Advanced Use Cases**&#x20;

#### **2.1. Dynamic Storylines**&#x20;

Dynamic storylines are designed to expand the world interaction boundary from narratives to changes of game states leveraging backend game code engineering. The intention is to construct a dynamic game environment with progressive plots based on players' real-time interactions. The example experience is as below:&#x20;

1. A player arrives at a game location, triggering a random quest, for example encountering a mage who tells a story about a myth related to an underwater dragon cave.&#x20;
2. The player tells the mage what he wants to do, such as teaming up to explore the cave, learning more about the dragon, or not being interested but wanting to keep in touch.&#x20;
3. Based on the player's reaction, the mage responds, and the plot progresses to for example voyaging to the cave. A similar back-and-forth happens recurrently until the quest concludes.&#x20;
4. The conclusion of the quest does result in some state changes of the player, for example from his initial location to the harbor, from full HP to 30% after combat, and acquiring a dragon horn. &#x20;

The grounding of the frontend stories and backend gaming states produces reasonable and natural responses according to player’s real-time actions. For the above example, the progressive plots is a logical extension to previous plots and the player responses, and the interaction is not only on a content level but also grounded on low-level game states.

**2.1.1. Dynamic Storylines - Implementation**

To build the dynamic experience, game developers are required to host a database of quests and plots and map out the changing states related to quest progressions. The output quality of progressing plots is ensured by event-reasoning ability patcher. The following steps are for simplified demonstrations.

1. **Quest Initiation**: in exploring the game world, a player can trigger a quest out of the database by meeting predefined conditions. The 1st plot linked to the quest is generated, prompting a response from the player in natural language.
2. **Decision Mapping**: the player’s response determines the next course of action, categorized into one of the five decisions: explore, combat, observe, socialize, or run. The chosen action dictates the subsequent game logic and leads to a resulting state in the plot.
3. **State Transition**: the ending state captures the current quest status (ongoing or concluded), the plot status (completed or failed), the player’s decision, and the final location. This state may either conclude the quest or lead into the next plot.
4. **Quest Progression**: if the quest is not concluded, and the conditions for the next plot are met, the plot is triggered. This cycle continues until the quest reaches its conclusion.

```python
# quest database demonstration
[
  {
    "questId": 1,
    "type": "defeat_boss",
    "triggers": {"location": "L192", "npc": "L192N102", "date": "weekend"},
    "quest_content": "A series of gruesome animal killings has left the streets stained and the bodies bloodless...",
    "hint": "a chance to obtain the mage's purifying iron",
    "beginning_plot": ("random", 311, 329, 359)
  },
  ....
]

```

```python
# plot demonstration
plot251 = {
  "quest_id": 51,
  "plot_id": 251,
  "plot_connections": ("405", "adventure", {"location": "L192"}), #(plot-prerequisite, last-action, plot-triggers)
  "content": "Mr.X appears in the auction with his face covered",
  "decision": ( #(explore, combat, observe, socialize, run) 
      {"complete", "relocate", "L25"}, 
      {"combat", "SSR01", ("hp", "less_than", 50%), {"relocate", "L25", "reward", "Black Dragon Sword"}, {"relocate","L12"}, 
      {"failed", "relocate", "L12"})  
      {"complete", "stay", "L17"})
      {"failed", "relocate", "L12"}  
      ),     
  } 
```

**2.1.2. Dynamic Storylines - Outlook**

The dynamic content grounding aims to expand the interaction boundary from content generation to change of game states. In the future, we envision that the meticulously designed quest and plot database can be generated by our Gaming AGI, and the interactions will be presented in the format of videos or animations.

#### **2.2. Self-Operating World**

By leveraging our offerings, game developers can construct an autonomous game environment, where gameplay elements interact autonomously yet dynamically, driving natural progression of the game world in response to in-game activities and economic shifts. There are two key aspects:&#x20;

1. **Self-Operating Society:** NPCs are agents that perform specific roles authentically. For example, a trader NPC not only simulates buying and selling but also travels within the game environment to conduct these transactions. Also, NPCs have the capability to socialize and form relationships, creating a vibrant community. Players can leverage these relationships, teaming up with NPC friends to undertake and complete quests, adding a rich layer of interaction and strategy.
2. **Self-Operating Economy:** by adopting blockchain and token design, real-world economic principles are mirrored, such as ownership of assets and licenses, establishing economic relationships, dynamic price changes corresponding to demand and supply. For example, if a player owns a mine that extracts rare minerals, the value fluctuates based on the overall extraction rate by all players and current market demand.&#x20;

#### **Why is a realistic game world meaningful?**&#x20;

Building an autonomous world enables players to experience real-world situations without objective limitations, such as time and capital, by the following features:&#x20;

1. **Real Away-from-Keyboard ("AFK") Experience:** an agent assistant manages a player's character during the time he is offline. This enables the player to enjoy the satisfaction of progression without contributing time or effort.&#x20;
2. **Unlimited Content:** hosts unlimited explorations and interactions for players, ensuring constantly evolving, never-repeating, and personalized experiences. This enables a level of novelty and surprise that is unmatched in the real world.&#x20;
3. **Creation Capabilities:** players are capable of creating their own agent NPCs, and as technology develops, they can create in-game objects, buildings, and environments, which are interactable and embedded within a framework of logical game rules.

## **Outlook**

We anticipate rapid growth in the capabilities of Large Language Models (LLMs), with several emerging trends that are poised to redefine the landscape:

### **1. Multimodal LLM**&#x20;

MLLMs are set to revolutionize generative digital environments by:

1. **3D Environment Generation**: The creation of dynamic 3D spaces is under rapid development. These environments are not only visually impressive but also contextually responsive. Some applications in gaming include the generation of intricate maps and rendering them with generative design themes. This enables unlimited environments for FPS, MOBA, and SLG games.&#x20;
2. **Video and 3D Action Creation**: Innovations will extend to the generation of complex video, animation, and 3D action content, such as interactive scenes that respond to user inputs, further blurring the lines between digital and physical realities.
3. **3D Object Generation**: Alongside environments, the ability to generate detailed 3D objects within these spaces will be advance, providing a richer, more interactive experience.

### **2. Interactive Objects and Environments**

Research is increasingly focusing on the interplay between objects and their environments, laying the groundwork for more immersive and interactive experiences:

1. **Object-Environment Interaction**: Current research explores the fundamental interactions between objects and their surroundings. This not only supports the realism and responsiveness of the environment to user actions, but also enables a creator experience of not only the appearances but inherit connections with the game world.&#x20;
2. **Affordance AI**: This approach embeds relationships between objects and their environments, envisioning a self-operating world governed by inherent rules. As these technologies mature, we can start with a basic set of affordance relationships to construct simple yet dynamic worlds. For instance, players could interact with any physical object to use it as a tool or weapon, any monetary object to trade or sell, and any non-player character (NPC) to form alliances.

### **3. Conclusion**

The future of LLMs extends far beyond text generation, moving towards a comprehensive ecosystem where text, objects, and video are interlinked to create deeply immersive, dynamic worlds. As research in these areas continues to mature, the possibilities for creating visually appealing, generative gaming environments only expand, promising a new era of AI-driven dynamics and realism in digital spaces.



