/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {GoogleGenAI, Modality, Part} from '@google/genai';
import {marked} from 'marked';

// Use the mandated environment variable.
const API_KEY = process.env.API_KEY;

// Find the container element for the story.
const storyContainer = document.getElementById('story-container');
// Find the regenerate button and its container.
const regenerateContainer = document.getElementById('regenerate-container');
const regenerateButton = document.getElementById('regenerate-button');

/**
 * Renders a single part (text or image) into the story container.
 * @param part The content part from the Gemini response.
 */
async function renderPart(part: Part) {
  if (!storyContainer) return;

  if (part.text) {
    const p = document.createElement('p');
    // Sanitize and render markdown text.
    p.innerHTML = await marked.parse(part.text, {async: true});
    storyContainer.appendChild(p);
  } else if (part.inlineData) {
    const img = document.createElement('img');
    const base64Image = part.inlineData.data;
    const mimeType = part.inlineData.mimeType;
    img.src = `data:${mimeType};base64,${base64Image}`;
    img.alt = 'AI-generated image for the story';
    img.setAttribute('aria-label', 'AI-generated image illustrating the story scene');
    storyContainer.appendChild(img);
  }
}

/**
 * Calls the Gemini API to generate a story with images and renders it.
 */
async function generateStory() {
  if (!API_KEY) {
    if (storyContainer) {
        storyContainer.innerHTML = '<p>API key not found. Please configure your environment.</p>';
    }
    return;
  }
  if (!storyContainer) {
    console.error('Story container element not found.');
    return;
  }

  // Hide regenerate button while loading
  if (regenerateContainer) {
    regenerateContainer.style.display = 'none';
  }

  // Set a loading state
  storyContainer.classList.add('loading');
  storyContainer.innerHTML = '<p>🐢 Generating story...</p>';

  try {
    // Initialize the AI client
    const ai = new GoogleGenAI({apiKey: API_KEY});

    // Make the API call to generate content
    const response = await ai.models.generateContent({
      // Use the correct model for image generation tasks.
      model: 'gemini-2.5-flash-image-preview',
      contents: {
        parts: [{
          text: 'Generate a short story about a cute baby turtle named Sheldon exploring a vibrant coral reef. For each paragraph of the story, generate an accompanying image in a cute, 3d digital art style.'
        }]
      },
      // Specify that the response can contain both text and images.
      config: {
          responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    // Clear loading state
    storyContainer.classList.remove('loading');
    storyContainer.innerHTML = '';

    // Render each part of the response
    const parts = response.candidates?.[0]?.content?.parts;
    if (parts) {
      for (const part of parts) {
        await renderPart(part);
      }
      // Show the regenerate button on success
      if (regenerateContainer) {
        regenerateContainer.style.display = 'block';
      }
    } else {
      storyContainer.innerHTML = '<p>Could not generate a story. The response was empty.</p>';
    }

  } catch (e) {
    console.error(e);
    if(storyContainer) {
        storyContainer.classList.remove('loading');
        storyContainer.innerHTML = `<p><strong>Error generating story:</strong><br>${(e as Error).message}</p>`;
    }
    // Keep button hidden on error
    if (regenerateContainer) {
      regenerateContainer.style.display = 'none';
    }
  }
}

async function main() {
    // Add event listener for the regenerate button
    if (regenerateButton) {
        regenerateButton.addEventListener('click', generateStory);
    }
    await generateStory();
}

// Run the story generation logic once the DOM is ready.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main);
} else {
  main();
}