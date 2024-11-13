:::mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: The code in spa.js creates the note and refreshes the list of notes on the page.

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa with JSON-payload
    activate server
    server-->>browser: JSON-payload {"message":"note created"}
    deactivate server
:::