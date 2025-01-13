import { AutoRouter } from 'itty-router'
import 'jsr:@supabase/functions-js/edge-runtime.d.ts'


const router = AutoRouter()
interface Input {
  model: string
  input: string
}

const functionName = 'n8n-ai-embed'

router
  .get(`/${functionName}`, () => {
    return new Response('OK', { status: 200 })
  })
  .post(`/${functionName}/api/embed`, async (request: Request) => {
    try {
      const body = (await request.json()) as Input
      let model = body.model

      if (model.includes('supabase/gte-small')) {
        model = 'gte-small'
      } else {
        return new Response('Model not found', { status: 404 })
      }

      const session = new Supabase.ai.Session(model)
      const embedding = await session.run(body.input, {
        mean_pool: true,
        normalize: true,
      })
      const response = {
        model: model,
        embeddings: [embedding],
        load_duration: 0.001,
        prompt_eval_count: 1,
      }
      return new Response(JSON.stringify(response), { status: 200 })
    } catch (error) {
      console.error(error)
      return new Response(
        error instanceof Error ? error.message : 'Unknown error',
        { status: 500 }
      )
    }
  })
  .get(`/${functionName}/api/tags`, () => {
    const models =
      {
        models: [
          {
            name: 'supabase/gte-small:latest',
            model: 'supabase/gte-small:latest',
            modified_at: '2025-01-13T13:19:35.982310011Z',
            size: '',
            digest:
              '',
            details: {
              parent_model: '',
              format: 'gguf',
              family: 'bert',
              families: ['bert'],
              parameter_size: '33M',
              quantization_level: 'F16',
            },
          },
        ],
      }
    return new Response(JSON.stringify(models), { status: 200 })
  })
  .all('*', (req: Request) => {
    console.error(req)
    return new Response(req.url, { status: 404 })
  })

Deno.serve(router.fetch)
