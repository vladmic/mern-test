import React, { memo, useEffect, useState, useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row
} from 'reactstrap';

import { getAllTodosRequest, addTodoRequest } from '../../redux/actions';
import Footer from '../../components/Footer';
import TodoList from '../TodoList';

const Todos = () => {
  const dispatch = useDispatch();

  const [addTodo, setAddTodo] = useState('');
  const todos = useSelector((state) => state?.todos?.todoList ?? []);
  const page = useSelector((state) => state?.todos?.page ?? 1);
  const totalPages = useSelector((state) => state?.todos?.totalPages ?? 1);
  const limit = useSelector((state) => state?.todos?.limit ?? 10);

  const getAllTodos = useCallback((page, limit) => {
    dispatch(getAllTodosRequest({ page, limit }));
  }, [dispatch]);

  useEffect(() => {
    if (!todos.length) {
      getAllTodos(1, 10);
    }
  }, []);

  const onAddTodoChange = (e) => setAddTodo(e.target.value);

  const onAddTodoClick = () => {
    setAddTodo('');
    dispatch(addTodoRequest({ text: addTodo }));
  }

  return (
    <Row className="my-5">
      <Col md={{ size: 8, offset: 2 }}>
        <Form>
          <FormGroup>
            <Label for="addTodo">Add Todo</Label>
            <Input
              type="text"
              name="addTodo"
              id="addTodo"
              placeholder="Add Todo"
              onChange={onAddTodoChange}
              value={addTodo}
            />
          </FormGroup>
            <Button
              color="primary"
              className="ml-auto"
              onClick={onAddTodoClick}
            >
              Add Todo
            </Button>
        </Form>
        <TodoList />
        <Footer
          getAllTodos={getAllTodos}
          totalPages={totalPages}
          limit={limit}
          page={page}
        />
      </Col>
    </Row>
  );

}

export default memo(Todos);
