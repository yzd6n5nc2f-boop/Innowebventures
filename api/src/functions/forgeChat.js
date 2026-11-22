const { app } = require('@azure/functions');
const { createChatHandler } = require('../../lib/forgeWebsiteChat');
app.http('forgeChat',{methods:['POST'],authLevel:'anonymous',route:'forge-chat',handler:createChatHandler()});
