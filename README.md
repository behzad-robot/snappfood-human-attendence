# Humane Attendence 
This repo was created so that people can do their attendence in snappfood without going through a lot of pain.
Note that this repo has 0 api calls outside the attendence api and we dont keep your personal data anywhere except your own browser. That is why we've open sourced the whole thing.
## Quick install guide:
- Download a release.
- Goto chrome extensions.
- Enable Developer mode.
- Load the Extension.
- Login to attendence once. The plugin will show popup to help you.
## Folder structure:
There's a react project: attendence-react.

There's a chrome extension project: my-chrome-extension.

I've been using bun for development but you can do node,npm too.

There's also a helper script that you can use to quickly apply your react changes to the chrome extension: build_for_extension.sh

**Note:** We dont do api calls in react dev mode all apis are replaced with mock responses right now.
