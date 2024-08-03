"use client";
import { THEMES } from "@/constants/themes";
import CustomInput from "../customInput/CustomInput";
import { useListCrud } from "./useListCrud";

export default function ListCrud({
  update,
  listIdToUpdate,
  listTitle,
  theme,
}: {
  listTitle?: string;
  listIdToUpdate?: string;
  update?: boolean;
  theme?: string;
}) {
  const {
    setVisible,
    handleChange,
    handleAddList,
    handleDeleteList,
    handleUpdateList,
    handleThemeSelect,
    visible,
    loading,
    title,
    selectedTheme,
  } = useListCrud({update,listTitle});

  return (
    <div>
      <button
        className={`mt-3 text-sm md:text-xl md:px-3 md:py-2 p-2 border-4 rounded-full border-${theme}Accent `}
        onClick={() => setVisible(true)}
      >
        {update ? "update" : "+ Add List"}
      </button>

      {visible && (
        <div
          className={`inset-0 bg-${theme}Background absolute h-fit min-h-screen z-20 bg-dotted-pattern  bg-dotted-size`}
        >
          <button
            className="mt-10 md:ml-20 text-white ml-3 px-3 py-2 bg-rusticCharmPrimary rounded-xl"
            onClick={() => {
              setVisible(false);
            }}
          >
            x
          </button>
          <div className="flex flex-col gap-3 items-center  min-h-screen  px-9 py-8 md:py-16 ">
            <div className="w-full max-w-sm">
              <CustomInput
                name="List name"
                type="text"
                theme={theme}
                value={title}
                onChange={handleChange}
              />
            </div>
            {selectedTheme && (
              <h2>
                Selected Theme is &nbsp;
                <span className="font-bold">{selectedTheme} </span>
              </h2>
            )}
            <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto mt-3">
              {THEMES.map((theme, index) => {
                return (
                  <button
                    key={index}
                    className={`p-2   border-4 rounded-full `}
                    style={{
                      backgroundColor: theme.background,
                      color: theme.primary,
                      borderColor: theme.accent,
                    }}
                    onClick={() => handleThemeSelect(theme.value, theme.name)}
                  >
                    {theme.name}
                  </button>
                );
              })}
            </div>

            <button
              disabled={loading}
              onClick={
                update
                  ? () => {
                      handleUpdateList(listIdToUpdate as string);
                    }
                  : () => {
                      handleAddList();
                    }
              }
              className={`mt-8 px-4 py-3 bg-${theme}Accent  font-semibold rounded-full`}
            >
              {loading ? "loading ..." : update ? "Update" : "Add List"}
            </button>

            {update && (
              <button
                disabled={loading}
                onClick={() => {
                  handleDeleteList(listIdToUpdate as string);
                }}
                className="mt-3 px-4 py-3 bg-rusticCharmPrimary text-white rounded-full"
              >
                {loading ? "loading ..." : "Delete"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
