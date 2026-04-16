# React Gantt Chart: Drag and Drop External Resources

A React sample showing how to drag resource nodes from a Syncfusion `TreeView` into a Syncfusion `GanttComponent` task and update task resources.

## Features

- Syncfusion Gantt chart with external resource drag-and-drop
- Task/resource mapping using sample data
- Dynamic task updates via `nodeDragStop`
- Resource assignment using `updateRecordByID`

## Project overview

`src/App.tsx` renders the Gantt chart and TreeView and handles drop updates. `src/data.js` provides example tasks and resource definitions. `src/index.tsx` bootstraps the app.

## How it works

- The Gantt chart initializes with `resourceData` and `resourceDetails`.
- `TreeViewComponent` allows dragging resource nodes.
- On drop, `onDragStop` finds the target row, merges the resource ID, and updates the selected task.

## Prerequisites

- Node.js 14+
- npm

## Install

```bash
npm install
```

## Run

```bash
npm start
```

Open `http://localhost:3000`.

## Dependencies

- `react`
- `react-dom`
- `react-scripts`
- `typescript`
- `@syncfusion/ej2-react-gantt`
- `@syncfusion/ej2-react-navigations`

## Notes

Built with Create React App and TypeScript. Sample data lives in `src/data.js` and drag logic is in `src/App.tsx`.
