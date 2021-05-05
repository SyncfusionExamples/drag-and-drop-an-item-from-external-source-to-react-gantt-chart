import React from 'react';
import './App.css';
import { GanttComponent, TaskFieldsModel, ColumnsDirective, ColumnDirective, Edit, Selection, Inject } from '@syncfusion/ej2-react-gantt';
import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import { resourceData, resourceDetails } from './data';
import { closest } from '@syncfusion/ej2-base';
function App() {
  let ganttInst: GanttComponent | null;
  const taskValues: TaskFieldsModel = {
    id: "TaskID",
    name: "TaskName",
    startDate: "StartDate",
    endDate: "EndDate",
    duration: "Duration",
    progress: "Progress",
    dependency: "Predecessor",
    child: "subtasks",
    resourceInfo: "resources"
  }
  const onDragStop =(args: any)=>{
    //To get the chart row element
    let chartRowEle: any = closest(args.target,".e-chart-row");
    //To get the tree grid row element
    let gridRowEle: any = closest(args.target,".e-row");
    let ganttObj: GanttComponent = (ganttInst as GanttComponent);
    let selectedData: any;
    let record: any;
    let resources = [];
    if(gridRowEle){
      // To get the index of target element
      var index = ganttObj.treeGrid.getRows().indexOf(gridRowEle);
      // To select Gantt row dynamically 
      ganttObj.selectRow(index);
    }
    if(chartRowEle || gridRowEle){
      var elements = document.querySelectorAll('.e-drag-item');
      //To get the node details dragged from Tree View 
      record = args.draggedNodeData;
      // To get the task data of selected row
      selectedData = ganttObj.flatData[ganttObj.selectedRowIndex].taskData;
      if(selectedData.resources){
        for(var i =0; i < selectedData.resources.length; i++){
          resources.push(selectedData.resources[i].resourceId);
        }
      }
      resources.push(parseInt(record.id));
      //To update the Gantt row
      ganttObj.updateRecordByID({TaskID: selectedData.TaskID, resources: resources});
      while( elements.length > 0 && elements[0].parentNode){
        //To remove the drag item
        elements[0].parentNode.removeChild(elements[0]);
      }
    }
  }
  return (
    <div>
        <div className="ganttWrapper">
          <GanttComponent ref={gantt => ganttInst = gantt} dataSource={resourceData} taskFields={taskValues} resources={resourceDetails}
          resourceFields={{id: "resourceId", name: "resourceName"}}
          editSettings={{allowEditing: true}}
          labelSettings={{rightLabel: "resources"}}>
            <Inject services={[Edit, Selection]}></Inject>
            <ColumnsDirective>
              <ColumnDirective field="TaskID"></ColumnDirective>
              <ColumnDirective field="TaskName" headerText="Name"></ColumnDirective>
              <ColumnDirective field="resources" headerText="Resources" width="250"></ColumnDirective>
            </ColumnsDirective>
          </GanttComponent>
        </div>
        <div>
          <TreeViewComponent fields={{ dataSource: resourceDetails, id: "resourceId", text: "resourceName"}}
          allowDragAndDrop={true} nodeDragStop={onDragStop}></TreeViewComponent>
        </div>
    </div>
  );
}

export default App;
