# Pencil.dev MCP Server Configuration

## Overview
This directory contains the MCP (Model Context Protocol) configuration for Pencil.dev integration with Cursor IDE.

## Automatic Setup (Recommended)
Pencil's MCP server typically runs **automatically** when you:
1. Install the Pencil extension in Cursor
2. Complete the activation process
3. Authenticate with Claude Code CLI (`claude`)

The MCP server should appear in Cursor's settings under **Settings → Tools & MCP**.

## Manual Configuration
If you need to configure Pencil's MCP server manually, edit `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "pencil": {
      "command": "npx",
      "args": ["-y", "@pencil-dev/mcp-server"],
      "env": {}
    }
  }
}
```

**Note:** The actual package name may vary. If the above doesn't work, try:
- Check if Pencil exposes its MCP server via a different command
- Verify the package name in Pencil's documentation
- Use the extension's built-in MCP server (recommended)

## Verification
To verify Pencil's MCP server is connected:
1. Open Cursor Settings → Tools & MCP
2. Look for "pencil" in the MCP server list
3. Ensure it shows as connected/running

## Troubleshooting
- **MCP server not appearing**: Ensure Pencil extension is installed and activated
- **Connection issues**: Verify Claude Code CLI is authenticated (`claude` command)
- **Package not found**: The MCP server may only be available through the extension

## Resources
- [Pencil Documentation](https://docs.pencil.dev/)
- [Pencil AI Integration](https://docs.pencil.dev/ai-integration)
- [Cursor MCP Documentation](https://cursor.com/docs/context/mcp)
