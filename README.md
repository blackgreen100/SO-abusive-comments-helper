This userscript helps with crafting moderator messages from a list of abusive comments.

#### Usage 

- Open the user comments dashboard
- Select comments from the list by checking the checkboxes natively available in the UI
- Expand the "Actions" dropdown menu
- Click "Copy to mod message"

This opens the moderator message interface and automatically selects the appropriate message template. It replaces the relevant placeholders with the text of the selected comments.

#### Build

To build this script, run this command from the repository root:

```
vite build
```

#### Interaction with other scripts

If you run this userscript together with [Henry Ecker's ModMessageHelper V2](https://github.com/HenryEcker-SO-UserScripts/SO-Mod-UserScripts/tree/master/ModMessageHelper), make sure your userscript manager loads this script before `ModMessageHelper`.
