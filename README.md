# yti-common-ui

Shared YTI UI modules

# Publish to Github

https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry

Ensure that:
* `package.json` contains `private: true`
* `./.npmrc` points to the github repository
* `~/.npmrc` contains the github authentication token `npm login --scope=@mju-psi --registry=https://npm.pkg.github.com`
* `./projects/yti-common-ui/package.json` -> `version` is bumped if necessary

```
npm run build:prod
npm run pack
npm run publish
```
