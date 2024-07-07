"use client"
import { THEMES } from "@/constants/themes";
import CustomInput from "../customInput/CustomInput";
import { useAddLists } from "./useAddList";

export default function AddList() {
  const {
    visible,
    setVisible,
    title,
    handleChange,
    selectedTheme,
    loading,
    handleAddList,
    handleThemeSelect,
  } = useAddLists();
  return (
    <div>
      <button onClick={() => setVisible(true)}>Add List</button>

      {visible && (
        <div className="inset-0 bg-vintage-garden-background absolute">
          <button
            onClick={() => {
              setVisible(false);
            }}
          >
            close
          </button>
          <div className="flex flex-col gap-3 items-center justify-center h-screen p-9">
            <div className="w-full max-w-sm">
            <CustomInput
              name="List name"
              type="text"
              value={title}
              onChange={handleChange}
            />
            </div>
            {selectedTheme && (
              <h2>
                Selected Theme is {" "}
                <span className="font-bold">{selectedTheme} </span>
              </h2>
            )}
            <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto mt-3">
              {THEMES.map((theme, index) => {
                return (
                  <button
                    key={index}
                    className={`p-2   border-4 rounded-lg `}
                    style={{
                      backgroundColor: theme.background,
                      color: theme.primary,
                      borderColor: theme.accent,
                    }}
                    onClick={() => handleThemeSelect(theme.name)}
                  >
                    {theme.name}
                  </button>
                );
              })}
            </div>

        
           <button 
           disabled={loading}
           onClick={()=>{handleAddList()}}
           className="mt-8 px-4 py-3 bg-coastal-sunrise-accent rounded-full">
              {loading ?"adding.." :"Add List"}
            </button>
      
          </div>
        </div>
      )}
    </div>
  );
}
