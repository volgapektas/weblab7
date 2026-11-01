# Assignment 7

Student: Volga Pektas  
Student ID: 230408044

## File Organization

src/api: Simple fetch functions for dummyjson and auth simulation.  
src/hooks: Custom hooks for useFetch and useLocalStorage.  
src/context: AuthContext with useReducer for login status.  
src/store: Zustand cartStore with localStorage syncing.  
src/components: Common UI components like Layout, NavBar, ProductCard, ProtectedRoute.  
src/pages: Pages for Home, ProductList, ProductDetail, Cart, Login, NotFound.

## Answers to Reasoning Questions (Section 10)

1. State choices  
   User session stays in Context while cart items live in Zustand store because of update frequency. Filters stay in URL params and product list stays in local state with useFetch. Theme preference is stored directly in localStorage to survive page reloads.

2. Context versus store  
   User login state changes rarely. Cart items update constantly. Putting the cart in Context would re-render the whole page on every click. Zustand avoids this problem by updating only the active component.

3. Custom hooks  
   The useFetch hook shares the loading and abort logic between components. It does not share the fetched data. Each page runs its own hook instance independently.

4. Route parameters  
   The id value from useParams is always a string. We must convert it with Number to create the next product link. Without this conversion JavaScript joins them like text and creates wrong routes.

5. Protected routes  
   ProtectedRoute is only for user experience. Anyone can edit browser storage or bypass client code in devtools. Real security must happen on the backend server by validating tokens on private API routes.

6. Deep links  
   Opening /products/3 directly on a static server gives a 404 error. The Vite dev server redirects all page requests to index.html instead. Then react-router reads the browser URL and shows the correct component.

## Notes on the self-study items

- How to update one query-string parameter without losing the others:  
  I used setSearchParams with a callback function. This kept the previous parameters and only updated the selected key.

- How to initialise store state from localStorage safely when the stored value is missing or corrupted:  
  I wrapped JSON.parse in a try-catch function. It returns an empty array safely if the saved data is missing or broken.

- How to implement a light/dark theme:  
  I stored the theme name in localStorage with useLocalStorage. Then I toggled a light or dark class on the main wrapper div.

## Challenges Faced

Handling request cancellation with AbortController in useFetch took some effort. Also syncing the Zustand cart to localStorage outside React using store.subscribe took a bit of practice.
