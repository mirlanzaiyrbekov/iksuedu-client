import { Button } from "./components/button";
import "./styles/App.css";

function App() {
  return (
    <div className="bg-muted">
      <Button variant={"destructive"} className="text-sky-300">
        Hello
      </Button>
    </div>
  );
}

export default App;
