# SAPIS CO SPA APP

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [React + TypeScript + Vite](#react--typescript--vite)
3. [Adding New Content](#adding-new-content)
   - [Adding a New Agent](#adding-a-new-agent)
   - [Adding a New Service](#adding-a-new-service)
   - [Adding a New Core Value](#adding-a-new-core-value)
   - [Adding a New Purpose](#adding-a-new-purpose)
4. [Deployment Steps](#deployment-steps)

## Tech Stack

### React + TypeScript + Vite

| Module    | Version |
| ------    | ------- |
| Node      | v22.12.0|
| npm       | 10.9.0  |
|Typescript | 5.7.3   |

- **Framework**: React
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **3D Graphics**: Three.js
- **Linting**: ESLint

## Adding New Content

### Adding a New Agent
1. Add the agent's logo to the `public/images/agents` directory.
2. Import the logo in `AgentsContent.tsx`:
   ```typescript
   import new_agent_logo from '/images/agents/new_agent_logo.png';
   ```
3. Update the `agentsContent` array in `AgentsContent.tsx` with the new agent details. Ensure the description does not exceed **74 characters**:
   ```typescript
   {
       name: "New Agent Name",
       description: "Brief description of the agent (max 74 characters).",
       webUrl: "https://www.newagentwebsite.com/",
       logoUrl: new_agent_logo
   }
   ```

### Adding a New Service
1. Add the service image to the `public/images/services` directory.
2. Import the image in `ServicesContent.tsx`:
   ```typescript
   import new_service_image from '/images/services/new_service_image.webp';
   ```
3. Update the `servicesContents` array in `ServicesContent.tsx` with the new service details:
   ```typescript
   {
       order: 6,
       title: "New Service Title",
       description: "Detailed description of the service.",
       imageUrl: new_service_image
   }
   ```

### Adding a New Core Value
1. Update the `coreValuesContent` array in `CoreValuesContent.tsx` with the new core value details:
   ```typescript
   {
       title: "New Core Value",
       description: "Description of the new core value."
   }
   ```

### Adding a New Purpose
1. Update the `purposeContents` array in `PurposeContent.tsx` with the new purpose details:
   ```typescript
   {
       title: "New Purpose Title",
       description: "Description of the new purpose."
   }
   ```

## Deployment Steps
1. Create a new branch for your changes and push the updates.
2. Open a pull request (PR) and wait for it to be reviewed and merged.
3. Once the PR is merged, switch to the `main` branch:
   ```bash
   git checkout main
   ```
4. Pull the latest changes from `main`:
   ```bash
   git pull origin main
   ```
5. Deploy the application:
   ```bash
   npm run deploy
   ```
