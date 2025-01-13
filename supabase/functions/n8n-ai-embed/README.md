# N8N Supabase Embed Function

❗❗ JWT authentication is not working yet. Because N8N Embeddings Olama is not supporting it. ❗❗

This function provides an API for embedding models using Supabase's AI capabilities. It is built using the `itty-router` for routing HTTP requests.

## Endpoints

### GET /n8n-ai-embed

- **Description**: Health check endpoint.
- **Response**: Returns a simple "OK" message with a 200 status code.

### POST /n8n-ai-embed/api/embed

- **Description**: Embeds input text using a specified model.
- **Request Body**: JSON object with the following structure:
  ```json
  {
    "model": "string",
    "input": "string"
  }
  ```
- **Response**:
  - **200**: Returns a JSON object containing the model used, embeddings, load duration, and prompt evaluation count.
  - **404**: If the model is not found.
  - **500**: If an error occurs during processing.

### GET /n8n-ai-embed/api/tags

- **Description**: Retrieves available model tags.
- **Response**: Returns a JSON object with model details.

### ALL *

- **Description**: Catches all other routes and returns a 404 status with the requested URL.

## Error Handling

- Logs errors to the console and returns appropriate HTTP status codes.

## Usage

To use this function, deploy it within a Supabase environment and make HTTP requests to the specified endpoints.

## Dependencies

- `itty-router`: Used for routing HTTP requests.
- `Supabase.ai`: Used for creating sessions and running embeddings.

## Deployment

Ensure that the function is deployed in an environment that supports Deno and Supabase's AI capabilities.
