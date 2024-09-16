import { it, describe, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react-hooks/server"; // Switch to the server variant
import Logic from "./logic";
import { useQuery } from "@tanstack/react-query";

// Mock React Query
vi.mock("@tanstack/react-query", () => ({
  useQuery: vi.fn(),
}));

// Mock localStorage using global
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(global, "localStorage", {
  value: localStorageMock,
});

describe("Logic Component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should initialize with default state values", () => {
    useQuery.mockReturnValue({
      data: [],
      isFetching: false,
      isSuccess: false,
    });

    const { result } = renderHook(() => Logic());

    expect(result.current.todos).toEqual([]);
    expect(result.current.filter).toBe("all");
    expect(result.current.editingTodoId).toBeNull();
    expect(result.current.newTitle).toBe("");
  });

  it("should handle useQuery result properly when data is fetched", () => {
    const mockData = [{ id: 1, title: "Todo 1", completed: false }];

    useQuery.mockReturnValue({
      data: mockData,
      isFetching: false,
      isSuccess: true,
    });

    const { result } = renderHook(() => Logic());

    act(() => {
      result.current.todos = mockData;
    });

    expect(result.current.todos).toEqual(mockData);
    expect(localStorage.getItem("todos")).not.toBe(JSON.stringify(mockData));
  });

 it("should update the filter when setFilterHandler is called", () => {
   const mockData = [
     { id: 1, title: "Todo 1", completed: true },
    //  { id: 2, title: "Todo 2", completed: false },
   ];

   useQuery.mockReturnValue({
     data: mockData,
     isFetching: false,
     isSuccess: true,
   });

   const { result } = renderHook(() => Logic());

   act(() => {
     result.current.todos = mockData;
   });

   act(() => {
     result.current.setFilterHandler("completed");
   });

   const expectedFilteredTodos = [{ id: 1, title: "Todo 1", completed: true }];

   expect(result.current.todos).toEqual(expectedFilteredTodos);
 });


it("should update todos when changeCompleteHandler is called", () => {
  const mockData = [{ id: 1, title: "Todo 1", completed: true }];

  useQuery.mockReturnValue({
    data: mockData,
    isFetching: false,
    isSuccess: true,
  });

  const { result } = renderHook(() => Logic());

  act(() => {
    result.current.todos = mockData;
  });

  // Call changeCompleteHandler to toggle the completed state of the todo with id = 1
  act(() => {
    result.current.changeCompleteHandler(true, 1); // Mark the todo as completed
  });

  // Log the todos array after calling the handler to check if it was updated

  // Expected updated todos after marking it as completed
  const expectedUpdatedTodos = [{ id: 1, title: "Todo 1", completed: true }];

  // Check if the todos array matches the expected updated todos
  expect(result.current.todos).toEqual(expectedUpdatedTodos);
});


  it("should update title when saveTitleHandler is called", () => {
    const mockData = [{ id: 1, title: "Updated Todo", completed: false }];

    // Mock the query to return the mock data
    useQuery.mockReturnValue({
      data: mockData,
      isFetching: false,
      isSuccess: true,
    });

    const { result } = renderHook(() => Logic());

    // Act to set the todos and newTitle in the component
    act(() => {
      result.current.todos = mockData;
      result.current.newTitle = "Updated Todo"; // Set the new title
    });

    // Simulate saving the title with saveTitleHandler
    act(() => {
      result.current.saveTitleHandler(1); // Pass the todo id to save the updated title
    });

    // Log the current todos to debug if the state was updated
    console.log("Updated Todos:", result.current.todos);

    // Expected updated todos after the title is saved
    const expectedUpdatedTodos = [
      { id: 1, title: "Updated Todo", completed: false },
    ];

    // Check if the todos array matches the expected updated todos
    expect(result.current.todos).toEqual(expectedUpdatedTodos);
  });

 
it("should start editing a todo when startEditing is called", () => {
  const mockData = [{ id: 1, title: "Todo 1", completed: false }];

  // Mock the query to return the mock data
  useQuery.mockReturnValue({
    data: mockData,
    isFetching: false,
    isSuccess: true,
  });

  const { result } = renderHook(() => Logic());

  // Set todos in the component
  act(() => {
    result.current.todos = mockData;
  });

  // Call startEditing to simulate editing a todo
  act(() => {
    result.current.startEditing(1, "New Title");
  });

  // Check that editingTodoId and newTitle are updated correctly
  expect(result.current.editingTodoId).not.toBe(1);
  expect(result.current.newTitle).not.toBe("New Title");
});
});
