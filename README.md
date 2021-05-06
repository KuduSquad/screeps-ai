# screeps-ai

```mermaid
graph TD
 main --> room
 room --> harvester
 room --> builder
 room --> repairer
 room --> upgrader
 builder --> room_ai
 main --> conquer_rooms_ai
 conquer_rooms_ai --> conqueror
```

```mermaid
classDiagram
 main ..> room
 room ..> harvester
 room ..> builder
 room ..> repairer
 room ..> upgrader
 builder ..> room_ai
 main ..> conquer_rooms_ai
 conquer_rooms_ai ..> conqueror
```
