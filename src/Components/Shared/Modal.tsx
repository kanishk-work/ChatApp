import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { Fragment, ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  optionsList: {
    name: string;
    icon?: JSX.Element;
    action?: Function;
  }[];
  modalStyle?: string;
  modalClassStyle?: string;
  itemClassName?: string;
  triggerElement: ReactNode; // Button or trigger to open the modal
}

const Modal = ({
  isOpen,
  onClose,
  optionsList,
  modalStyle,
  modalClassStyle,
  itemClassName,
  triggerElement,
}: ModalProps) => {
  return (
    <>
      {/* Trigger button or element */}
      <div onClick={() => isOpen === false && onClose()}>
        {triggerElement}
      </div>

      {/* Modal component */}
      <Transition show={isOpen} as={Fragment}>
        <Dialog as="div" className={`relative z-10`} onClose={onClose}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30 transition-opacity" />
          </TransitionChild>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <DialogPanel
                  className={`${modalClassStyle} relative transform overflow-hidden rounded-lg dynamic-accent-color shadow-xl transition-all sm:my-8 sm:max-w-lg w-full`}
                >
                  <div className={`${modalStyle} px-4 pt-5 pb-4 sm:p-6 sm:pb-4`}>
                    <DialogTitle
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900 dark:text-white"
                    >
                      Select an Action
                    </DialogTitle>

                    <div className="mt-3">
                      {optionsList.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            option.action && option.action();
                            onClose(); // Close modal after action
                          }}
                          className={`${itemClassName} flex items-center w-full px-4 py-2 text-sm text-left capitalize gap-3 hover:bg-[var(--bg-color)] dynamic-text-color-primary`}
                        >
                          {option.icon} {option.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={onClose}
                    >
                      Close
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
