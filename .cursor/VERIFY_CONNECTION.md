# Verifying Pencil.dev MCP Server Connection

## Current Status
❌ **Pencil MCP server is NOT currently connected**

## Prerequisites Checklist

### 1. Install Claude Code CLI (Required for Pencil AI features)
```powershell
npm install -g @anthropic-ai/claude-code-cli
```

Then authenticate:
```powershell
claude
```

### 2. Install Pencil Extension in Cursor
1. Open Cursor
2. Go to **Extensions** (Ctrl+Shift+X)
3. Search for "Pencil"
4. Click **Install**
5. Complete the activation process (you'll receive an email)

### 3. Verify MCP Connection in Cursor Settings
1. Open Cursor Settings (Ctrl+,)
2. Navigate to **Tools & MCP** or search for "MCP"
3. Look for "pencil" in the MCP server list
4. Check if it shows as "Connected" or "Running"

## Testing the Connection

### Method 1: Check MCP Tools Availability
If Pencil MCP is connected, you should see Pencil tools available in the chat, such as:
- `mcp_pencil_get_editor_state`
- `mcp_pencil_batch_get`
- `mcp_pencil_batch_design`
- etc.

### Method 2: Create a Test .pen File
1. Create a new file: `test.pen`
2. Open it in Cursor
3. Look for the Pencil icon in the top-right corner
4. If you see it, the extension is installed

### Method 3: Check Cursor's MCP Status
In Cursor, you can check MCP server status by:
- Opening the Command Palette (Ctrl+Shift+P)
- Searching for "MCP" or "Model Context Protocol"
- Viewing available MCP servers

## Troubleshooting

### Issue: MCP Server Not Appearing
**Possible causes:**
1. Pencil extension not installed
2. Extension not activated
3. Claude Code CLI not authenticated
4. Cursor needs to be restarted

**Solutions:**
- Restart Cursor after installing the extension
- Verify Claude Code authentication: `claude --version`
- Check extension is enabled in Extensions panel

### Issue: Package Not Found Error
If you see errors about `@pencil-dev/mcp-server` not being found:
- The MCP server might only work through the extension (not via npm package)
- Try removing the manual configuration and rely on the extension's automatic setup
- Check Pencil's latest documentation for the correct package name

### Issue: "Need Cursor Pro" Message
- Some features may require Cursor Pro subscription
- Check your Cursor subscription status

## Alternative Configuration

If the npm package doesn't work, try removing the manual configuration and let the Pencil extension handle MCP automatically. The extension should set up the MCP server connection automatically when:
- Extension is installed and activated
- Claude Code CLI is authenticated
- Pencil is running (extension or desktop app)

## Next Steps

1. ✅ Install Claude Code CLI: `npm install -g @anthropic-ai/claude-code-cli`
2. ✅ Authenticate: `claude`
3. ✅ Install Pencil extension in Cursor
4. ✅ Restart Cursor
5. ✅ Check Settings → Tools & MCP for "pencil" server
6. ✅ Create a `.pen` file to test

## Resources
- [Pencil Installation Guide](https://docs.pencil.dev/installation)
- [Pencil AI Integration](https://docs.pencil.dev/ai-integration)
- [Cursor MCP Documentation](https://cursor.com/docs/context/mcp)
