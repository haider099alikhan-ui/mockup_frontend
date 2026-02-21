# Figma MCP Server – Use Your Figma Mockups in This App

The **Figma MCP server** is configured so Cursor (and I) can read your Figma designs and turn them into mockup templates in this app.

## 1. Config already added

Your global Cursor MCP config (`~/.cursor/mcp.json`) includes the Figma server:

- **URL:** `https://mcp.figma.com/mcp`
- **Type:** `streamableHttp`

## 2. Connect Figma in Cursor

1. **Restart Cursor** so it loads the new MCP server.
2. In Cursor, when you’re in a chat:
   - If you see **“Install MCP Server?”** → click **Install**.
   - Then click **Connect** next to **Figma** and complete the Figma OAuth flow in the browser.
3. After that, the Figma MCP server is connected and I can use it when you share a Figma link.

## 3. How we use it for mockups

- You share a **Figma link** to a frame (or file) where you designed a mockup.
- I use the Figma MCP tools to:
  - Read that frame (layout, text, colors, positions)
  - Map it to our template format (elements, positions, styles)
  - Add or update a mockup template in this app so it matches your Figma design.

So: **yes, if you give Figma access (by connecting the Figma MCP server as above), I can pick up the mockups you design in Figma and we can use those designs in this website.**

## 4. Optional: Desktop Figma app (selection-based)

- Install the [Figma desktop app](https://www.figma.com/downloads/).
- Open your file → switch to **Dev Mode** (e.g. bottom toolbar or **Shift+D**).
- In the Inspect panel, enable **“Enable desktop MCP server”**.
- Then you can **select a frame in Figma** and ask me to implement that selection (no need to paste a link).

## 5. References

- [Figma MCP – Cursor (remote server)](https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/#cursor)
- [Figma MCP overview](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server)
- [Figma MCP catalog](https://www.figma.com/mcp-catalog)

After you **restart Cursor** and **Connect** Figma once, you can paste a Figma frame link and ask me to add it as a mockup template in this app.
