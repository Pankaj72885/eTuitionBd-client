import { Menu as HeadlessMenu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Fragment } from "react";

const Dropdown = ({ trigger, children, className }) => {
  return (
    <div className={`relative inline-block text-left ${className}`}>
      <HeadlessMenu>
        {({ open }) => (
          <>
            <HeadlessMenu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 dark:border-gray-700 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand dark:focus:ring-offset-gray-900 transition-colors">
              {trigger}
              <ChevronDownIcon
                className="-mr-1 ml-2 h-5 w-5 text-gray-500 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200"
                aria-hidden="true"
              />
            </HeadlessMenu.Button>

            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <HeadlessMenu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50 border border-gray-200 dark:border-gray-700">
                <div className="py-1">{children}</div>
              </HeadlessMenu.Items>
            </Transition>
          </>
        )}
      </HeadlessMenu>
    </div>
  );
};

const DropdownItem = ({ children, onClick, className }) => (
  <HeadlessMenu.Item>
    {({ active }) => (
      <button
        className={`${
          active
            ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
            : "text-gray-700 dark:text-gray-200"
        } block px-4 py-2 text-sm w-full text-left transition-colors ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    )}
  </HeadlessMenu.Item>
);

export { Dropdown, DropdownItem };
