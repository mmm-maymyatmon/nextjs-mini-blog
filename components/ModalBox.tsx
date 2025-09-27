"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Button from "./Button";
import { createPost } from "@/server/action";

export default function ModalBox() {
  const [open, setOpen] = useState(false);


  return (
    <div>
      <Button label="Create" onClick={() => setOpen(true)} className="px-10" />
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div>
                  <form action={createPost}>
                    <div className="bg-white px-6 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <h2 className="text-lg font-medium text-gray-900 mb-4">
                        Create New Post
                      </h2>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Title
                        
                        <input
                          type="text"
                          name ="title"
                          placeholder="Enter post title"
                          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                          />
                          </label>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Content
                        
                        <textarea
                          placeholder="Enter post content"
                          name="content"
                          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                          rows={4}
                          />
                          </label>
                      </div>
                    </div>

                    <div className="bg-gray-50 px-6 py-3 flex justify-end gap-5">
                      <Button label="Create" variant="primary" />
                      <Button label="Cancel" variant="secondary" onClick={()=> setOpen(false)}/>
                      
                    </div>
                  </form>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
