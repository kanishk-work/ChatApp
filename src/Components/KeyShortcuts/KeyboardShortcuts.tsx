import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { setShowShortcuts } from "../../Redux/slices/settingsSlice";
import { shallowEqual } from "react-redux";

const KeyboardShortcuts = () => {
  const list = [
    {
      key: 0,
      title: "Mark as unread ",
      combination: ["Cmd", "Shift", "U"],
    },
    {
      key: 1,
      title: "Mute ",
      combination: ["Cmd", "Shift", "M"],
    },
    {
      key: 2,
      title: "Archive Chat",
      combination: ["Cmd", "Shift", "E"],
    },
    {
      key: 3,
      title: "Delete Chat ",
      combination: ["Cmd", "Shift", "D"],
    },
    {
      key: 4,
      title: "Pin Chat ",
      combination: ["Cmd", "Shift", "P"],
    },
    {
      key: 5,
      title: "Search ",
      combination: ["Cmd", "F"],
    },
    {
      key: 6,
      title: "Search Chat ",
      combination: ["Cmd", "Shift", "F"],
    },
    {
      key: 7,
      title: "New Chat",
      combination: ["Cmd", "N"],
    },
    {
      key: 8,
      title: "Next Chat ",
      combination: ["Ctrl", "Tab"],
    },
    {
      key: 9,
      title: "Previous Chat",
      combination: ["Ctrl", "Shift", "Tab"],
    },
    {
      key: 10,
      title: "New Group",
      combination: ["Cmd", "Shift", "N"],
    },
    {
      key: 11,
      title: "Profile & About",
      combination: ["Cmd", "P"],
    },
    {
      key: 12,
      title: "Increase speed of voice message",
      combination: ["Shift", "."],
    },
    {
      key: 13,
      title: "Decrease speed of voice message",
      combination: ["Shift", ","],
    },
    {
      key: 14,
      title: "Settings",
      combination: ["Shift", "S"],
    },
    {
      key: 15,
      title: "Emoji Panel",
      combination: ["Cmd", "E"],
    },
    {
      key: 16,
      title: "Sticker Panel",
      combination: ["Cmd", "S"],
    },
  ];

  const dispatch = useAppDispatch();
  const { showShortcuts } = useAppSelector(
    (state) => state.settings,
    shallowEqual
  );

  return (
    <Dialog
      open={showShortcuts}
      onClose={() => dispatch(setShowShortcuts(false))}
      className="relative z-10"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="flex items-center justify-center fixed inset-0 z-10">
        <DialogPanel
          transition
          className="flex flex-col justify-around gap-2 capitalize p-4 max-h-[90%] max-w-[70%] bg-[var(--bg-color-light)] dark:bg-[var(--bg-color)] relative transform rounded-lg text-left shadow-xl transition-all data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
        >
          <DialogTitle
            as="h3"
            className="text-xl font-semibold leading-6 text-[var(--text-primary-light)] dark:text-[var(--text-primary)]"
          >
            keyboard shortcuts
          </DialogTitle>
          <div className="px-2 flex items-center justify-between flex-wrap gap-6 overflow-auto">
            {list.map((item) => (
              <div
                key={item.key}
                className="text-[var(--text-secondary-light)] dark:text-[var(--text-secondary)] flex justify-between items-center w-[45%]"
              >
                <h3>{item.title}</h3>
                <div className="flex gap-2">
                  {item.combination.map((combo) => (
                    <button className="p-2 rounded-lg bg-[var(--accent-color-light)] dark:bg-[var(--accent-color)]">
                      {combo}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <button
              data-autofocus
              onClick={() => dispatch(setShowShortcuts(false))}
              className="rounded-md px-3 py-2 text-lg font-semibold text-[var(--text-primary-light)] dark:text-[var(--text-primary)] hover:bg-[var(--accent-color-light)] dark:hover:bg-[var(--accent-color)]"
            >
              Okay
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default KeyboardShortcuts;
