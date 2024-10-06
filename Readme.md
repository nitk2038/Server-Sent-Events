### Overview of Server Sent Events
- Refer: https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events
- Long Live Unidirectional communication
- Single HTTP Connection
- Example : Feeds, notification, deplyument logs(Jenkins)
-  The Server-Sent Events (SSE) protocol requires each event to have a data: prefix, and each event must be followed by two newline characters (\n\n) to signify the end of an event.

> [!NOTE]
> - Warning: When not used over HTTP/2, SSE suffers from a limitation to the maximum number of open connections, which can be especially painful when opening multiple tabs, as the limit is per browser and is set to a very low number (6). The issue has been marked as "Won't fix" in Chrome and Firefox. This limit is per browser + domain, which means that you can open 6 SSE connections across all of the tabs to www.example1.com and another 6 SSE connections to www.example2.com (per Stackoverflow). When using HTTP/2, the maximum number of simultaneous HTTP streams is negotiated between the server and the client (defaults to 100).
> 

- When tried opening more than 6 tabs then the data was not coming in the 7th Tab, and then 8th tab was not even loading as soon as the other tab was closed data started coming in 7th tab.
```
    <script>
        const eventSource = new EventSource("/sse");
        eventSource.onmessage = (event) => {
            const sseDataRef = document.getElementById("sse-container");
            sseDataRef.innerHTML+=`<p>${event.data}</p>`
        }
    </script>
```
Output
```
Server Sent Events
Welcome to server sent events

Server Time 10/6/2024, 10:03:08 AM

Server Time 10/6/2024, 10:03:13 AM

Server Time 10/6/2024, 10:03:18 AM

Server Time 10/6/2024, 10:03:23 AM

Server Time 10/6/2024, 10:03:28 AM

Server Time 10/6/2024, 10:03:33 AM
```