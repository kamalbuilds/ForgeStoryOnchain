import { NextRequest } from "next/server";
import { RunEventType, RunOpts } from "@gptscript-ai/gptscript";
import g from "@/lib/gptScriptInstance";

const script = "app/api/run-script/story-book.gpt";
export async function POST(request: NextRequest) {
  // to get the body we do
  const { story, pages, path } = await request.json();

  const opts: RunOpts = {
    disableCache: true,
    // CLI command will look something like this and this is what we are actually telling it:
    // gptscript./story-book.gpt --story "A robot and human become friends" --pages 5 --path ./stories
    input: `--story ${story} --pages ${pages} --${path}`,
  };

  try {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // here we initiate GPT script
          const run = await g.run(script, opts);

          run.on(RunEventType.Event, (data) => {
            controller.enqueue(
              encoder.encode(`event: ${JSON.stringify(data)}\n\n`)
            );
          });
          await run.text();
          controller.close();
        } catch (error) {
          controller.error(error);
          console.error("Error", error);
        }
      },
    });
    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
    });
  }
}
