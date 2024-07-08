"use client"
import { THEMES } from "@/constants/themes";
import CustomInput from "../customInput/CustomInput";
import { useListCrud } from "./useListCrud";
import { useEffect } from "react";

export default function ListCrud({update,listIdToUpdate,listTitle}:{listTitle?:string,listIdToUpdate?:string,update?:boolean}) {
  const {
    visible,
    setVisible,
    title,
    handleChange,
    selectedTheme,
    updateTitle,
    loading,
    handleAddList,
    handleDeleteList,
   handleUpdateList,
    handleThemeSelect,
  } = useListCrud();
 
if(update && listTitle ){
  updateTitle(listTitle)
}
  return (
    <div>
      <button
      className="mt-3 text-3xl"
      onClick={() => setVisible(true)}>{update ?"update":"+ Add List"}</button>

      {visible && (
        <div className="inset-0 bg-vintage-garden-background absolute z-20">
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
              value={title || listTitle}
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
           onClick={
            update?
            ()=>{ handleUpdateList(listIdToUpdate as string)}
            :
            ()=>{handleAddList()}
           }
           className="mt-8 px-4 py-3 bg-coastal-sunrise-accent rounded-full">
              {loading ?"loading ..." :update?"Update" :"Add List"}
            </button>


        {update && <button 
        disabled={loading}
        onClick={
        ()=>{handleDeleteList(listIdToUpdate as string)}
        }
        className="mt-8 px-4 py-3 bg-coastal-sunrise-accent rounded-full">
          {loading ?"loading ..." :"Delete"}
        </button>}

          </div>
        </div>
      )}
    </div>
  );
}
