// Top React.js Interview Questions with Detailed Explanations

// 1. What is Virtual DOM and how does it work?
//    Explanation:
//    The Virtual DOM is a lightweight JavaScript representation of the actual DOM. React uses it to optimize UI updates.

//  How it works:

// Step 1: Initial render creates Virtual DOM
const vdom1 = {
  type: "div",
  props: {
    children: [{ type: "h1", props: { children: "Count: 0" } }],
  },
};

// Step 2: State changes, new Virtual DOM created
const vdom2 = {
  type: "div",
  props: {
    children: [{ type: "h1", props: { children: "Count: 1" } }],
  },
}; // Step 4: Only updates the changed text node in real DOM``` // Step 3: React "diffs" vdom1 vs vdom2

// Process:

// 1. Render: Component returns JSX → converted to Virtual DOM
// 2. Diffing: React compares old and new Virtual DOM trees
// 3. Reconciliation: Calculates minimal changes needed
// 4. Update: Only changed parts update in real DOM

// Why it's efficient:

// . Real DOM manipulation is expensive (reflow/repaint)
// . Virtual DOM operations are just JavaScript object comparisons
// . Batch updates reduce DOM operations

// 2. Explain React Component Lifecycle
// Class Component Lifecycle:

class LifecycleDemo extends React.Component {
  // 1. MOUNTING PHASE
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    console.log("1. Constructor - component instance created");
  }

  static getDerivedStateFromProps(props, state) {
    console.log("2. getDerivedStateFromProps - before every render");
    return null; // or return updated state
  }

  componentDidMount() {
    console.log("4. componentDidMount - component inserted into DOM");
    // Perfect for: API calls, subscriptions, DOM manipulation
    fetch("/api/data").then(/* ... */);
  }

  // 2. UPDATING PHASE
  shouldComponentUpdate(nextProps, nextState) {
    console.log("5. shouldComponentUpdate - should re-render?");
    return true; // false prevents re-render
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("6. getSnapshotBeforeUpdate - before DOM updates");
    return { scrollPosition: window.scrollY };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("7. componentDidUpdate - after DOM updates");
    // Use snapshot from getSnapshotBeforeUpdate
  }

  // 3. UNMOUNTING PHASE
  componentWillUnmount() {
    console.log("8. componentWillUnmount - cleanup");
    // Clear timers, cancel requests, remove listeners
  }

  render() {
    console.log("3. Render - returns JSX");
    return <div>{this.state.count}</div>;
  }
}

// Functional Component with Hooks:

function LifecycleWithHooks() {
  const [count, setCount] = useState(0);

  // componentDidMount + componentDidUpdate
  useEffect(() => {
    console.log("Component mounted or count changed");
  }, [count]);

  // componentDidMount only
  useEffect(() => {
    console.log("Component mounted once");

    // componentWillUnmount
    return () => {
      console.log("Component will unmount - cleanup");
    };
  }, []); // Empty dependency array

  return <div>{count}</div>;
}

// 3. useState vs useReducer - When to use which?
// useState - Simple state:

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
}

// useReducer - Complex state logic:

// When you have multiple related state values
// When next state depends on previous state
// When you want predictable state transitions

const initialState = {
  count: 0,
  history: [],
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        count: state.count + 1,
        history: [...state.history, "increment"],
      };
    case "DECREMENT":
      return {
        ...state,
        count: state.count - 1,
        history: [...state.history, "decrement"],
      };
    case "RESET":
      return initialState;
    case "ERROR":
      return { ...state, error: action.payload };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

function ComplexCounter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <p>History: {state.history.join(", ")}</p>
      {state.error && <p>Error: {state.error}</p>}

      <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
      <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
    </div>
  );
}

// When to use each:

// useState:
// 1. Single, independent values
// 2. Simple state updates
// 3. Boolean toggles, input values

// useReducer:
//1. Multiple related values
// 2. Complex state logic
// 3. State transitions that depend on previous state
// 4. When testing state logic separately from component

// 4. Explain useEffect dependencies and cleanup

// Dependency Array Scenarios:

function EffectExamples() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  // 1. No dependency array - runs after EVERY render
  useEffect(() => {
    console.log("Runs after every render");
  }); // ⚠️ Usually not what you want

  // 2. Empty dependency array - runs ONCE (like componentDidMount)
  useEffect(() => {
    console.log("Runs only once on mount");

    const timer = setInterval(() => {
      console.log("Ticking...");
    }, 1000);

    // Cleanup (like componentWillUnmount)
    return () => {
      clearInterval(timer);
      console.log("Cleanup on unmount");
    };
  }, []);

  // 3. With dependencies - runs when dependencies change
  useEffect(() => {
    console.log("Count changed:", count);
    document.title = `Count: ${count}`;
  }, [count]); // Only re-runs when count changes

  // 4. Multiple dependencies
  useEffect(() => {
    console.log(`Name: ${name}, Count: ${count}`);
  }, [name, count]); // Runs when either changes

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  );
}

// Common Cleanup Scenarios:

function CleanupExamples() {
  // 1. Event listeners
  useEffect(() => {
    const handleResize = () => console.log("Resized");
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 2. Subscriptions
  useEffect(() => {
    const subscription = dataSource.subscribe((data) => {
      console.log(data);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 3. Async operations
  useEffect(() => {
    let isCancelled = false;

    fetchData().then((data) => {
      if (!isCancelled) {
        setData(data);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, []);

  // 4. Timers
  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log("Delayed action");
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);
}

// 5. useMemo vs useCallback - Optimization hooks
// useMemo - Memoizes VALUES:

function ExpensiveComponent({ items, filter }) {
  // Without useMemo - recalculates on every render
  const filteredItems2 = items.filter((item) => item.name.includes(filter));

  // With useMemo - only recalculates when dependencies change
  const filteredItems = useMemo(() => {
    console.log("Filtering items...");
    return items.filter((item) => item.name.includes(filter));
  }, [items, filter]); // Only recomputes if items or filter change

  // Complex calculation example
  const expensiveValue = useMemo(() => {
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += i;
    }
    return result;
  }, []); // Empty deps - calculated once

  return <div>{filteredItems.length} items</div>;
}

// useCallback - Memoizes FUNCTIONS:

function ParentComponent() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);

  // Without useCallback - new function on every render
  // Child will re-render unnecessarily
  const handleClick2 = () => {
    console.log("Clicked");
  };

  // With useCallback - same function reference
  const handleClick = useCallback(() => {
    console.log("Clicked");
  }, []); // Function never changes

  // Function with dependencies
  const addItem = useCallback((item) => {
    setItems((prevItems) => [...prevItems, item]);
  }, []); // setItems is stable, no deps needed

  // Function that uses state
  const handleSubmit = useCallback(() => {
    console.log("Current count:", count);
  }, [count]); // Recreates when count changes

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>{count}</button>
      <MemoizedChild onClick={handleClick} />
    </div>
  );
}

// Child component with React.memo
const MemoizedChild = React.memo(({ onClick }) => {
  console.log("Child rendered");
  return <button onClick={onClick}>Click me</button>;
});
// Without useCallback in parent, child re-renders every time
// With useCallback, child only renders when onClick changes

// When to use:

// useMemo:
// 1. Expensive calculations
// 2. Derived data from props/state
// 3. Creating object/array references that are passed as props

// useCallback:
// 1. Passing callbacks to memoized child components
// 2. Dependency in other hooks (useEffect, useMemo)
// 3. Avoiding unnecessary child re-renders

// Don't overuse: Premature optimization can hurt readability. Use only when:
// 1. Proven performance issue
// 2. Expensive operations
// 3. Child components wrapped in React.memo

// 6. Context API vs Props Drilling
// Props Drilling Problem:

// App passes data through multiple levels
function App() {
  const user = { name: "John", role: "admin" };
  return <Parent user={user} />;
}

function Parent({ user }) {
  // Parent doesn't need user, just passes it down
  return <Child user={user} />;
}

function Child({ user }) {
  // Child doesn't need user either
  return <GrandChild user={user} />;
}

function GrandChild({ user }) {
  // Finally uses it here!
  return <div>Hello, {user.name}</div>;
}

// Context API Solution:

// 1. Create Context
const UserContext = React.createContext();

// 2. Provider at top level
function App() {
  const user = { name: "John", role: "admin" };

  return (
    <UserContext.Provider value={user}>
      <Parent />
    </UserContext.Provider>
  );
}

// 3. Intermediate components don't need props
function Parent() {
  return <Child />;
}

function Child() {
  return <GrandChild />;
}

// 4. Consume context where needed
function GrandChild() {
  const user = useContext(UserContext);
  return <div>Hello, {user.name}</div>;
}

// Context with State Management:

// Create context with actions
const ThemeContext = React.createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const value = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// Custom hook for easier consumption
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

// Usage
function ThemedButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      style={{
        background: theme === "light" ? "#fff" : "#000",
        color: theme === "light" ? "#000" : "#fff",
      }}
      onClick={toggleTheme}
    >
      Toggle Theme
    </button>
  );
}

// When to use Context:
// ✅ Use Context for:
// 1. Theme settings
// 2. User authentication
// 3. Language/locale
// 4. Global UI state (modals, notifications)

// ❌ Don't use Context for:
// 1. Frequently changing data (causes re-renders)
// 2. Complex state management (use Redux/Zustand)
// 3. Data that's only needed in 2-3 components (props are fine)

// 7. React.memo, useMemo, and useCallback - Performance optimization
// React.memo - Prevents component re-renders:

// Without React.memo - re-renders every time parent renders
function Child({ name, age }) {
  console.log("Child rendered");
  return (
    <div>
      {name} is {age}
    </div>
  );
}

// With React.memo - only re-renders if props change
const MemoizedChild2 = React.memo(Child);

// With custom comparison
const MemoizedChild1 = React.memo(Child, (prevProps, nextProps) => {
  // Return true if props are equal (don't re-render)
  // Return false if props changed (re-render)
  return prevProps.age === nextProps.age;
});

function Parent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("John");

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      {/* Child won't re-render when count changes */}
      <MemoizedChild name={name} age={25} />
    </div>
  );
}

// Complete Example - All three together:

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [count, setCount] = useState(0);

  // useMemo - expensive filtering operation
  const filteredTodos = useMemo(() => {
    console.log("Filtering todos...");
    return todos.filter((todo) => {
      if (filter === "all") return true;
      if (filter === "completed") return todo.completed;
      return !todo.completed;
    });
  }, [todos, filter]);

  // useCallback - stable function reference
  const addTodo = useCallback((text) => {
    setTodos((prev) => [
      ...prev,
      {
        id: Date.now(),
        text,
        completed: false,
      },
    ]);
  }, []);

  const toggleTodo = useCallback((id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  return (
    <div>
      {/* This button won't cause TodoList to re-render */}
      <button onClick={() => setCount(count + 1)}>Unrelated: {count}</button>

      <TodoInput onAdd={addTodo} />
      <TodoList todos={filteredTodos} onToggle={toggleTodo} />
    </div>
  );
}

// React.memo prevents re-render when onAdd reference is stable
const TodoInput = React.memo(({ onAdd }) => {
  const [text, setText] = useState("");
  console.log("TodoInput rendered");

  const handleSubmit = () => {
    onAdd(text);
    setText("");
  };

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
});

const TodoList = React.memo(({ todos, onToggle }) => {
  console.log("TodoList rendered");

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
      ))}
    </ul>
  );
});

const TodoItem = React.memo(({ todo, onToggle }) => {
  return (
    <li onClick={() => onToggle(todo.id)}>
      {todo.text} {todo.completed ? "✓" : ""}
    </li>
  );
});

// 8. Controlled vs Uncontrolled Components
// Controlled Components - React controls the state:
function ControlledForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
    // formData is always in sync with inputs
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

// Uncontrolled Components - DOM controls the state:

function UncontrolledForm() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Access values directly from DOM
    console.log({
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={usernameRef} defaultValue="" />
      <input ref={emailRef} type="email" defaultValue="" />
      <input ref={passwordRef} type="password" defaultValue="" />
      <button type="submit">Submit</button>
    </form>
  );
}

// Comparison:
// Feature - Controlled - Uncontrolled
// Value source: React state - DOM
// Validation: Real-time - On submit
// Conditional logic: Easy - Difficult
// Performance: More re-renders - Fewer re-renders
// Use case: Most forms - File inputs, simple forms

// When to use each:
// Controlled (preferred):

// Real-time validation
const [email, setEmail] = useState("");
const isValid = email.includes("@");

// Conditional rendering
{
  isValid && <CheckIcon />;
}

// Transform input
const handleChange = (e) => {
  setEmail(e.target.value.toLowerCase());
};

// Dependent fields
const [country, setCountry] = useState("");
const [city, setCity] = useState("");
// When country changes, reset city

// Uncontrolled (specific cases):
// File inputs (must be uncontrolled)
<input type="file" ref={fileRef} />;

// Integrating with non-React libraries
// Large forms where performance matters
// Simple forms without validation

// 9. Keys in React - Why they matter
// The Problem without keys:

function BadList() {
  const [items, setItems] = useState(["A", "B", "C"]);

  const addItem = () => {
    setItems(["X", ...items]); // Add to beginning
  };

  // ❌ Without keys or with index as key
  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>
          {" "}
          {/* WRONG! */}
          <input defaultValue={item} />
        </div>
      ))}
      <button onClick={addItem}>Add X</button>
    </div>
  );
}

// What happens:
// Before: [A(0), B(1), C(2)]
// After:  [X(0), A(1), B(2), C(3)]
// React thinks:
// - Item at index 0 changed from A to X ❌
// - Item at index 1 changed from B to A ❌
// - Item at index 2 changed from C to B ❌
// - New item C added at index 3
// Result: All inputs re-render, lose focus, values mix up

// Correct usage with unique keys:

function GoodList() {
  const [items, setItems] = useState([
    { id: 1, text: "A" },
    { id: 2, text: "B" },
    { id: 3, text: "C" },
  ]);

  const addItem = () => {
    setItems([{ id: Date.now(), text: "X" }, ...items]);
  };

  // ✅ With unique, stable keys
  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>
          {" "}
          {/* CORRECT! */}
          <input defaultValue={item.text} />
        </div>
      ))}
      <button onClick={addItem}>Add X</button>
    </div>
  );
}

// What happens:
// Before: [A(1), B(2), C(3)]
// After:  [X(4), A(1), B(2), C(3)]
// React knows:
// - Items 1, 2, 3 didn't change (reuse DOM) ✅
// - New item with id 4 was added ✅
// Result: Only new item renders, existing inputs unchanged

// Key Rules:

// ❌ BAD - Index as key (unless list never changes)
{
  items.map((item, index) => <div key={index}>{item}</div>);
}

// ❌ BAD - Non-unique keys
{
  items.map((item) => <div key={item.name}>{item}</div>);
}
// Problem: duplicate names cause issues

// ❌ BAD - Random keys
{
  items.map((item) => <div key={Math.random()}>{item}</div>);
}
// New key every render = full re-render

// ✅ GOOD - Unique, stable IDs
{
  items.map((item) => <div key={item.id}>{item}</div>);
}

// ✅ GOOD - Composite key when no ID
{
  items.map((item) => <div key={`${item.category}-${item.name}`}>{item}</div>);
}

// ✅ OK - Index when list is static
const staticList = ["Home", "About", "Contact"];
{
  staticList.map((item, index) => <NavLink key={index}>{item}</NavLink>);
}

// Real-world example:

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Buy milk", done: false },
    { id: 2, text: "Walk dog", done: true },
  ]);

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id} // Helps React track which item is which
          todo={todo}
          onDelete={deleteTodo}
        />
      ))}
    </ul>
  );
}

function TodoItem({ todo, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);

  // Without proper key, this state could get mixed up
  // when items are reordered/deleted

  return (
    <li>
      {isEditing ? (
        <input defaultValue={todo.text} />
      ) : (
        <span>{todo.text}</span>
      )}
      <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
}

// 10. Error Boundaries
// What are Error Boundaries?
// Error boundaries are React components that catch JavaScript errors in their child component tree, log errors, and display a fallback UI.

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so next render shows fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to error reporting service
    console.error("Error caught:", error, errorInfo);
    this.setState({ error, errorInfo });

    // Send to error tracking service (e.g., Sentry)
    // logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage
function App() {
  return (
    <ErrorBoundary>
      <ProblematicComponent />
    </ErrorBoundary>
  );
}

// What Error Boundaries catch:
// ✅ Catches:

// Errors in render methods
// Errors in lifecycle methods
// Errors in constructors of child components

// ❌ Does NOT catch:

// Event handlers (use try-catch)
// Async code (setTimeout, promises)
// Server-side rendering errors
// Errors in error boundary itself

// Handling event handler errors:

function MyComponent() {
  const [error, setError] = useState(null);

  const handleClick = () => {
    try {
      // Code that might throw
      throw new Error("Button error");
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return <div>Error: {error}</div>;

  return <button onClick={handleClick}>Click me</button>;
}

// Multiple error boundaries:

function App() {
  return (
    <ErrorBoundary fallback={<AppErrorFallback />}>
      <Header />

      <ErrorBoundary fallback={<SidebarErrorFallback />}>
        <Sidebar />
      </ErrorBoundary>

      <ErrorBoundary fallback={<ContentErrorFallback />}>
        <MainContent />
      </ErrorBoundary>

      <Footer />
    </ErrorBoundary>
  );
}
// If Sidebar crashes, only it shows fallback
// Rest of app continues working

// ⭐ What is React Fiber?

// React Fiber is the new reconciliation engine inside React (introduced in React 16).
// It is the core algorithm that React uses to:
//1. Compare virtual DOM trees
// 2. Update the UI efficiently
//3. Break rendering work into small chunks
//4. Make React apps smoother and more responsive

// ⭐ Why was Fiber created?

// Before Fiber, React updates were synchronous — once React started rendering, it couldn’t stop in the middle.

// This caused:

// ❌ UI freezing
// ❌ Slow rendering for large components
// ❌ Poor performance on animations, transitions

// ⭐ How React Fiber works

// React Fiber breaks the rendering work into small units called fibers, allowing React to:

// ✔ Pause work
// ✔ Resume work
// ✔ Reuse work
// ✔ Cancel unnecessary work

// This is what enables features like:

// Concurrent Rendering
// Suspense
// Time slicing
// useTransition
// useDeferredValue

// ⭐ Key benefits of React Fiber

// Smooth UI updates
// Better user experience
// More control over rendering priority
// Ability to stop rendering when needed
// Faster applications

// ⭐ In one line:

// 👉 React Fiber = The engine that makes modern React (hooks, concurrent mode, suspense) fast and smooth.

// ⭐ Server-Side Rendering (SSR) vs Client-Side Rendering (CSR)

// 🚀 1. Where HTML is generated?
// SSR (Server Side Rendering)

// HTML is generated on the server for every request.

// Browser → Server → Server returns fully formed HTML → Browser displays it.

// CSR (Client Side Rendering)

// Server sends a blank HTML + JavaScript bundle.
// The browser (client) runs JavaScript and creates the HTML.

// 🚀 2. Speed: First Load vs After Load

// SSR

// ✔ Faster first page load (HTML already ready)
// ✖ Slower navigation after first load (server must render again)

// CSR

// ✖ Slower first load (browser must download JS and render)
// ✔ Faster after load (SPA experience, pages change instantly)

// 🚀 3. SEO (Search Engine Optimization)
// SSR → Great SEO

// Because search engines can read fully rendered HTML.

// CSR → Poor SEO (unless using hydration)

// Search engines sometimes struggle with JS-rendered pages.

// 🚀 5. Best use cases
// When to use SSR?
// 1.Blogs
// 2.News websites
// 3.E-commerce product pages
// 4.SEO-heavy websites
// 5. Content websites

// When to use CSR?

// 1. Dashboards
// 2. Admin panels
// 3. Social networks
// 4. Apps requiring real-time updates
// 5. Single Page Applications (SPAs)
