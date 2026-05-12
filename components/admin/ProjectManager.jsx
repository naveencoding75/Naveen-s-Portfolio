"use client"
import React, { useState } from 'react'
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { updateProjectOrder } from "@/app/admin/actions"

function SortableItem({ project, index, onEdit, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: project._id })
  const style = { transform: CSS.Transform.toString(transform), transition }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="flex items-center gap-4 p-4 mb-3 bg-white/5 border border-white/10 rounded-2xl cursor-grab active:cursor-grabbing hover:border-cyan-500/50 transition-all group">
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold">{index + 1}</div>
      <div className="flex-grow text-white font-medium">{project.title}</div>
      <div className="flex gap-2">
        <button onClick={() => onEdit(project)} className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded">Edit</button>
        <button onClick={() => onDelete(project._id)} className="bg-red-500/20 text-red-400 px-3 py-1 rounded">Delete</button>
      </div>
    </div>
  )
}

export default function ProjectManager({ initialProjects, onEdit, onDelete }) {
  const [items, setItems] = useState(initialProjects)
  const sensors = useSensors(useSensor(PointerSensor))

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (active.id !== over.id) {
      setItems((prev) => {
        const oldIndex = prev.findIndex((item) => item._id === active.id)
        const newIndex = prev.findIndex((item) => item._id === over.id)
        const newArray = arrayMove(prev, oldIndex, newIndex)
        // Auto-save the order as soon as you drop it
        updateProjectOrder(newArray.map(i => i._id))
        return newArray
      })
    }
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map(i => i._id)} strategy={verticalListSortingStrategy}>
        {items.map((project, index) => (
          <SortableItem key={project._id} project={project} index={index} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </SortableContext>
    </DndContext>
  )
}