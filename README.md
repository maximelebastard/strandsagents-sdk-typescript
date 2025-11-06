<div align="center">
  <div>
    <a href="https://strandsagents.com">
      <img src="https://strandsagents.com/latest/assets/logo-github.svg" alt="Strands Agents" width="55px" height="105px">
    </a>
  </div>

  <h1>
    Strands Agents - TypeScript SDK
  </h1>

  <h2>
    A model-driven approach to building AI agents in TypeScript/JavaScript.
  </h2>

  <div align="center">
    <a href="https://github.com/strands-agents/sdk-typescript/graphs/commit-activity"><img alt="GitHub commit activity" src="https://img.shields.io/github/commit-activity/m/strands-agents/sdk-typescript"/></a>
    <a href="https://github.com/strands-agents/sdk-typescript/issues"><img alt="GitHub open issues" src="https://img.shields.io/github/issues/strands-agents/sdk-typescript"/></a>
    <a href="https://github.com/strands-agents/sdk-typescript/pulls"><img alt="GitHub open pull requests" src="https://img.shields.io/github/issues-pr/strands-agents/sdk-typescript"/></a>
    <a href="https://github.com/strands-agents/sdk-typescript/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/github/license/strands-agents/sdk-typescript"/></a>
  </div>
  
  <p>
    <a href="https://strandsagents.com/">Documentation</a>
    ◆ <a href="https://github.com/strands-agents/samples">Samples</a>
    ◆ <a href="https://github.com/strands-agents/sdk-python">Python SDK</a>
    ◆ <a href="https://github.com/strands-agents/tools">Tools</a>
    ◆ <a href="https://github.com/strands-agents/agent-builder">Agent Builder</a>
    ◆ <a href="https://github.com/strands-agents/mcp-server">MCP Server</a>
  </p>
</div>

Strands Agents is a simple yet powerful SDK that takes a model-driven approach to building and running AI agents. The TypeScript SDK brings key features from the Python Strands framework to TypeScript environments, enabling agent development for both Node.js servers and web browsers.

> **Note**: This SDK is currently under active development. Features are being added incrementally. Check the [project overview](.project/project-overview.md) for the roadmap.

## Feature Overview

- **Lightweight & Flexible**: Simple agent loop that works seamlessly in Node.js and browsers
- **Model Agnostic**: Built-in support for Amazon Bedrock, OpenAI, and custom model providers
- **Tool System**: Flexible tool definition with automatic registry management
- **Streaming Support**: Real-time event streaming for responsive user experiences

## Quick Start

Get started with Strands Agents in just a few lines of code:

```typescript
import { Agent, BedrockModel } from '@strands-agents/sdk'

// Create an agent with default settings
const agent = new Agent()

// Invoke the agent and get the result
for await (const event of agent.invoke('Hello! What can you help me with?')) {
  if (event.type === 'afterModelEvent') {
    console.log('Response:', event.message.content)
  }
}
```

Or use OpenAI as your model provider:

```typescript
import { Agent, OpenAIModel } from '@strands-agents/sdk'

const agent = new Agent({
  model: new OpenAIModel()
})

const stream = agent.invoke('Tell me a joke')
for await (const event of stream) {
  console.log('Event:', event.type)
}
```

See the [Usage Examples](#usage-examples) section below for more detailed examples, including tool usage and advanced patterns.

## Installation (Coming Soon)

Once published to npm:

```bash
npm install @strands-agents/sdk
```

The SDK works in both Node.js and browser environments:

```typescript
import { Agent, BedrockModel, OpenAIModel } from '@strands-agents/sdk'
```

## Development Status

This TypeScript SDK is being developed with the following features (see [project overview](.project/project-overview.md) for details):

- ✅ **Project Structure**: TypeScript configuration, testing framework, development infrastructure
- ✅ **Model Providers**: Amazon Bedrock, OpenAI, and custom provider support
- ✅ **Tool System**: Tool execution, registry, and flexible tool definitions
- ✅ **Agent Interface**: Core agent class with `invoke` method for orchestration
- ✅ **Event Loop**: Async iterator-based agent loop with streaming support
- 🚧 **Conversation Manager**: Context window overflow handling
- 🚧 **Hooks System**: Lifecycle event extensibility
- 🚧 **Telemetry**: OpenTelemetry-based observability
- 🚧 **Metrics**: Usage tracking and reporting

## Usage Examples

### Basic Agent Usage

The simplest way to create an agent with default settings:

```typescript
import { Agent } from '@strands-agents/sdk'

const agent = new Agent()

// Get the final result without streaming
const stream = agent.invoke('What is 2 + 2?')
let result
for await (const event of stream) {
  result = event
}
// result contains the final AgentResult
```

### Streaming Events

Monitor the agent's execution in real-time:

```typescript
import { Agent } from '@strands-agents/sdk'

const agent = new Agent()

for await (const event of agent.invoke('Tell me about TypeScript')) {
  switch (event.type) {
    case 'beforeModelEvent':
      console.log('Calling model...')
      break
    case 'afterModelEvent':
      console.log('Model response:', event.message)
      break
    case 'beforeToolsEvent':
      console.log('Executing tools...')
      break
  }
}
```

### Using Different Model Providers

#### Amazon Bedrock

```typescript
import { Agent, BedrockModel } from '@strands-agents/sdk'

const agent = new Agent({
  model: new BedrockModel()
})

for await (const event of agent.invoke('Hello!')) {
  if (event.type === 'afterModelEvent') {
    console.log(event.message)
  }
}
```

#### OpenAI

```typescript
import { Agent, OpenAIModel } from '@strands-agents/sdk'

const agent = new Agent({
  model: new OpenAIModel()
})

const stream = agent.invoke('Explain quantum computing')
for await (const event of stream) {
  console.log(event.type)
}
```

### Working with Tools

Extend your agent's capabilities with custom tools:

```typescript
import { Agent, type Tool, type ToolContext, type ToolResult } from '@strands-agents/sdk'

// Define a simple calculator tool
class CalculatorTool implements Tool {
  name = 'calculator'
  description = 'Performs basic arithmetic operations'
  
  toolSpec = {
    name: this.name,
    description: this.description,
    inputSchema: {
      type: 'object' as const,
      properties: {
        operation: { type: 'string' as const, enum: ['add', 'subtract', 'multiply', 'divide'] },
        a: { type: 'number' as const },
        b: { type: 'number' as const }
      },
      required: ['operation', 'a', 'b']
    }
  }
  
  async *stream(context: ToolContext): AsyncGenerator<never, ToolResult, unknown> {
    const { operation, a, b } = context.toolUse.input as { operation: string; a: number; b: number }
    
    let result: number
    switch (operation) {
      case 'add': result = a + b; break
      case 'subtract': result = a - b; break
      case 'multiply': result = a * b; break
      case 'divide': result = a / b; break
      default: throw new Error('Invalid operation')
    }
    
    return {
      toolUseId: context.toolUse.toolUseId,
      status: 'success',
      content: [{ type: 'textBlock', text: `Result: ${result}` }]
    }
  }
}

// Create agent with tools
const agent = new Agent({
  tools: [new CalculatorTool()],
  systemPrompt: 'You are a helpful assistant with access to a calculator.'
})

// The agent will automatically use tools when needed
for await (const event of agent.invoke('What is 42 times 17?')) {
  if (event.type === 'afterToolsEvent') {
    console.log('Tool results:', event.message)
  }
}
```

### Advanced Configuration

Combine all configuration options:

```typescript
import { Agent, BedrockModel } from '@strands-agents/sdk'

const agent = new Agent({
  model: new BedrockModel(),
  tools: [new CalculatorTool()],
  messages: [], // Start with empty conversation history
  systemPrompt: 'You are a helpful assistant that can perform calculations.'
})

const stream = agent.invoke('Calculate 123 + 456')
for await (const event of stream) {
  console.log('Event:', event.type)
}
```

For more examples, see the `examples/` directory in this repository.

## Documentation

For detailed guidance on the Strands Agents framework (Python-based examples):

- [User Guide](https://strandsagents.com/)
- [Quick Start Guide](https://strandsagents.com/latest/user-guide/quickstart/)
- [Model Providers](https://strandsagents.com/latest/user-guide/concepts/model-providers/amazon-bedrock/)
- [Tools](https://strandsagents.com/latest/user-guide/concepts/tools/tools_overview/)
- [Agent Loop](https://strandsagents.com/latest/user-guide/concepts/agents/agent-loop/)
- [API Reference](https://strandsagents.com/latest/api-reference/agent/)

TypeScript-specific documentation will be added as the SDK develops.

## Contributing ❤️

We welcome contributions! See our [Contributing Guide](CONTRIBUTING.md) for details on:
- Development setup and environment
- Testing and code quality standards
- Pull request process
- Code of Conduct
- Security issue reporting

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information on reporting security issues.


