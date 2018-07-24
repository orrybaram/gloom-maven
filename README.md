# GloomMaven

This code base uses [graphcool](https://docs-next.graph.cool) as a backend.

### 1. Create your Graphcool service

```sh
# Install latest version of the Graphcool CLI
npm install -g graphcool

# Install dependencies and deploy service
yarn install
graphcool deploy
```

When prompted which cluster you want to deploy to, choose any of the **Shared Clusters** options (`shared-eu-west-1`, `shared-ap-northeast-1` or `shared-us-west-2`).

> Note: The service's schema is created based on the type definitions in [`./server/types.graphql`](./server/types.graphql).


### 2. Connect the app with your GraphQL API
Create a `config.js` file in the `./src` directory and paste the `Simple API` endpoint from the previous step.

```js
// ./src/config.js
// replace `__SIMPLE_API_ENDPOINT__` with the endpoint from the previous step
export const graphcoolEndpoint = '__SIMPLE_API_ENDPOINT__';
```

> Note: You can get access to your endpoint using the `graphcool info` command.


### 3. Install dependencies & run locally

Navigate back into the root directory of the project, install the dependencies and run the app:

```sh
cd ..
yarn install
yarn start
```

You can now use the app at `http://localhost:3000`.


