"use client";
import { THEMES } from "@/constants/themes";
import CustomInput from "../customInput/CustomInput";
import { useListCrud } from "./useListCrud";
import { Loader } from "../../../public/assets/icons/loader";
import { Navbar } from "../navbar/Navbar";

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
  } = useListCrud({ update, listTitle });

  return (
    <div>
      {update ? (
        <button
          className={`mt-3 text-sm  xl:text-[30px] bg-${theme}Accent md:px-3 md:py-2 p-2 border-4 rounded-full border-${theme}Accent `}
          onClick={() => setVisible(true)}
        >
          Edit
        </button>
      ) : (
        <div className="flex  text-xl md:text-3xl xl:text-[64px] xl:leading-[83.2px]">
          <button
            onClick={() => setVisible(true)}
            className="flex relative text-xl md:text-3xl xl:text-[64px] xl:leading-[83.2px] w-fit h-fit"
          >
            <span className="relative z-10">+ Add List</span>
            <span
              className={`xl:ml-2 absolute left-0 right-0 bottom-2 xl:bottom-3 h-[3px] xl:h-[20px] bg-${theme}Accent z-0`}
            ></span>
          </button>
          <span>.</span>
        </div>
      )}

      {visible && (
        <div
          className={`inset-0 bg-${theme}Background absolute h-fit min-h-screen z-20 bg-dotted-pattern  bg-dotted-size`}
        >
          <Navbar />
          <div className="flex justify-end">
            <button
              className="absolute  mt-10 mr-4 xl:mr-20  text-white ml-3 px-4 py-3 bg-rusticCharmPrimary rounded-full"
              onClick={() => {
                setVisible(false);
              }}
            >
              x
            </button>
          </div>
          <div className="flex flex-col gap-3 xl:gap-0 items-center  min-h-screen  px-9 pt-24 xl:pt-[140px] ">
            <div className="w-full max-w-[447px] xl:pb-[56px] ">
              <CustomInput
                name="List name"
                type="text"
                theme={theme}
                value={title}
                onChange={handleChange}
              />
            </div>
            {selectedTheme && (
              <h2 className="xl:mb-4 xl:text-[30px]">
                Selected Theme is &nbsp;
                <span className="font-bold">{selectedTheme} </span>
              </h2>
            )}
            <div className="flex flex-wrap justify-center gap-3 xl:gap-[32px] max-w-5xl mx-auto mt-3 xl:mt-0">
              {THEMES.map((theme, index) => {
                return (
                  <button
                    key={index}
                    className={`xl:text-[28px] p-2 xl:py-[12px] xl:px-[20px]  border-4 xl:border-[5px] rounded-full `}
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

            {loading ? (
              <Loader />
            ) : (
              <div className="mt-8  xl:mt-[96px] flex items-center gap-8 flex-col xl:flex-row">
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
                  className={`px-4 py-3 xl:px-[24px] xl:py-[12px] bg-${theme}Accent  font-semibold rounded-full xl:text-[30px]`}
                >
                  {update ? "Edit List." : "Add List."}
                </button>

                {update && (
                  <button
                    disabled={loading}
                    onClick={() => {
                      handleDeleteList(listIdToUpdate as string);
                    }}
                    className="px-4 py-3 h-fit bg-rusticCharmPrimary  xl:px-[24px] xl:py-[12px]  text-white rounded-full xl:text-[30px]"
                  >
                    Delete
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
