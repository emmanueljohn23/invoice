import './App.css'
import Router from './routes/router'
import { useEffect } from 'react';

const App = () =>{ 
    
useEffect(() => {
    const script = document.createElement('script');
    const KiwiScript = document.createElement('script');
;    script.src = "//code.tidio.co/czisgkf8h7hvkwiez9ggdefjgkq4sjhn.js";
    script.async = true;
  
    KiwiScript.src = "https://demo.test-purpleslate.in/parrot_kiwi/loader_v1.js"
    KiwiScript.type = "text/javascript"
    KiwiScript.id = "parrot"
    KiwiScript.parrotId = "7f5d8952-fd58-4024-9ac9-15314d03c7e1"

    document.body.appendChild(script);
    document.body.appendChild(KiwiScript)
  
    return () => {
      document.body.removeChild(script);
    }
  }, []);
  return(
  <Router />
  )
}
export default App
