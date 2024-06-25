// StoryPage.tsx
import React from 'react';
import { getAllStories, getStory } from "@/lib/getAllStories";
import { notFound } from "next/navigation";
import Story from "@/components/Story";

import StoryButton from './StoryButton';

interface StoryPageProps {
  params: {
    id: string;
  }
}

const StoryPage = ({ params: { id } }: StoryPageProps) => {
  const decodedId = decodeURIComponent(id);
  const story = getStory(decodedId);

  if (!story) {
    return notFound();
  }


  return (
    <div>
      <StoryButton story={story} />
      <Story story={story} />
    </div>
  );
};

export default StoryPage;
