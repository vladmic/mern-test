import React, {memo, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListGroup, ListGroupItem, Input, Button} from 'reactstrap';
import { deleteTodoRequest, updateTodoRequest } from "../../redux/actions";

const TodoList = ({}) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const todos = useSelector((state) => state?.todos?.todoList ?? []);

  const [updateTodo, setUpdateTodo] = useState('');
  const [isEditMode, setEditMode] = useState(false);
  const [activeTodo, setActiveTodo] = useState(null);

  const onDeleteClick = (id) => dispatch(deleteTodoRequest({ id }));

  const onCheckChange = (e) => {
    const { target: { checked, dataset: { todoId } } } = e;
    if (todoId) {
      dispatch(updateTodoRequest({ id: todoId, completed: checked }));
    }
  };

  const onEditTodoChange = (event) => {
    setUpdateTodo(event.target.value);
  }

  const onEditStart = (event) => {
    const { target: { dataset: { todoId } } } = event;
    const { text = '' } = todos.find((todo) => todo._id === todoId) ?? {};
    setEditMode(true);
    setActiveTodo(todoId);
    setUpdateTodo(text);
  }

  const onEditEnd = () => {
    if (updateTodo.trim().length > 0) {
      setEditMode(false);
      dispatch(updateTodoRequest({ id: activeTodo, text: updateTodo }));
    }
  };

  useEffect(() => {
    if (isEditMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditMode]);

  return (
    <ListGroup className="mt-3">
      {todos.map(({ _id: id, text, completed }) => {
        return (
          <ListGroupItem
            className="d-flex justify-content-start align-items-center"
            key={id}
            data-todo-id={id}
            onDoubleClick={onEditStart}
          >
            <input
              data-todo-id={id}
              type="checkbox"
              defaultChecked={completed}
              onClick={onCheckChange}
            />
            {(isEditMode && activeTodo === id) ? (
              <Input
                type="text"
                name="editTodo"
                className="mx-3"
                innerRef={inputRef}
                placeholder="Edit Todo"
                onChange={onEditTodoChange}
                onBlur={onEditEnd}
                value={updateTodo}
              />
            ) : (
              <div className="pl-3">{text}</div>
            )}
            <Button
              color="danger"
              size="sm"
              className="ml-auto"
              onClick={() => onDeleteClick(id)}
            >
              Delete
            </Button>
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
}

export default memo(TodoList);
