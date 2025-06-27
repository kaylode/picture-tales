// src/ai/flows/generate-story.ts
'use server';
/**
 * @fileOverview Generates a story from images and details provided by the user,
 * along with accompanying images for each paragraph.
 *
 * - generateStory - A function that generates a story based on images and details.
 * - GenerateStoryInput - The input type for the generateStory function.
 * - StoryOutput - The return type for the generateStory function, an array of story parts.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateStoryInputSchema = z.object({
  images: z
    .array(
      z.string().describe(
        "A list of images as data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
      )
    )
    .describe('A list of images to include in the story.'),
  details: z.string().describe('Details and preferences for the story.'),
  theme: z.string().describe('The theme of the story (e.g., Fantasy, Sci-Fi).'),
});
export type GenerateStoryInput = z.infer<typeof GenerateStoryInputSchema>;

// This is the output from the text generation prompt
const StoryTextOutputSchema = z.object({
    paragraphs: z.array(z.string()).describe("The generated story, broken down into an array of paragraphs."),
});

// This is the final output of the flow, which includes images
const StoryPartSchema = z.object({
    paragraph: z.string().describe("A paragraph of the story."),
    image: z.string().describe("A generated image for this paragraph, as a data URI."),
});
const StoryOutputSchema = z.array(StoryPartSchema);
export type StoryOutput = z.infer<typeof StoryOutputSchema>;


export async function generateStory(input: GenerateStoryInput): Promise<StoryOutput> {
  return generateStoryFlow(input);
}

const storyPrompt = ai.definePrompt({
  name: 'generateStoryPrompt',
  input: {schema: GenerateStoryInputSchema},
  output: {schema: StoryTextOutputSchema},
  prompt: `You are a creative story writer. Use the provided images and details to create an engaging story in a {{theme}} style.
Break the story down into several paragraphs.

Details: {{{details}}}

Images:
{{#each images}}
  {{media url=this}}
{{/each}}`,
});

const generateStoryFlow = ai.defineFlow(
  {
    name: 'generateStoryFlow',
    inputSchema: GenerateStoryInputSchema,
    outputSchema: StoryOutputSchema,
  },
  async (input) => {
    // 1. Generate story text broken into paragraphs
    const { output: storyTextOutput } = await storyPrompt(input);
    if (!storyTextOutput?.paragraphs || storyTextOutput.paragraphs.length === 0) {
        throw new Error("Failed to generate story text.");
    }
    const { paragraphs } = storyTextOutput;

    // 2. Generate images sequentially to maintain consistency
    const storyParts: StoryOutput = [];
    let previousImage: string | null = null;

    for (const paragraph of paragraphs) {
        let imagePrompt;
        const basePromptText = `Generate a beautiful, high-quality illustration in a cinematic, slightly painterly style for the following story paragraph. The story theme is ${input.theme}. Paragraph: "${paragraph}"`;

        if (previousImage) {
            imagePrompt = [
                { media: { url: previousImage } },
                { text: `Maintain a consistent style, especially for characters and faces, with the provided image. ${basePromptText}` },
            ];
        } else {
            imagePrompt = basePromptText;
        }

        const { media } = await ai.generate({
            model: 'googleai/gemini-2.0-flash-preview-image-generation',
            prompt: imagePrompt,
            config: {
                responseModalities: ['TEXT', 'IMAGE'],
            },
        });

        if (!media?.url) {
            throw new Error(`Failed to generate image for paragraph: ${paragraph}`);
        }

        const currentImage = media.url;
        storyParts.push({
            paragraph,
            image: currentImage,
        });
        previousImage = currentImage; // Update for the next iteration
    }

    return storyParts;
  }
);
