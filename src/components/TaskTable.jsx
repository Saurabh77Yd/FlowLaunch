import { useEffect, useRef } from 'react';
import { Tabulator } from 'tabulator-tables';
import 'tabulator-tables/dist/css/tabulator.min.css';
import './TaskTable.css';

const TaskTable = ({ tasks, onUpdateTask, onDeleteTask }) => {
  const tableRef = useRef(null);

  useEffect(() => {
    const table = new Tabulator(tableRef.current, {
      data: tasks,
      layout: 'fitColumns',
      columns: [
        { title: 'Task ID', field: 'id', width: 100, editor: false },
        { title: 'Title', field: 'title', editor: 'input' },
        { title: 'Description', field: 'description', editor: 'input' },
        {
          title: 'Status',
          field: 'status',
          editor: 'select',
          editorParams: {
            values: ['To Do', 'In Progress', 'Done'],
          },
        },
        {
          title: 'Actions',
          formatter: () => '<button>Delete</button>',
          cellClick: (e, cell) => {
            onDeleteTask(cell.getRow().getData().id);
          },
        },
      ],
      cellEdited: (cell) => {
        onUpdateTask(cell.getRow().getData());
      },
    });

    return () => table.destroy();
  }, [tasks, onUpdateTask, onDeleteTask]);

  return (
    <div className="table-container">
      <div ref={tableRef} className="tabulator"></div>
    </div>
  );
};

export default TaskTable;
