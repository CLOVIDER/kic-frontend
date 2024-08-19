import React from 'react'
import { useCreateBlockNote } from '@blocknote/react'
import { BlockNoteView } from '@blocknote/mantine'
import '@blocknote/core/style.css' // Import BlockNote's styles
import '@blocknote/react/style.css' // Import BlockNote's React components styles
import '@blocknote/mantine/style.css' // Import BlockNote's Mantine components styles

interface BlockNoteViewerProps {
  data: string
}

export default function BlockNoteViewer({
  data,
}: BlockNoteViewerProps): React.ReactElement {
  const blocks = JSON.parse(data) // parse the string data into blocks

  const editor = useCreateBlockNote({
    initialContent: blocks, // provide the parsed blocks as initial content
  })

  return (
    <div className="flex justify-start w-full h-full">
      {/* Ensure parent takes full height */}
      <div className="overflow-y-auto w-full">
        {/* Enable scrolling */}
        <BlockNoteView
          editor={editor}
          editable={false}
          theme="light"
          className="flex-grow w-full"
        />
      </div>
    </div>
  )
}
