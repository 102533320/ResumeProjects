import React, { createContext, useEffect, useState } from "react";
import cache from "../utility/cache";

const DarkModeContext = createContext({});
const prefix = "darkmode";

function DarkModeProvider(props) {
  const [darkMode, _setDarkMode] = useState(false);

  const restoreDarkMode = async () => {
    const result = await cache.get(prefix);
    if (result) _setDarkMode(result.value);
    else setDarkMode(false);
  };

  useEffect(()=>{
    restoreDarkMode();
  }, [])

  const setDarkMode = (_value: boolean) => {
    cache.store(prefix, { value: _value });
    _setDarkMode(_value);
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {props.children}
    </DarkModeContext.Provider>
  );
}

export { DarkModeContext, DarkModeProvider };
