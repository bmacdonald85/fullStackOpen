```mermaid
sequenceDiagram
participant browser
participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: Payload of notes
    deactivate server
    Note right of browser: browser executes callback function that renders the notes
```
